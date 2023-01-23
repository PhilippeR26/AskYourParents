// contextStarknetZS.ts
// definition of Zustand storage of Parent page, for Starknet variables
import { AccountInterface, defaultProvider, Provider, ProviderInterface, SequencerProvider } from "starknet";
import { create } from 'zustand'
import { connect } from "get-starknet";
import { toast } from "material-react-toastify";

// global starknet vars of Parent page, without save 

export interface StarknetState {
    account?: AccountInterface;
    connected?: boolean;
    connectBrowserWallet: () => void;
    setConnected: (con: boolean) => void;
    provider: Provider;
}

// definition of starknet tmp storage for Parent page
export const useStoreStarknetTmp = create<StarknetState>(set => ({
    account: undefined,
    connected: false,
    provider: new Provider(defaultProvider),
    connectBrowserWallet: async () => {
        try {
            const starknet = await connect({ modalMode: "alwaysAsk", modalTheme: "dark" }); // Let the user pick a wallet
            if (!starknet) return;
            await starknet.enable(); // connect the wallet
            const tmpSequencerProvider: SequencerProvider = new SequencerProvider(starknet.provider); // starknet.provider est censé être du type ProviderInterface, mais en fait il contient une instance de la class SequencerProvider, ou un truc proche de ProviderInterface.
            if (
                starknet.isConnected &&
                starknet.provider &&
                starknet.account.address
            ) {
                set(state => ({ account: starknet.account }));
                set(state => ({ provider: new Provider(tmpSequencerProvider) }));
            }
        } catch (e) {
            toast.error("⚠️ Wallet extension missing!", {
                position: "top-left",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    },
    setConnected: (con: boolean) => {
        set(state => ({ connected: con }));
        if (!con) {
            set(state => ({ account: undefined }));
            set(state => ({ provider: defaultProvider }));
        }
    },
}));
