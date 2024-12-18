
import type { PlasmoMessaging } from "@plasmohq/messaging"
import axios from 'axios';

// Create an Axios instance
const client = axios.create({
  baseURL: 'https://shopee.co.id', // Replace with your base URL
  headers: {
    'User-Agent': 'MyApp/1.0 (https://myapp.example.com)', // Set your custom User-Agent
  },
});


const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const result = await client.get(req.body.url, {
        headers: {...req.body.headers, cookie: req.body.cookie},

    }).then(data => data.data).catch(error => error)
    res.send(
        { ...result }
    )
}

export default handler

