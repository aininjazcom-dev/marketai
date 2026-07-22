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
            model: "gpt-image-1-mini",
            prompt: prompt,
            n: 1,
            size: "1024x1024" // DALL-E 3 requires at least 1024x1024
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to generate image");
        }

        const data = await response.json();
        return data.data[0].url;
      };

      // Run 3 requests in parallel
      const urls = await Promise.all([
        generateSingleImage(),
        generateSingleImage(),
        generateSingleImage()
      ]);
      
      return urls;

    } catch (error) {
      console.error("Error generating posters:", error);
      throw error;
    }
  }
};
