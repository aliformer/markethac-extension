import type { FetchDataProduct, ShopeeProductDetailOptions, ShopeeProductSearchByIdOptions, ShopeeShopProductsOptions } from "~core/interfaces/shopee.interface"
import { sendToBackground } from "@plasmohq/messaging"
const apiUrl = process.env.PLASMO_PUBLIC_SHOPEE_API_ENDPOINT
import axios, { AxiosHeaders, type AxiosHeaderValue } from 'axios';

// Create an Axios instance



export const fetchDataProducts = async ({ options, mapper, append }: FetchDataProduct) => {
    try {
        const {url, headers}:{url: string , headers:AxiosHeaders} = await mapper(options)
        axios.defaults.headers.common = {...headers,  cookie: document.cookie}
        const result = await axios.get(url).then(data => data.data).catch(error => error)
    
        //    const result =  await sendToBackground({
        //     name: "shopee-request",
        //     body:{
        //         headers: headers,
        //         url: url, 
        //         cookie: document.cookie
        //     },
        //     extensionId: 'egkmokngboengjblldjneoidclpbopfl'
        // })
        console.log('result form background', result)
        return result
    }
    catch (error) {
        console.log(error)
        return error
    }

}


const createParamSearch = (params: any, baseUrl) => {
    const url = new URL(baseUrl)
    Object.keys(params).forEach((key) => {
        url.searchParams.append(key, params[key]);
    });
    return url
}


export const searchByIdParams = async (options: ShopeeProductDetailOptions) => {
    const baseUrl = apiUrl + "/pdp/get_rw"
    const url = createParamSearch({ ...options, }, baseUrl)
    const headers = await sendToBackground({
        name: "generate-headers",
        body:{
            pathname: url.pathname + url.search
        },
        extensionId: 'egkmokngboengjblldjneoidclpbopfl'
    })
    return { url, headers }
}

export const searchPageRank = async (options: ShopeeShopProductsOptions) => {
    const baseUrl = apiUrl + "/search/search_items"
    const defaultParams = { by: "relevancy", newest: 0, page_type: "collection", scenario: "PAGE_OTHERS", version: 2 }
    const url = createParamSearch({ ...defaultParams, ...options }, baseUrl)
    const headers = await sendToBackground({
        name: "generate-headers",
        body:{
            pathname: url.pathname + url.search
        },
       extensionId: 'egkmokngboengjblldjneoidclpbopfl'
    })
    return { url, headers }
}

