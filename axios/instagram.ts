import axios from "axios"


export async function instaRequest (url: string | undefined) {
    try {
        const options = {
            method: 'GET',
            url: 'https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/',
            params: {
              url
            },
            headers: {

              'X-RapidAPI-Key': process.env.X_RapidAPI_Key as string,
              'X-RapidAPI-Host': process.env.X_RapidAPI_Host as string
            }
          };
          
        const response = await axios.request(options);
        
        return response.data
    } catch (error) {
        throw error
    }
}

