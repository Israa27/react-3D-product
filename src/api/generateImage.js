export const generateImage = async (prompt) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log('key:',apiKey)
 
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
        'Authorization': `Bearer ${apiKey}` , 
      },
      body: JSON.stringify({
        providers: 'openai',
        text: prompt,
        resolution: '512x512',
        num_images: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.openai.items[0].image_resource_url;

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw new Error(`Error in API call: ${error.message}`);
  }
};

