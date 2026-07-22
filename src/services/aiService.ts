export const aiService = {
  generatePosters: async (prompt: string): Promise<string[]> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
    }

    try {
      // Use the proxy route to bypass CORS issues from the browser
      const response = await fetch('/api/openai/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "dall-e-2",
          prompt: prompt,
          n: 3,
          size: "512x512" // Using smaller size for thumbnails to save cost and time
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate images");
      }

      const data = await response.json();
      
      // Map the response to get the array of URLs
      return data.data.map((item: { url: string }) => item.url);

    } catch (error) {
      console.error("Error generating posters:", error);
      throw error;
    }
  }
};
