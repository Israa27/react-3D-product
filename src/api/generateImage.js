export const generateImage = async (prompt) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const apiKey = import.meta.env.VITE_API_KEY;

 
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //"Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
       key: `${apiKey}`,
       prompt: prompt,
       width: "512",
       height: "512",
       samples: "1",
  
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.output[0])
    const imageUrl = data.output[0];

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw new Error(`Error in API call: ${error.message}`);
  }
};

