import type {FetchDataProduct as FetchData, TokopediaProductDetailOptions, TokopediaShopOptions, TokopediaShopProductsOptions } from "~core/interfaces/tokopedia.interface"


export const fetchDataProducts = async ({options, payload, mapper, append }: FetchData): Promise<any> => {
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
        "query":`fragment ProductVariant on pdpDataProductVariant {
  errorCode
  parentID
  defaultChild
  sizeChart
  variants {
    productVariantID
    variantID
    name
    identifier
    option {
      picture {
        urlOriginal: url
        urlThumbnail: url100
      }
      productVariantOptionID
      variantUnitValueID
      value
      hex
    }
  }
  children {
    productID
    price
    priceFmt
    optionID
    productName
    productURL
    picture {
      urlOriginal: url
      urlThumbnail: url100
    }
    stock {
      stock
      isBuyable
      stockWording
      stockWordingHTML
      minimumOrder
      maximumOrder
    }
    isCOD
    isWishlist
    campaignInfo {
      campaignID
      campaignType
      campaignTypeName
      campaignIdentifier
      background
      discountPercentage
      originalPrice
      discountPrice
      stock
      stockSoldPercentage
      threshold
      startDate
      endDate
      endDateUnix
      appLinks
      isAppsOnly
      isActive
      hideGimmick
      isCheckImei
    }
    thematicCampaign {
      additionalInfo
      background
      campaignName
      icon
    }
  }
}

fragment ProductHighlight on pdpDataProductContent {
  name
  price {
    value
    currency
  }
  campaign {
    campaignID
    campaignType
    campaignTypeName
    campaignIdentifier
    background
    percentageAmount
    originalPrice
    discountedPrice
    originalStock
    stock
    stockSoldPercentage
    threshold
    startDate
    endDate
    endDateUnix
    appLinks
    isAppsOnly
    isActive
    hideGimmick
  }
  thematicCampaign {
    additionalInfo
    background
    campaignName
    icon
  }
  stock {
    useStock
    value
    stockWording
  }
  variant {
    isVariant
    parentID
  }
  wholesale {
    minQty
    price {
      value
      currency
    }
  }
  isCashback {
    percentage
  }
  isTradeIn
  isOS
  isPowerMerchant
  isWishlist
  isCOD
  isFreeOngkir {
    isActive
  }
  preorder {
    duration
    timeUnit
    isActive
    preorderInDays
  }
}

query PDPGetLayoutQuery($shopDomain: String, $productKey: String, $layoutID: String, $apiVersion: Float, $userLocation: pdpUserLocation!) {
  pdpGetLayout(shopDomain: $shopDomain, productKey: $productKey, layoutID: $layoutID, apiVersion: $apiVersion, userLocation: $userLocation) {
    name
    pdpSession
    basicInfo {
      alias
      id: productID
      shopID
      shopName
      minOrder
      maxOrder
      weight
      weightUnit
      condition
      status
      url
      needPrescription
      catalogID
      isLeasing
      isBlacklisted
      menu {
        id
        name
        url
      }
      category {
        id
        name
        title
        breadcrumbURL
        isAdult
        detail {
          id
          name
          breadcrumbURL
          isAdult
        }
      }
      blacklistMessage {
        title
        description
        button
        url
      }
      txStats {
        transactionSuccess
        transactionReject
        countSold
        paymentVerified
        itemSoldPaymentVerified
      }
      stats {
        countView
        countReview
        countTalk
        rating
      }
    }
    components {
      name
      type
      position
      data {
        ...ProductHighlight
        ...ProductVariant
      }
    }
  }
}`
    }
    ])
}