// contextDisplayContentWalletZS.ts
import { useStoreStarknetTmp } from 'context/ContextGlobal/contextStarknetZS';
import { useEffect, useState } from 'react';
import { Contract, json, Provider } from 'starknet';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import erc20mintableABIjson from "contracts/abis/ERC20Mintable-openZeppelin-0_5_1_abi.json";
import { addrETH } from "contracts/addresses";

// global vars of ERC20 contract, without save 
export interface MyStateETHcontractTmp {
    ETHContract?: Contract;
    setETHContract: () => void;
}

// definition of tmp storage for Parent page
export const useStoreETHcontractTmp = create<MyStateETHcontractTmp>(set => ({

    ETHContract: undefined,
    setETHContract: () => {
        // global Starknet context : provider (readonly)
        const provider: Provider | undefined = useStoreStarknetTmp.getState().provider;

        const erc20mintableABI = json.parse(JSON.stringify(erc20mintableABIjson));
        const addrToken = addrETH;
        set(state => ({ ETHContract: new Contract(erc20mintableABI, addrToken, provider) }))
    },
}));



export default useStoreETHcontractTmp

