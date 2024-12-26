import { useEffect, useState } from "react"
import { useDialog } from "../dialog-context";
import Dialog from "../dialog";
import type { ShopeeProductDetailOptions } from "~core/interfaces/shopee.interface";
import { fetchDataProducts, searchByIdParams } from "~core/service/shopee";
import Layout from "../layout";
import { Tab } from "../tab";
import { WrapperDialog } from "./shopee-wrapper-dialog";
import ProductSearchForm from "../product-search/form";
import { shopeeUrlMatch } from "~core/helper/url-mapper";
import { shopeeResponse } from "~core/helper/response-mapper";

export const Main = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [productDetailsById, setProductDetailsById] = useState<any[]>([])
    const [isDone, setIsDone] = useState(false)
    const { openDialog } = useDialog()

    const generatePoductListfromID = async ({ urlProducts }: { urlProducts: [] }) => {
        const dumpResponse = []
        for (let urlProduct of urlProducts) {
            const { shop_id, item_id } = shopeeUrlMatch(urlProduct) as Record<string, string>
            const result = await fetchDataProducts({
                options: { shop_id, item_id } as ShopeeProductDetailOptions,
                append: true,
                handler: searchByIdParams,
                mapper: shopeeResponse.productDetailResponse
            })
            dumpResponse.push(result)
        }
        setProductDetailsById(dumpResponse)
        return dumpResponse
    }

    return (
        <Layout isOpen={isOpen} setIsOpen={setIsOpen} openDialog={openDialog}>
            {isOpen && (
                <Tab tabs={[
                    {
                        label: "Search by Product ID",
                        component: (
                            <WrapperDialog isDone={isDone} openDialog={openDialog}>
                                <ProductSearchForm
                                    submitHandler={generatePoductListfromID}
                                    finished={productDetailsById.length}
                                    channel="shopee"
                                />
                                <Dialog items={productDetailsById} channel="shopee" />
                            </WrapperDialog>
                        )
                    }]} />
            )}
        </Layout>
    );
};


