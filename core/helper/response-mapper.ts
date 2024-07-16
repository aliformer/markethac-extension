export const tokopediaResponse = {
  shopInfoMapper :  (data:any[]) => {

    const result = data?.[0]?.data?.shopInfoByID?.result
    
    return result.map( shopInfo => 
        ({ 
            basicInfo: shopInfo.shopCore,
            shopImage: shopInfo.shopAssets.avatar,
            shopStats: shopInfo.shopStats
        })

     )
  },
  productListMapper: (data:any[]) => {
    const result = data?.[0]?.data?.GetShopProduct?.data
    return result.map( shopProduct => 
        shopProduct

     )
  }
}