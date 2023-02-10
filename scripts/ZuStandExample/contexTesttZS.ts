// ZUSTAND CONTEXT
// contextTestZS.ts
// definition of Zustand storage for Parent page
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// global vars of Parent page, without save 
export interface MyStateParentTmp {
    panelNum: number;
    setPageNum: (pNum: number) => void;
    setPageInc: () => void;
    setPageAdd: (toAdd: number) => void;
}

// definition of tmp storage for Parent page
export const useStoreParentTmp = create<MyStateParentTmp>()(set => ({
    panelNum: 1,
    setPageNum: (pNum: number) => { set(state => ({ panelNum: pNum })) },
    setPageInc: () => { set(state => ({ panelNum: state.panelNum + 1 })) },
    setPageAdd: (toAdd: number) => { set(state => ({ panelNum: state.panelNum + toAdd })) },
}));

// global vars of Parent page, with persistant storage 
export interface MyStateParentPersist {
    addressParent: string;
    AddressChildren: string;
    setAddParent: (addr: string) => void;
    setAddChildren: (addr: string) => void;
}

// definition of persistant storage for Parent page
export const useStoreParentPersist = create<MyStateParentPersist>()
    (persist((set, get) => ({  // "get" necessary if you will use get()
        addressParent: "",
        AddressChildren: "",
        setAddParent: (addr: string) => {
            const a = useStoreParentTmp.getState().panelNum; // read a variable of an other context ZS
            set(state => ({ addressParent: addr + a.toString() }))
        },
        setAddChildren: (addr: string) => {
            const a = get().addressParent; // read a variable from this context ZS
            set(state => ({ AddressChildren: addr + a }))
        },
    }),
        { name: 'etatCAparent' })
    );

// debug in browser/inspect/components / devtool/StoreECU (with React Developper Tools)
if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('StoreECU', useStoreParentPersist);
}

