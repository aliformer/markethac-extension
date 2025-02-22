export type TokopediaShopOptions = {
    shopName: string
}

export type TokopediaShopProductsOptions = {
    shopId: string | number;
    offset: number;
    sort: number;
    page: number
}

export type TokopediaProductDetailOptions = {
    shopDomain: string;
    productKey: string;
    apiVersion: number;
}

export interface FetchData { 
    store: any;
    options: TokopediaProductDetailOptions | TokopediaShopOptions | TokopediaShopProductsOptions;
    payload: any;
    mapper: any;
    append: boolean
}