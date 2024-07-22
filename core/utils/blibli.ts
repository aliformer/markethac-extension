export const fetchData = async ({config}:{config:any}) => {
    function getCookieValue(name) {
        const regex = new RegExp(`(^| )${name}=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
            return match[2]
        }
    }
    // const myCookie = getCookieValue('_abck')
    const url = `https://www.blibli.com/backend/search/merchant/${config.shopID}?excludeProductList=true&promoTab=false&pickupPointCode=ALL_LOCATIONS&multiCategory=true&merchantSearch=false&pickupPointLatLong=&defaultPickupPoint=true&showFacet=false&page=${config.page || 1}&start=${config.offset || 1}&sort=7`
    const result = await fetch(url).then(response => response.json()).catch(error => console.log('error', error))
    console.log('fetching data starting....',)
    console.log(`resonse from ${config.page}`, result )
    return result
}


// export const fetchShopInfo = async () => {
// }