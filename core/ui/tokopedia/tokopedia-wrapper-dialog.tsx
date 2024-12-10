

import table from "data-base64:~assets/table.svg"
import type { PropsWithChildren } from "~node_modules/@types/react"
export const  WrapperDialog = ( {shopInfo, isDone, openDialog, children} :  PropsWithChildren & { shopInfo: any, isDone: boolean, openDialog: any}) => {
return (
<div className="p-4 w-full flex flex-col">
    <div className="flex justify-around items-stretch mb-4">
        {shopInfo?.length &&
            <img src={shopInfo[0].shopImage} width={24} height={24} alt="shop-image" />
        }
        {shopInfo?.length &&
            <p className="font-mono font-semibold">Shop ID: {shopInfo[0].basicInfo.shopID}</p>
        }
        {!isDone ? <button className="bg-none" onClick={openDialog}>
            <img src={table} width={24} height={24} alt="icon-table" />
        </button> : <>
        </>}
    </div>
    {children}
</div>
)
}