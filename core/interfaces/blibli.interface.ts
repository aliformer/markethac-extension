export type BlibliShopOptions = {
    shopName: string
}

export type BlibliProductSearchByIdOptions ={
    shopIds: string[];
    productIds: string[]
}

export type BlibliShopProductsOptions = {
    limit:number
    match_id: number
    newest: number 
    order: "desc" | "asc"
}

export type BlibliProductDetailOptions = {
    item_id: string;
}

export interface FetchDataProduct { 
    options: BlibliProductDetailOptions | BlibliShopOptions
    handler: any;
    mapper: any;
    append: boolean
}