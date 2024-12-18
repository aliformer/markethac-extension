import type { PlasmoMessaging } from "@plasmohq/messaging"
const username = process.env.PLASMO_PUBLIC_SHOPEE_HEADER_GENERATOR_USERNAME
const password = process.env.PLASMO_PUBLIC_SHOPEE_HEADER_GENERATOR_PASSWORD

const headerGeneratorUrl = process.env.PLASMO_PUBLIC_SHOPEE_HEADER_GENERATOR_ENDPOINT

 
const handler:PlasmoMessaging.MessageHandler  = async (req, res) => {
    
    const headers = {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(`${username}:${password}`)
        }
        const url = new URL(headerGeneratorUrl)
        url.pathname = url.pathname + req.body.pathname
        const getHeader = await fetch(url, {
            headers,
        }).then(header => header.json()).catch(error => console.log(error))
        res.send(
            {...getHeader}
        )
}

export default handler