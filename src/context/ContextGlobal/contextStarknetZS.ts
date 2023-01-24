// contextStarknetZS.ts
// definition of Zustand storage of Parent page, for Starknet variables
import { AccountInterface, defaultProvider, Provider, ProviderInterface, SequencerProvider, constants } from "starknet";
import { create } from 'zustand'
import { connect } from "get-starknet";
import { toast } from "material-react-toastify";
import { DEVNET } from "contracts/addresses";

// global starknet vars of Parent page, without save 

export interface StarknetState {
    account?: AccountInterface;
    connected?: boolean;
    connectBrowserWallet: () => void;
    setConnected: (con: boolean) => void;
    provider?: Provider;
}
type NetworkName = 'mainnet-alpha' | 'goerli-alpha' | 'goerli-alpha-2';

// definition of starknet tmp storage for Parent page
export const useStoreStarknetTmp = create<StarknetState>()(set => ({
    account: undefined,
    connected: false,
    provider: undefined,
    connectBrowserWallet: async () => {
        try {
            const starknet = await connect({ modalMode: "alwaysAsk", modalTheme: "dark" }); // Let the user pick a wallet
            if (!starknet) return;
            await starknet.enable(); // connect the wallet
            if (
                starknet.isConnected &&
                starknet.provider &&
                starknet.account.address
            ) {
                //console.log("contextStarknetZS - connectBrowserWallet - starknet.provider =", starknet.provider, "\nprovider =", new Provider(starknet.provider)); // DDDDDDDDDDDDD
                set(state => ({ account: starknet.account }));
                DEVNET ?
                    set(state => ({ provider: new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } }) }))
                    : () => {
                        let net: NetworkName;
                        switch (starknet.provider.chainId) {
                            case "0x534e5f474f45524c49":
                                net = "goerli-alpha";
                                break;
                            case "0x534e5f474f45524c4932":
                                net = "goerli-alpha-2";
                                break;
                            case "0x534e5f4d41494e":
                                net = "mainnet-alpha"
                                break;
                            default:
                                //error
                                console.error("ChainID unknown =", starknet.provider.chainId);
                        }

                        set(state => ({
                            provider: new Provider({ sequencer: { network: net } })
                        }));
                    }
            }
        } catch (e) {
            toast.error("⚠️ Wallet extension missing!", {
                position: "top-left",
                autoClose: 5000,
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
