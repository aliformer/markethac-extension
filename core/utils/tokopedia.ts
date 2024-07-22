import type { FetchData, TokopediaProductDetailOptions, TokopediaShopOptions, TokopediaShopProductsOptions } from "~core/interfaces/tokopedia.interface"


export const fetchData = async ({options, payload, mapper, append }: FetchData): Promise<any> => {
    try{
        function getCookieValue(name) {
        const regex = new RegExp(`(^| )${name}=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
            return match[2]
        }
    }
    const _abck = getCookieValue('_abck')
    const bm_sz = getCookieValue('bm_sz')
    const url = 'https://gql.tokopedia.com'
    let requestConfig = {
        method: 'POST',
        headers: {
            'x-tkpd-akamai': 'a',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
            'Content-Type': 'application/json',
            'Cookie': `_abck=${_abck};bm_sz=${bm_sz}`
        },
    };
    const result = await fetch(url, {
        headers: requestConfig.headers,
        method: requestConfig.method,
        body: payload(options)
    }).then(response => response.json()).catch(error => console.log('error', error))
    if (append) {
        if(mapper){
    const response = mapper(result)
    if(typeof response){
        // store((prev) => ([
        //     ...prev, ...response
        // ]))
        return response
    }}
    else {
        
    }
    }
    const mappedResult = await mapper(result)
    return mappedResult
}
catch(error){
    console.log(error)
    return 
}
}

export const tokopediaShopInfoPayload = (options: TokopediaShopOptions) => JSON.stringify([{
    "operationName": "ShopInfoCore",
    "variables": {
        "id": 0,
        "domain": options.shopName
    }, "query": "query ShopInfoCore($id: Int!, $domain: String) {\n  shopInfoByID(input: {shopIDs: [$id], fields: [\"active_product\", \"allow_manage_all\", \"assets\", \"core\", \"closed_info\", \"create_info\", \"favorite\", \"location\", \"status\", \"is_open\", \"other-goldos\", \"shipment\", \"shopstats\", \"shop-snippet\", \"other-shiploc\", \"shopHomeType\", \"branch-link\", \"goapotik\", \"fs_type\"], domain: $domain, source: \"shoppage\"}) {\n    result {\n      shopCore {\n        description\n        domain\n        shopID\n        name\n        tagLine\n        defaultSort\n        __typename\n      }\n      createInfo {\n        openSince\n        __typename\n      }\n      favoriteData {\n        totalFavorite\n        alreadyFavorited\n        __typename\n      }\n      activeProduct\n      shopAssets {\n        avatar\n        cover\n        __typename\n      }\n      location\n      isAllowManage\n      branchLinkDomain\n      isOpen\n      shipmentInfo {\n        isAvailable\n        image\n        name\n        product {\n          isAvailable\n          productName\n          uiHidden\n          __typename\n        }\n        __typename\n      }\n      shippingLoc {\n        districtName\n        cityName\n        __typename\n      }\n      shopStats {\n        productSold\n        totalTxSuccess\n        totalShowcase\n        __typename\n      }\n      statusInfo {\n        shopStatus\n        statusMessage\n        statusTitle\n        tickerType\n        __typename\n      }\n      closedInfo {\n        closedNote\n        until\n        reason\n        detail {\n          status\n          __typename\n        }\n        __typename\n      }\n      bbInfo {\n        bbName\n        bbDesc\n        bbNameEN\n        bbDescEN\n        __typename\n      }\n      goldOS {\n        isGold\n        isGoldBadge\n        isOfficial\n        badge\n        shopTier\n        __typename\n      }\n      shopSnippetURL\n      customSEO {\n        title\n        description\n        bottomContent\n        __typename\n      }\n      isQA\n      isGoApotik\n      partnerInfo {\n        fsType\n        __typename\n      }\n      __typename\n    }\n    error {\n      message\n      __typename\n    }\n    __typename\n  }\n}\n"
}])

export const tokopediaShopProductPayload = (options: TokopediaShopProductsOptions) => JSON.stringify([
    {
        "operationName": "ShopProducts",
        "variables": {
            "source": "shop",
            "sid": options.shopId,
            "page": options.page,
            "perPage": options.offset,
            "etalaseId": "etalase",
            "sort": options.sort,
            "user_districtId": "2274",
            "user_cityId": "176",
            "user_lat": "0",
            "user_long": "0"
        },
        "query": "query ShopProducts($sid: String!, $source: String, $page: Int, $perPage: Int, $keyword: String, $etalaseId: String, $sort: Int, $user_districtId: String, $user_cityId: String, $user_lat: String, $user_long: String) {\n  GetShopProduct(shopID: $sid, source: $source, filter: {page: $page, perPage: $perPage, fkeyword: $keyword, fmenu: $etalaseId, sort: $sort, user_districtId: $user_districtId, user_cityId: $user_cityId, user_lat: $user_lat, user_long: $user_long}) {\n    status\n    errors\n    links {\n      prev\n      next\n      __typename\n    }\n    data {\n      name\n      product_url\n      product_id\n      price {\n        text_idr\n        __typename\n      }\n      primary_image {\n        original\n        thumbnail\n        resize300\n        __typename\n      }\n      flags {\n        isSold\n        isPreorder\n        isWholesale\n        isWishlist\n        __typename\n      }\n      campaign {\n        discounted_percentage\n        original_price_fmt\n        start_date\n        end_date\n        __typename\n      }\n      label {\n        color_hex\n        content\n        __typename\n      }\n      label_groups {\n        position\n        title\n        type\n        url\n        __typename\n      }\n      badge {\n        title\n        image_url\n        __typename\n      }\n      stats {\n        reviewCount\n        rating\n        averageRating\n        __typename\n      }\n      category {\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
    }
]);


export const tokopediaProductDetail = (options: TokopediaProductDetailOptions) => {
    return JSON.stringify([{

        "operationName": "PDPGetLayoutQuery",
        "variables": {
            "shopDomain": options.shopDomain,
            "productKey": options.productKey,
            "apiVersion": options.apiVersion || 1
        },
        "query": "fragment ProductVariant on pdpDataProductVariant {\r\n  errorCode\r\n  parentID\r\n  defaultChild\r\n  sizeChart\r\n  totalStockFmt\r\n  variants {\r\n    productVariantID\r\n    variantID\r\n    name\r\n    identifier\r\n    option {\r\n      picture {\r\n        urlOriginal: url\r\n        urlThumbnail: url100\r\n        __typename\r\n      }\r\n      productVariantOptionID\r\n      variantUnitValueID\r\n      value\r\n      hex\r\n      stock\r\n      __typename\r\n    }\r\n    __typename\r\n  }\r\n  children {\r\n    productID\r\n    price\r\n    priceFmt\r\n    optionID\r\n    optionName\r\n    productName\r\n    productURL\r\n    picture {\r\n      urlOriginal: url\r\n      urlThumbnail: url100\r\n      __typename\r\n    }\r\n    stock {\r\n      stock\r\n      isBuyable\r\n      stockWordingHTML\r\n      minimumOrder\r\n      maximumOrder\r\n      __typename\r\n    }\r\n    isCOD\r\n    isWishlist\r\n    campaignInfo {\r\n      campaignID\r\n      campaignType\r\n      campaignTypeName\r\n      campaignIdentifier\r\n      background\r\n      discountPercentage\r\n      originalPrice\r\n      discountPrice\r\n      stock\r\n      stockSoldPercentage\r\n      startDate\r\n      endDate\r\n      endDateUnix\r\n      appLinks\r\n      isAppsOnly\r\n      isActive\r\n      hideGimmick\r\n      isCheckImei\r\n      minOrder\r\n      __typename\r\n    }\r\n    thematicCampaign {\r\n      additionalInfo\r\n      background\r\n      campaignName\r\n      icon\r\n      __typename\r\n    }\r\n    __typename\r\n  }\r\n  __typename\r\n}\r\n\r\n\r\nquery PDPGetLayoutQuery($shopDomain: String, $productKey: String, $layoutID: String, $apiVersion: Float, $userLocation: pdpUserLocation, $extParam: String, $tokonow: pdpTokoNow) {\r\n  pdpGetLayout(shopDomain: $shopDomain, productKey: $productKey, layoutID: $layoutID, apiVersion: $apiVersion, userLocation: $userLocation, extParam: $extParam, tokonow: $tokonow) {\r\n    requestID\r\n    name\r\n    pdpSession\r\n    basicInfo {\r\n      alias\r\n      createdAt\r\n      isQA\r\n      id: productID\r\n      shopID\r\n      shopName\r\n      minOrder\r\n      maxOrder\r\n      weight\r\n      weightUnit\r\n      condition\r\n      status\r\n      url\r\n      needPrescription\r\n      catalogID\r\n      isLeasing\r\n      isBlacklisted\r\n      isTokoNow\r\n      menu {\r\n        id\r\n        name\r\n        url\r\n        __typename\r\n      }\r\n      category {\r\n        id\r\n        name\r\n        title\r\n        breadcrumbURL\r\n        isAdult\r\n        isKyc\r\n        minAge\r\n        detail {\r\n          id\r\n          name\r\n          breadcrumbURL\r\n          isAdult\r\n          __typename\r\n        }\r\n        __typename\r\n      }\r\n      txStats {\r\n        transactionSuccess\r\n        transactionReject\r\n        countSold\r\n        paymentVerified\r\n        itemSoldFmt\r\n        __typename\r\n      }\r\n      stats {\r\n        countView\r\n        countReview\r\n        countTalk\r\n        rating\r\n        __typename\r\n      }\r\n      __typename\r\n    }\r\n    components {\r\n      name\r\n      type\r\n      position\r\n      data {\r\n        ...ProductVariant\r\n        __typename\r\n      }\r\n      __typename\r\n    }\r\n    __typename\r\n  }\r\n}"
    }
    ])
}