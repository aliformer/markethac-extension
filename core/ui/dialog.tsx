// src/Dialog.js
import React, { type PropsWithChildren } from 'react';
import { useDialog } from './dialog-context';
const Dialog = ({items}: {items:any[]}) => {
    const {closeDialog, dialogRef } = useDialog();
    console.log('items', items)
    return (
        <div className="flex justify-end items-end">
            <dialog ref={dialogRef} className="p-6 bg-white rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Data Preview </h2>
                {items.length &&
                (<div className="flex flex-col max-h-[400px] overflow-y-auto"> 
                    {items?.map( (item:any, index:number) => {
                        return (
                        <div key={"keyid_" + index}>
                        <p> {item.name}</p>
                        <p>{item.productUrl}</p>
                        </div>
                        )
                    })}
                </div>)
}
                <button onClick={closeDialog} className="px-4 py-2 bg-red-500 text-white rounded">
                    Close
                </button>
            </dialog>
        </div>
    );
};

export default Dialog