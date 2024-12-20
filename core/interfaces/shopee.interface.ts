export type ShopeeShopOptions = {
    shopName: string
}

export type ShopeeProductSearchByIdOptions ={
    shopIds: string[];
    productIds: string[]
}

export type ShopeeShopProductsOptions = {
    limit:number
    match_id: number
    newest: number 
    order: "desc" | "asc"
}

export type ShopeeProductDetailOptions = {
    shop_id: string;
    item_id: string;
}

export interface FetchDataProduct { 
    options: ShopeeProductDetailOptions | ShopeeShopOptions
    handler: any;
    mapper: any;
    append: boolean
}