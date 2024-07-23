import { useEffect, useState } from "react"
import table from "data-base64:~assets/table.svg"
import { useDialog } from "../dialog-context";
import Dialog from "../dialog";
import ConfigForm from "../form";
import { tokopediaResponse } from "~core/helper/response-mapper";
import type { FetchData, TokopediaProductDetailOptions, TokopediaShopProductsOptions } from "~core/interfaces/tokopedia.interface";
import { tokopediaProductDetail } from "~core/utils/tokopedia";
export const Main = ({ fetchData, config }: { fetchData:any, config: any[] }) => {
    const [storeInfoConfig, storeProductConfig, productDetailConfig] = config
    const [isOpen, setIsOpen] = useState(false)
    const [shopInfo, setShopInfo] = useState(null)
    const [shopProducts, setShopProducts] = useState([])
    const [shopName, setShopName] = useState('')
    const [isDone, setIsDone] = useState(false) 
    const [productDetails,setProductDetails] = useState([])
    const fetchShopInfo = async (shopName: string) => {
        const result =  await fetchData({  options: { shopName }, payload: storeInfoConfig, mapper: tokopediaResponse.shopInfoMapper, append: false }) as FetchData
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

        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-none text-white px-4 py-2 rounded"
            >
                <img src="https://strapi.markethac.id/uploads/logo_b49588e089_c17e374a5a.svg" width={32} height={32} alt="markethac-logo" />

            </button>
            {isOpen && shopInfo && (

                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[250px] bg-white border border-gray-200 rounded shadow-lg">
                    <div className="p-4 w-full flex flex-col">
                        <div className="flex justify-around items-stretch mb-4">
                            {shopInfo.length &&
                                <img src={shopInfo[0].shopImage} width={24} height={24} alt="shop-image" />
                            }
                            {shopInfo.length &&
                                <p className="font-mono font-semibold">Shop ID: {shopInfo[0].basicInfo.shopID}</p>
                            }
                            {isDone ? <button className="bg-none" onClick={openDialog}>
                                <img src={table} width={24} height={24} alt="icon-table" />
                            </button> : <>
                            </>}
                        </div>

                        <ConfigForm submitHandler={generateProductList} finished={productDetails.length}/>
                    </div>
                </div>
            )}
            <Dialog items={productDetails} channel="tokopedia" />
        </div>
    );
};


