// contextParent.ts
import create from 'zustand'
import { persist } from 'zustand/middleware'

// Store in the Context of Parent
// Keep persistent the address of the children account

export interface MyStatePar {
    addressChildren: string;
    childWvalid: boolean;
    setAddChild: (addr: string) => void;
    setChildWvalid: (addr: boolean) => void;
}
const useParentContext = create<MyStatePar>()(persist(
    (set, get) => ({
        addressChildren: "",
        setAddChild: (addr: string) => {
            set((state) => ({ addressChildren: addr }))
        },
        childWvalid: false,
        setChildWvalid: (status: boolean) => {
            set((state) => ({ childWvalid: status }))
        },

    }),
    { name: 'etatPMparent' })
);

export default useParentContext

