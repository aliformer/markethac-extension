import type { PlasmoMessaging } from "@plasmohq/messaging"
import axios from "axios"

const username = "root"
const password = "insignia2023"
const brigeUrl = process.env.PLASMO_PUBLIC_BRIDGE_URL

const client = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(`${username}:${password}`),
    }
})

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    let cookieShopee = []
    const domains = ["shopee.co.id", ".shopee.co.id"]

    const cookies = await Promise.all(
        domains.map(domain => 
            chrome.cookies.getAll({ domain })
        )
    )

    cookieShopee.push(...cookies.flat())

    const cookie = await cookieShopee.reduce((acc, obj, index) => {
        const pair = `${obj.name}=${obj.value}`;
        return index === 0 ? pair : `${acc}, ${pair}`;
      }, "")

    const url = new URL(brigeUrl)
    url.pathname  = req.body.pathname
    url.search = req.body.search
    // url.searchParams.append('cookie', encodeURIComponent(cookie) )
    // console.log('cookie',cookieShopee)
    const result = await client.get(url.href).then(data => data.data).catch(error => error)
    console.log('result', result)
    res.send(
        { ...result}
    )   
}

export default handler

