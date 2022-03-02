import { IPost } from "../interfaces/blogPost.interface";


const fetchPosts = async () => {
  interface IResponse {
    feed: object,
    items: IPost[],
    status: string
  }
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jhoangracia');
    // const response = await fetch('https://anchor.fm/s/31b843f0/podcast/rss');
    const data = await response.json() as IResponse;
    return data;  
  } catch (error) {
    throw new Error("error");
  }
}
const exportObject = {
  fetchPosts
};

export default exportObject;
