// contextChildrenAccountZS.ts
// definition of Zustand storage of Parent page, for children account variables
import { Abi, Account, Contract, ContractInterface, FunctionAbi, Provider, ProviderInterface, StructAbi } from "starknet";
import { create } from 'zustand'
import { toast } from "material-react-toastify";

// global children wallet vars of Parent page, without save 
export interface ChildrenContractState {
    childrenContract?: Contract;
    childrenConnected: boolean;
    connectChildrenWallet: (provider: Provider, childrenAccountAddress: string, parentAccountAddress: string) => void;
    setChildrenConnected: (con: boolean) => void;
}

// definition of children wallet tmp ZS storage for Parent page
export const useStoreChildrenTmp = create<ChildrenContractState>()(set => ({
    childrenContract: undefined,
    childrenConnected: false,
    connectChildrenWallet: async (provider: Provider, childrenAccountAddress: string, parentAccountAddress: string) => {
        try {
            const { abi: childrenContractABI } = await provider.getClassAt(childrenAccountAddress);
            if (childrenContractABI === undefined) { throw new Error("no account at this address.") };
            if (!childrenContractABI.some((itemAbi) => itemAbi.name === "getSuperAdmin")) { throw new Error("Not a Children Account contract.") };
            const childrenContract = new Contract(childrenContractABI, childrenAccountAddress, provider);
            const result = await childrenContract.call("isAdmin", [parentAccountAddress]);
            if (parseInt(result.is_admin) != 1) {
                toast.error("⚠️ You are not administrator \nof this children account!", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

            } else {
                set(state => ({ childrenContract: childrenContract }));
                set(state => ({ childrenConnected: true }));
            };

        } catch (e) {
            console.log("error :", e);
            toast.error("⚠️ Address is not children account!", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    },
    setChildrenConnected: (con: boolean) => {
        set(state => ({ childrenConnected: con }));
        if (!con) {
            set(state => ({ childrenContract: undefined }));
        }
    },
}));
