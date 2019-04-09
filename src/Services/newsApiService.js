import { API_KEY, base_url } from '../Constants/applicationConstants';
export async function getNewsArticles(channelCode) {
    let url = `${base_url}${channelCode}&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch{
        return 'Error while getting the data';
    }
}