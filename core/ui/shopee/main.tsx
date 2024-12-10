import { useEffect, useState } from "react"
import table from "data-base64:~assets/table.svg"
import { useDialog } from "../dialog-context";
import Dialog from "../dialog";
import { fetchData } from "~core/service/blibli";

export const Main = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [shopInfo, setShopInfo] = useState(null)
    const [shopProducts, setShopProducts] = useState([])
    const [shopID, setShopID] = useState('')
    const [productDetails,setProductDetails] = useState([])
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
    useEffect(() => {
    const shopID = window.location.pathname.split('/')[3] 
    if(shopID){
        setShopID(shopID)
        fetchProducts(shopID)   
    }
     
},[])

    const { openDialog } = useDialog()

    return (

        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-none text-white px-4 py-2 rounded"
            >
                <img src="https://strapi.markethac.id/uploads/logo_b49588e089_c17e374a5a.svg" width={32} height={32} alt="markethac-logo" />

            </button>
            {isOpen  && (

                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[250px] bg-white border border-gray-200 rounded shadow-lg">
                    <div className="p-4 w-full flex flex-col">
                        <div className="flex justify-around items-stretch mb-4">
                            {/* {shopInfo.length &&
                                <img src={shopInfo[0].shopImage} width={24} height={24} alt="shop-image" />
                            }
                            {shopInfo.length &&
                                <p className="font-mono font-semibold">Shop ID: {shopInfo[0].basicInfo.shopID}</p>
                            } */}
                            <button className="bg-none" onClick={openDialog}>
                                <img src={table} width={24} height={24} alt="icon-svg" />
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <Dialog items={productDetails} channel="blibli"/>
        </div>
    );
};


 