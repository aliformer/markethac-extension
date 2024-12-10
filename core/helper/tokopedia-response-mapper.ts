export function extractProductInfo(data) {
    const alias = data.name || 'N/A';
    const productId= data.sku || 'N/A';
    const shopID = data.merchantCode || 'N/A';
    const shopName = data.merchantName || 'N/A';
    const count_sold = data.soldRangeCount?.id || 'N/A';
    return {
        product_name: alias,
        shop_ID: shopID,
        shop_name: shopName,
        product_id: productId,
        count_sold: count_sold,
        ...data.categoryNameHierarchy.reduce((prevItem, item, index) => 
            { 
                prevItem[`category_L${index + 1}`]  =  `${item} - ${data.categoryIdHierarchy[index]}`
                return prevItem
            }, {})
    };
}

export function extractPdpInfo(data){
    const category = data.basicInfo?.category?.name || 'N/A';
    const categoryID = data.basicInfo?.category?.id || 'N/A';
    const alias = data.basicInfo?.alias || 'N/A';
    const shopID = data.basicInfo?.shopID || 'N/A';
    const shopName = data.basicInfo?.shopName || 'N/A';
    const sales_count = data.basicInfo?.txStats?.countSold || 'N/A';
    const sale_price = data.components.find(component => component.name === "mini_variant_options")?.data?.[0].children?.value

    const productID = data.basicInfo?.id || 'N/A'
    return {
        category_name: category,
        category_id: categoryID,
        product_name: alias,
        shop_ID: shopID,
        product_ID: productID,
        shop_name: shopName,
        sales_count: sales_count,
        sales_price:sale_price,
        ...data.basicInfo?.category?.detail.reduce((prevItem, item, index) => 
            { 
                prevItem[`category_L${index + 1}`]  =  `${item.name} - ${item.id}`
                return prevItem
            }, {})
    };
}