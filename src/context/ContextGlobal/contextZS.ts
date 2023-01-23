// contextTestZS.ts
// definition of Zustand storage for Parent page
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


// global vars of Parent page, without save 
export interface MyStateParentTmp {
    panelNum: number;
    setPageNum: (pNum: number) => void;
    setPageInc: () => void;
    setPageAdd: (toAdd: number) => void;
}

// global vars of Parent page, with save 
export interface MyStateParentPersist {
    addressParent: string;
    AddressChildren: string;
    setAddParent: (addr: string) => void;
    setAddChildren: (addr: string) => void;
}

// definition of tmp storage for Parent page
export const useStoreParentTmp = create<MyStateParentTmp>(set => ({
    panelNum: 1,
    setPageNum: (pNum: number) => { set(state => ({ panelNum: pNum })) },
    setPageInc: () => { set(state => ({ panelNum: state.panelNum + 1 })) },
    setPageAdd: (toAdd: number) => { set(state => ({ panelNum: state.panelNum + toAdd })) },
}));

// definition of persistant storage for Parent page
export const useStoreParentPersist = create<MyStateParentPersist>()
    (persist((set, get) => ({
        addressParent: "",
        AddressChildren: "",
        setAddParent: (addr: string) => { set(state => ({ addressParent: addr })) },
        setAddChildren: (addr: string) => { set(state => ({ AddressChildren: addr })) },
    }),
        { name: 'etatCAparent' })
    );

