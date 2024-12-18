import { useEffect, useState } from "react"
import table from "data-base64:~assets/table.svg"
import { useDialog } from "../dialog-context";
import Dialog from "../dialog";
import { fetchData } from "~core/service/blibli";
import type { ShopeeProductDetailOptions } from "~core/interfaces/shopee.interface";
import { fetchDataProducts, searchByIdParams } from "~core/service/shopee";
import Layout from "../layout";
import { Tab } from "../tab";
import { WrapperDialog } from "../tokopedia/tokopedia-wrapper-dialog";
import ProductSearchForm from "../product-search/form";
import { shopeeUrlMatch } from "~core/helper/url-mapper";

export const Main = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [shopInfo, setShopInfo] = useState(null)
    const [shopProducts, setShopProducts] = useState([])
    const [shopID, setShopID] = useState('')
    const [urlProducts, setUrlProducts] = useState([])
    const [productDetails,setProductDetails] = useState([])
    const [productDetailsById,setProductDetailsById] = useState<any[]> ([])
    const [isDone, setIsDone] = useState(false) 
    const fetchProducts = async (shopID) => {
        const result = await  fetchData({config:{
            shopID
        }})
        let dumpResponse = result.data.products ||[]
        const pages = result.data.paging.total_page - result.data.paging.page 
        
        let initialPage = result.data.paging.page
        for (let i=1 ; i <= pages ; i ++){
            const response =  await fetchData({config:{
            shopID,
            page:initialPage+ i,
            offset: i * 40
            }})  
            const res = response.data.products
            dumpResponse = [...dumpResponse, ...res]
            console.log(dumpResponse)
        }
        setProductDetails(dumpResponse)
        return dumpResponse
    }

 const generatePoductListfromID = async ({urlProducts}:{urlProducts:[]}) => {
        let dumpResponse =[] 
        for (let urlProduct of urlProducts ){
            const {shop_id, item_id} = shopeeUrlMatch(urlProduct) as Record<string, string>
            const options: ShopeeProductDetailOptions = {
                shop_id,
                item_id
            }
            const result = await fetchDataProducts({
                options: options,
                append: true,
                mapper: searchByIdParams
            })
            console.log('result', result)
            dumpResponse = [...dumpResponse , result]
        }
        setProductDetailsById(dumpResponse)
        console.log('dumpResponse', dumpResponse)
        return dumpResponse
    }

    useEffect(() => {
    const shopID = window.location.pathname.split('/')[3] 
    if(shopID){
        setShopID(shopID)
        fetchProducts(shopID)   
    }
     
},[])
// useEffect(() => {
//     generateProductDetails()
//     setIsDone(true)
// })

    const { openDialog } = useDialog()

    return (
        <Layout isOpen={isOpen} setIsOpen={setIsOpen} openDialog={openDialog}>
     
        {isOpen && (
                <Tab  tabs={
                    [

                        
                        {
                            label: "Search by ID",
                            component: isOpen && (<WrapperDialog openDialog={openDialog} isDone={isDone} shopInfo={shopInfo} >
                            <ProductSearchForm submitHandler={generatePoductListfromID} finished={productDetailsById.length} channel="shopee"/> 
                           { /* <Dialog items={productDetailsById} channel="shopee" /> */}

                            </WrapperDialog>)
                        },

                    ]
                }/>
            )}
               </Layout>
    );
};


 