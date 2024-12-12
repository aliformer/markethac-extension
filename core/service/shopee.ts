import type { FetchDataProduct, ShopeeProductDetailOptions, ShopeeProductSearchByIdOptions, ShopeeShopProductsOptions } from "~core/interfaces/shopee.interface"

const username = process.env.PLASMO_PUBLIC_SHOPEE_HEADER_GENERATOR_USERNAME
const password = process.env.PLASMO_PUBLIC_SHOPEE_HEADER_GENERATOR_PASSWORD
const apiUrl = process.env.PLASMO_PUBLIC_SHOPEE_API_ENDPOINT
const headerGeneratorUrl = process.env.PLASMO_PUBLIC_SHOPEE_HEADER_GENERATOR_ENDPOINT


const fetchDataProducts = async ({ options, mapper, append }: FetchDataProduct) => {
    try {
        const result = await fetch(options.url, {
            headers: { ...options.headers }
        }).then(data => data.json())
        if (append) {
            if (mapper) {
                const response = mapper(result)
                if (typeof response) {
                    return response
                }
            }

        }
        const mappedResult = await mapper(result)
        return mappedResult
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
    const headers = await generateHeaders(url.pathname)
    return { url, headers }
}

export const searchPageRank = async (options: ShopeeShopProductsOptions) => {
    const baseUrl = apiUrl + "/search/search_items"
    const defaultParams = { by: "relevancy", newest: 0, page_type: "collection", scenario: "PAGE_OTHERS", version: 2 }
    const url = createParamSearch({ ...defaultParams, ...options }, baseUrl)
    const headers = await generateHeaders(url.pathname)
    return { url, headers }
}

const generateHeaders = async (pathname) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(`${username}:${password}`)
        }
        const url = new URL(headerGeneratorUrl)
        url.pathname = url.pathname + pathname
        const getHeader = await fetch(url, {
            headers,
        })

        return getHeader
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}