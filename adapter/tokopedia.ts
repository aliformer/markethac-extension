import type { TokopediaProductDetailOptions, TokopediaProductSearchByIdOptions, TokopediaShopProductsOptions } from "~core/interfaces/tokopedia.interface";

export const submitHandlerAdapter = {
    tokopedia: (handler:any, args:TokopediaProductSearchByIdOptions | TokopediaShopProductsOptions) => {    
        return handler(args)
    },
    shopee:  (handler:any, args:TokopediaProductSearchByIdOptions | TokopediaShopProductsOptions) => {    
        return handler(args)
    },
    blibli:  (handler:any, args:TokopediaProductSearchByIdOptions | TokopediaShopProductsOptions) => {    
        return handler(args)
    } 
}