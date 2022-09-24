// contextParent.ts
import create from 'zustand'
import { persist } from 'zustand/middleware'

// Store in the Context of Parent
// Keep persistent the address of the children account

export interface MyStatePar {
    addressChildren: string;
    setAddChild: (addr: string) => void;
}
const useParentContext = create<MyStatePar>()(persist(
    (set, get) => ({
        addressChildren: "0xundefined",
        setAddChild: (addr: string) => {
            set((state) => ({ addressChildren: addr }))
        }
    }),
    { name: 'etatPMparent' })
);

export default useParentContext

