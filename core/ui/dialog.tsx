
import { useEffect, useState } from 'react';
import { useDialog } from './dialog-context';
import { DynamicTable } from './dynamic-table';
import csv from "data-base64:~assets/csv-icon.svg"
import { jsonToCsv, downloadCsv } from '~core/helper/json-to-csv';
const Dialog = ({ items, channel}: { items: any[], channel:string }) => {

    const { closeDialog, dialogRef } = useDialog();
    const [productList, setProductList] = useState([])
    const [csvData, setCsvData] = useState(null)
    function extractProductInfo(data) {
        const alias = data.name || 'N/A';
        const productId= data.sku || 'N/A';
        const shopID = data.merchantCode || 'N/A';
        const shopName = data.merchantName || 'N/A';
        const count_sold = data.soldRangeCount?.id || 'N/A';
        return {
            product_name: alias,
            shop_ID: shopID,
            shop_name: shopName,
            product_id: productId,
            count_sold: count_sold,
            channel: "blibli",
            ...data.categoryNameHierarchy.reduce((prevItem, item, index) => 
                { 
                    prevItem[`category_L${index + 1}`]  =  `${item} - ${data.categoryIdHierarchy[index]}`
                    return prevItem
                }, {})
        };
    }

    function extractPdpInfo(data){
        const category = data.basicInfo?.category?.name || 'N/A';
        const categoryID = data.basicInfo?.category?.id || 'N/A';
        const alias = data.basicInfo?.alias || 'N/A';
        const shopID = data.basicInfo?.shopID || 'N/A';
        const shopName = data.basicInfo?.shopName || 'N/A';
        const sales_count = data.basicInfo?.txStats?.countSold || 'N/A';
        const sale_price = data.components.find(component => component.name === "product_content")?.data?.[0]?.price?.value

        const productID = data.basicInfo?.id || 'N/A'
        return {
            category_name: category,
            category_id: categoryID,
            product_name: alias,
            shop_ID: shopID,
            product_ID: productID,
            shop_name: shopName,
            sales_count: sales_count,
            sales_price: sale_price,
            channel: "tokopedia",
            ...data.basicInfo?.category?.detail.reduce((prevItem, item, index) => 
                { 
                    prevItem[`category_L${index + 1}`]  =  `${item.name} - ${item.id}`
                    return prevItem
                }, {})
        };
    }

    function extractShopeeData(data){
        const { categories, fe_categories } = data;
          const mainCategory = categories[categories.length - 1];
          const CategoryId = mainCategory.catid;
          const CategoryChannel = mainCategory.display_name;
          const L1 = fe_categories[0].display_name;
          const L2 = fe_categories[1].display_name;


        return {
            category_id: CategoryId,
            category_channel:CategoryChannel,
            L1 : L1,
            L2: L2,
            category: mainCategory,
            channel: "shopee",
        }
    }
    useEffect(() => {
        if(items.length){
        const productList = items?.map((item: any) => {
            switch(channel){
            case 'tokopedia': {
            return extractPdpInfo(item)
            }
            case 'blibli': {
            return extractProductInfo(item)
            }
            case 'shopee':{
                return extractShopeeData(item)
            }
        }
        })
        console.log('product list', productList)
        setProductList(productList)
        if(productList.length){
            
        const csvResult = jsonToCsv(productList)
        setCsvData(csvResult)
        }
    }
    },[items])

    const downloadCSVFile = () => {
        if(csvData){
        downloadCsv(csvData, `${channel}.csv` )
        }
    }
    return (
        <div className="flex justify-end items-end ">
            <dialog ref={dialogRef} className="p-6 bg-white rounded shadow-lg min-w-2xl max-w-8xl w-full">
                <h2 className="text-xl font-semibold mb-4">Data Preview </h2>
                <div className='p-3'>
                    <button onClick={downloadCSVFile}>
                    <img src={csv} width={24} height={24} alt="icon-csv" />
                    </button>
                    
                </div>
                <div className="flex flex-col max-w-8xl ">
                    <DynamicTable data={productList} />
                </div>
                <div className='flex justify-start py-2'>
                    <button onClick={closeDialog} className="px-4 py-2 bg-red-500 text-white rounded">
                        Close
                    </button>
                </div>
            </dialog>
        </div>
    );
};

export default Dialog