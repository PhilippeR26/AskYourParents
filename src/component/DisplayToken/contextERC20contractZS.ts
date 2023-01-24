// 
//
import { Abi, Contract, json, Provider, uint256 } from 'starknet';
import { create } from 'zustand'
import erc20mintableABIjson from "contracts/abis/ERC20Mintable-openZeppelin-0_5_1_abi.json";
import ERC20addresses from "contracts/ERC20addresses.json";
import { DEVNET } from "contracts/addresses";
import { mountStoreDevtool } from 'simple-zustand-devtools';

// global vars of ERC20 contract, without save 
export interface Token {
    tokenName: string,
    erc20contract: Contract,
    erc20decimals: number,
    erc20address: string,
}
export interface MyStateERC20tmp {
    tokenList: Token[],
    erc20abi: Abi,
    setERC20contract: (tokenID: string, provider: Provider | undefined) => void,
    getDecimalsERC20: (tokenID: string) => number | undefined,
    getContractERC20: (tokenID: string) => Contract | undefined,
}

interface objERC20addrList {
    nameToken: string,
    erc20decimals: number,
    addressDevnet: string,
    addressTestnet: string,
    addressTestnet2: string,
    addressMainnet: string,
}
type erc20addrList = objERC20addrList | undefined;

interface erc20data {
    address: string,
    decimals: number,
}

// find in the json the token, and return the addr for this provider
function getERC20tokenData(tokenID: string, provider: Provider): erc20data {
    const myERC20data: erc20addrList = ERC20addresses.erc20.find((tokenData: objERC20addrList) => tokenData.nameToken == tokenID);
    if (myERC20data) {
        let addr: string;
        if (DEVNET) { addr = myERC20data.addressDevnet }
        else {
            switch (provider.chainId) {
                case "0x534e5f474f45524c49": //testnet
                    addr = myERC20data["addressTestnet"];
                    break;
                case "0x534e5f474f45524c4932": //testnet2
                    addr = myERC20data["addressTestnet2"];
                    break;
                case "0x534e5f4d41494e": //mainnet
                    addr = myERC20data["addressMainnet"];
                    break;
                default:
                    addr = "0x00";
                    console.log(" contextERC20contractZS.Ts - getERC20tokenAddr - unknow chain ID =", provider.chainId);
            }
        }
        const data = { address: addr, decimals: myERC20data["erc20decimals"] };

        return data;
    }
    else {
        console.log(" contextERC20contractZS.Ts - getERC20tokenAddr - unknow token =", tokenID);
        return { address: "0x00", decimals: 0 };
    }
}

// definition of non saved storage for ERC20 management
export const useStoreERC20contractTmp = create<MyStateERC20tmp>()((set, get) => ({
    tokenList: [],
    erc20abi: json.parse(JSON.stringify(erc20mintableABIjson)),

    // initialize/update an ERC20 : address & contract
    setERC20contract: (tokenID: string, provider: Provider | undefined) => {

        const tokList: Token[] = get().tokenList;
        if (!tokList.find((token: Token) => token.tokenName === tokenID)) {
            // creation
            if (provider) {
                const { address: addrERC20, decimals } = getERC20tokenData(tokenID, provider);
                if (addrERC20 !== "0x00") {
                    const token: Token = {
                        tokenName: tokenID,
                        erc20address: addrERC20,
                        erc20contract: new Contract(get().erc20abi, addrERC20, provider),
                        erc20decimals: decimals
                    };
                    const tmpList: Token[] = get().tokenList;
                    tmpList.push(token);
                    set({ tokenList: tmpList });
                    //fetchDecimalsERC20(tokenID);
                }
            }
        } else {
            // Token already exist in the array of tokens : update.
            // Should be here only if provider has changed.
            if (provider) {
                const { address: addrERC20, decimals } = getERC20tokenData(tokenID, provider);
                if (addrERC20 !== "0x00") {
                    const tokenPos = tokList.findIndex((token: Token) => { if (token.tokenName === tokenID) { return true } });
                    tokList[tokenPos] = {
                        tokenName: tokenID,
                        erc20decimals: decimals,
                        erc20address: addrERC20,
                        erc20contract: new Contract(get().erc20abi, addrERC20, provider)
                    };
                    set({ tokenList: tokList });
                } else {
                    console.log("contextERC20contractZS.Ts - setERC20contract - token was present in previous network ; unknown in this new network :", provider.chainId)
                }
            }
        }
    },

    getDecimalsERC20: (tokenID: string): number | undefined => {
        const tokList: Token[] = get().tokenList;
        const myToken: Token | undefined = tokList.find((token: Token) => { if (token.tokenName == tokenID) { return token } });
        if (myToken) {
            return myToken.erc20decimals;
        }
    },
    getContractERC20: (tokenID: string): Contract | undefined => {
        const tokList: Token[] = get().tokenList;
        const myToken: Token | undefined = tokList.find((token: Token) => { if (token.tokenName == tokenID) { return token } });
        if (myToken) {
            return myToken.erc20contract;
        }
    }

}));

// debug in browser/inspect/components / devtool/StoreECU (with React Developper Tools)
if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('StoreERC20', useStoreERC20contractTmp);
}


export default useStoreERC20contractTmp

