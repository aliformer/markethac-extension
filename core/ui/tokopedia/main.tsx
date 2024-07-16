import { useEffect, useState } from "react"
import csv from "data-base64:~assets/csv-icon.svg"
import { useDialog } from "../dialog-context";
import Dialog from "../dialog";
import ConfigForm from "../form";
import { tokopediaResponse } from "~core/helper/response-mapper";
export const Main = ({ fetchData, config }: { fetchData: any, config: any[] }) => {
    const [storeInfoConfig, storeProductConfig] = config
    const [isOpen, setIsOpen] = useState(false)
    const [shopInfo, setShopInfo] = useState(null)
    const [shopProducts, setShopProducts] = useState([])
    const fetchShopInfo = async (shopName: string) => {
        return await fetchData({ store: setShopInfo, options: { shopName }, payload: storeInfoConfig, mapper: tokopediaResponse.shopInfoMapper })
    }
    useEffect(() => {
        const shopName = window.location.pathname.split('/')[1]
        if (shopName) {
            fetchShopInfo(shopName)
        }
    }, [fetchData])

    const generateProductList = async ({
        offset,
        sort,
        pageFrom,
        pageTo
    }) => {
        const sequences = Array.from({ length: pageTo - pageFrom }, (_, i) => i + 1);
        for (let sequence of sequences) {
            await fetchData({
                store: setShopProducts, 
                options: {
                    shopId: shopInfo[0].basicInfo.shopID,
                    offset,
                    sort,
                    page:sequence
                }, 
                payload: storeProductConfig, 
                mapper: tokopediaResponse.productListMapper
            }, true)
        }
    }

    const { openDialog } = useDialog()

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
                            <button className="bg-none" onClick={openDialog}>
                                <img src={csv} width={24} height={24} alt="icon-svg" />
                            </button>
                        </div>

                        <ConfigForm submitHandler={generateProductList}/>


                    </div>
                </div>
            )}
            <Dialog items={shopProducts} />
        </div>
    );
};


