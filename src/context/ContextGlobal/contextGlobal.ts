// contextGlobal.tsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export interface MyStateR {
    AddressParent: bigint;
    AddressChildren: bigint;
    //colorMode
}
const useAddrStore = create<MyStateR>()(persist(
    (set, get) => ({
        AddressParent: 100n,
        AddressChildren: 200n
    }),
    { name: 'etatPocketMoney' })
);

export default useAddrStore