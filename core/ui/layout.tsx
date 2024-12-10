import React from "react"
import table from "data-base64:~assets/table.svg"
const Layout = ({isOpen, setIsOpen, openDialog, children}: React.PropsWithChildren & {isOpen:boolean, setIsOpen: any, openDialog:any}) => {
    return (
        <div className="relative inline-block">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-none text-white px-4 py-2 rounded"
        >
            <img src="https://strapi.markethac.id/uploads/logo_b49588e089_c17e374a5a.svg" width={32} height={32} alt="markethac-logo" />

        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-[300px] bg-white border border-gray-200 rounded shadow-lg">
        {isOpen && <div className="w-auto p-3 justify-between flex"> 
            <h1 className="text-center font-bold"> Markethac Data Finder</h1>
            <button className="bg-none" onClick={openDialog}>
        <img src={table} width={24} height={24} alt="icon-svg" />
                            </button>
        </div>}
        {children}
        </div>
        </div>

    )
}

export default Layout