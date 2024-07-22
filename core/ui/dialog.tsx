
import { useDialog } from './dialog-context';
import { DynamicTable } from './dynamic-table';

const Dialog = ({items}: {items:any[]}) => {
    const {closeDialog, dialogRef } = useDialog();
    return (
        <div className="flex justify-end items-end">
            <dialog ref={dialogRef} className="p-6 bg-white rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Data Preview </h2>
                <div> 
                    export 
                </div>
                <div className="flex flex-col max-h-[400px] overflow-y-auto"> 
                    {/* {items?.map( (item:any, index:number) => { */}
                        {/* return ( */}
                        {/* <div key={"keyid_" + index} className="inline-flex gap-2">
                        <p className="font-bold text-md"> {index + 1}</p>
                        <p className="text-md"> {item.basicInfo.alias}</p>
                        <p className='text-md'>{item.basicInfo.shopID}</p>
                        </div> */}
                        <DynamicTable data={items} />
                        {/* ) */}
                    {/* })} */}
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