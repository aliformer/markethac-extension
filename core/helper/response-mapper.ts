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
    console.log('result is', result.length)
    return result
  },
  productDetailResponse : (data:any[])=>{
    try{

      const result = data?.[0].data.pdpGetLayout
      console.log('result', result)
      return result 
    }
    catch(error){
      console.log('cannot mapp data', error)
      return []
    } 
  }
}