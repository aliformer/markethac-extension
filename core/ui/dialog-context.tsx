// src/DialogContext.js
import React, { createContext, useState, useContext, useRef } from 'react';

 
const DialogContext:any = createContext({});

export const useDialog= ():{openDialog:any; closeDialog:any; dialogRef:null; isOpen:boolean} => useContext(DialogContext);

export const DialogProvider = ({ children }) => {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setIsOpen(false);
    dialogRef.current.close();
  };

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog, dialogRef }}>
      {children}
    </DialogContext.Provider>
  );
};
