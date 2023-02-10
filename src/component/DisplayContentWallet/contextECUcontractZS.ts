// 
//
import { useStoreStarknetTmp } from 'context/ContextGlobal/contextStarknetZS';
import { Contract, json, Provider, uint256 } from 'starknet';
import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import erc20mintableABIjson from "contracts/abis/ERC20Mintable-openZeppelin-0_5_1_abi.json";
import { addrECUdevnet } from "contracts/addresses";

// global vars of ERC20 contract, without save 
export interface MyStateECUcontractTmp {
    ECUcontract?: Contract,
    ECUdecimals?: number,
    ECUbalance?: bigint,
    isLoadingBalance: boolean,
    fetchECUcontract: () => void,
    fetchDecimalsECU: () => void,
    fetchBalanceECU: (addr: string) => void,
}


// definition of tmp storage for Parent page
export const useStoreECUcontractTmp = create<MyStateECUcontractTmp>()((set, get) => ({

    ECUcontract: undefined,
    ECUdecimals: undefined,
    ECUbalance: undefined,
    isLoadingBalance: false,
    fetchECUcontract: () => {
        const provider: Provider | undefined = useStoreStarknetTmp.getState().provider;
        if (typeof provider !== "undefined") {
            const erc20mintableABI = json.parse(JSON.stringify(erc20mintableABIjson));
            set({ ECUcontract: new Contract(erc20mintableABI, addrECUdevnet, provider) });
        }
    },
    fetchDecimalsECU: async () => {
        const contract = get().ECUcontract;
        if ((typeof contract !== "undefined")) {
            const result = await contract.call("decimals");
            set({ ECUdecimals: parseInt(result.decimals) });
        } else {

        }
    },
    fetchBalanceECU: (addr: string) => {
        const contract = get().ECUcontract;
        if (typeof contract !== "undefined") {
            set({ isLoadingBalance: true });
            contract.call("balanceOf", [addr])
                .then((result) => {
                    const balance = BigInt(uint256.uint256ToBN(result.balance).toString());
                    set({ isLoadingBalance: false });
                    set({ ECUbalance: balance });
                })
                .catch((e: Error) => {
                    set({ isLoadingBalance: false });
                    console.error("Error while retrieving balance of ECU :", e);
                })
        } else {
        }
    },
}));

// debug in browser/inspect/components / devtool/StoreECU (with React Developper Tools)
if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('StoreECU', useStoreECUcontractTmp);
}

export default useStoreECUcontractTmp

