import { useEffect, useState } from "react"
import table from "data-base64:~assets/table.svg"
import { useDialog } from "../dialog-context";
import Dialog from "../dialog";
import ConfigForm from "../product-detail/form";
import { tokopediaResponse } from "~core/helper/response-mapper";
import type { FetchDataProduct, TokopediaProductDetailOptions, TokopediaShopProductsOptions } from "~core/interfaces/tokopedia.interface";
import { tokopediaProductDetail } from "~core/service/tokopedia";
import {Tab} from "../tab";
import { WrapperDialog } from "./tokopedia-wrapper-dialog";
import ProductDetailsForm from "../product-detail/form";
import ProductSearchForm from "../product-search/form";
import Layout from "../layout";
export const Main = ({ fetchData, config }: { fetchData:any, config: any[] }) => {
    const [storeInfoConfig, storeProductConfig, productDetailConfig] = config
    const [isOpen, setIsOpen] = useState(false)
    const [shopInfo, setShopInfo] = useState(null)
    const [shopProducts, setShopProducts] = useState([])
    const [shopName, setShopName] = useState('')
    const [isDone, setIsDone] = useState(false) 
    const [productDetails,setProductDetails] = useState([])
    const [productDetailsById,setProductDetailsById] = useState([])
    const [productByIds, setProductByIds] = useState([])
    const fetchShopInfo = async (shopName: string) => {
        const result =  await fetchData({  options: { shopName }, payload: storeInfoConfig, mapper: tokopediaResponse.shopInfoMapper, append: false }) as FetchDataProduct
        setShopInfo(result)
        return result
    }
    useEffect(() => {
        const shopName = window.location.pathname.split('/')[1]
        if (shopName) {
            setShopName(shopName)
            fetchShopInfo(shopName)
        }
    }, [fetchData])

    const generatePoductListfromID = async ({productIds, shopIds}:{shopIds:string[]; productIds:string[]}) => {
        let dumpResponse =[] 
        for (let [index, productKey] of productIds.entries() ){
            const options: TokopediaProductDetailOptions = {
                shopDomain: shopIds[index],
                productKey:productKey,
                apiVersion: 1
            }
            if(tokopediaResponse.productDetailResponse){
            const result = await fetchData({
                options: options,
                payload: productDetailConfig, 
                append: true,
                mapper:tokopediaResponse.productDetailResponse
            })
            dumpResponse = [...dumpResponse , result]
        }


        }
        setProductDetailsById(dumpResponse)
        console.log('dumpResponse', dumpResponse)
        return dumpResponse
    }
    const generateProductList = async ({
        offset,
        sort,
        pageFrom,
        pageTo
    }):Promise<any> => {
        const sequences = Array.from({ length: pageTo - pageFrom }, (_, i) => i + 1);
        let dumpResponse =[] 
        for (let sequence of sequences) {
         const result:any[] = await fetchData({
                options: {
                    shopId: shopInfo[0].basicInfo.shopID,
                    offset,
                    sort,
                    page:sequence
                } as TokopediaShopProductsOptions, 
                payload: storeProductConfig, 
                mapper: tokopediaResponse.productListMapper,
                append: true,
            })
         dumpResponse = [...dumpResponse, ...result]

     }
     setShopProducts(dumpResponse)
     return dumpResponse
    }


    const generateProductDetails = async () => {
        let dumpResponse =[] 
        for (let [index, shopProduct] of shopProducts.entries() ){
            const path = (new URL(shopProduct.product_url)).pathname
            const productKey = path.substring(path.lastIndexOf('/')+1, path.length)
            const options: TokopediaProductDetailOptions = {
                shopDomain: shopName,
                productKey:productKey,
                apiVersion: 1
            }
            if(tokopediaResponse.productDetailResponse){
            const result = await fetchData({
                options: options,
                payload: productDetailConfig, 
                append: true,
                mapper:tokopediaResponse.productDetailResponse
            })
            dumpResponse = [...dumpResponse , result]
        }


        }
        setProductDetails(dumpResponse)
        return dumpResponse
    }
    const { openDialog } = useDialog()

    useEffect(() => {
        generateProductDetails()
        setIsDone(true)
    }
    ,[shopProducts])

    return (
        <Layout isOpen={isOpen} setIsOpen={setIsOpen} openDialog={openDialog}>
     
            {isOpen && (
                    <Tab  tabs={
                        [

                            {
                                label: "Search By Shop",
                                component: isOpen && (<WrapperDialog openDialog={openDialog} isDone={isDone} shopInfo={shopInfo} >
                                <ProductDetailsForm submitHandler={generateProductList} finished={productDetails.length} channel="tokopedia" shopInfo={shopInfo}/> 
                                <Dialog items={productDetails} channel="tokopedia" />
                                </WrapperDialog>)
                            },
                            {
                                label: "Search by ID",
                                component: isOpen && (<WrapperDialog openDialog={openDialog} isDone={isDone} shopInfo={shopInfo} >
                                <ProductSearchForm submitHandler={generatePoductListfromID} finished={productDetailsById.length} channel="tokopedia"/> 
                                <Dialog items={productDetailsById} channel="tokopedia" />

                                </WrapperDialog>)
                            },

                        ]
                    }/>
                )}
                   </Layout>
    );
};


