export const aiService = {
  generatePosters: async (prompt: string): Promise<string[]> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
    }

    try {
      // DALL-E 3 only supports n=1, so we make 3 parallel requests to get 3 thumbnails
      const generateSingleImage = async () => {
        const response = await fetch('/api/openai/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-image-2",
            prompt: prompt,
            n: 1,
            size: "1024x1024" // 
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to generate image");
        }

        const data = await response.json();

        if (!data.data || !data.data[0]) {
          throw new Error("Invalid API Response. We expected an image but received: " + JSON.stringify(data));
        }

        const imageObj = data.data[0];

        if (imageObj.b64_json) {
          return `data:image/png;base64,${imageObj.b64_json}`;
        } else if (imageObj.url) {
          return imageObj.url;
        } else {
          throw new Error("Invalid API Response. Missing URL or b64_json: " + JSON.stringify(data));
        }
      };

      // Run 3 requests in parallel
      const urls = await Promise.all([
        generateSingleImage()
      ]);

      return urls;

    } catch (error) {
      console.error("Error generating posters:", error);
      throw error;
    }
  }
};
