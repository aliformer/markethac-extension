
export const blibliConfig  = {

}

export const fetchData = async ({store, config}:{store:any, config:any}) => {
    function getCookieValue(name) {
        const regex = new RegExp(`(^| )${name}=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
            return match[2]
        }
    }
    const myCookie = getCookieValue('_abck')
    let data = JSON.stringify([
        {
            "operationName": "ShopProducts",
            "variables": {
                "source": "shop",
                "sid": config.shopId,
                "page": 1,
                "perPage": config.offset,
                "etalaseId": "etalase",
                "sort": config.sort,
                "user_districtId": "2274",
                "user_cityId": "176",
                "user_lat": "0",
                "user_long": "0"
            },
            "query": "query ShopProducts($sid: String!, $source: String, $page: Int, $perPage: Int, $keyword: String, $etalaseId: String, $sort: Int, $user_districtId: String, $user_cityId: String, $user_lat: String, $user_long: String) {\n  GetShopProduct(shopID: $sid, source: $source, filter: {page: $page, perPage: $perPage, fkeyword: $keyword, fmenu: $etalaseId, sort: $sort, user_districtId: $user_districtId, user_cityId: $user_cityId, user_lat: $user_lat, user_long: $user_long}) {\n    status\n    errors\n    links {\n      prev\n      next\n      __typename\n    }\n    data {\n      name\n      product_url\n      product_id\n      price {\n        text_idr\n        __typename\n      }\n      primary_image {\n        original\n        thumbnail\n        resize300\n        __typename\n      }\n      flags {\n        isSold\n        isPreorder\n        isWholesale\n        isWishlist\n        __typename\n      }\n      campaign {\n        discounted_percentage\n        original_price_fmt\n        start_date\n        end_date\n        __typename\n      }\n      label {\n        color_hex\n        content\n        __typename\n      }\n      label_groups {\n        position\n        title\n        type\n        url\n        __typename\n      }\n      badge {\n        title\n        image_url\n        __typename\n      }\n      stats {\n        reviewCount\n        rating\n        averageRating\n        __typename\n      }\n      category {\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
        }
    ]);

    const url = 'https://gql.tokopedia.com'
    let requestConfig = {
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
            'Origin': 'https://www.tokopedia.com',
            'Content-Type': 'application/json',
            'Cookie': '_abck=' + myCookie
        },
    };

    const result = await fetch(url, {
        headers: requestConfig.headers,
        mode: 'cors',
        method: requestConfig.method,
        body: data
    }).then(response => response.json()).catch(error => console.log('error', error))
    console.log('fetching data starting....',)
    console.log('response', result)
    store(result)
    return result
}


export const fetchShopInfo = async () => {
}