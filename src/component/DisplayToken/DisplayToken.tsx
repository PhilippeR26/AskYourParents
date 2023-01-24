import { useEffect, useMemo, useRef, useState } from "react";
import { useStoreStarknetTmp } from "context/ContextGlobal/contextStarknetZS";
import { useStoreERC20contractTmp, Token } from "component/DisplayContentWallet"
import { Provider, AccountInterface, Contract, uint256, CallContractResponse } from "starknet";
import { List, ListIcon, ListItem, Spinner, UnorderedList } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
// import erc20mintableABIjson from "../../contracts/abis/ERC20Mintable-openZeppelin-0_5_1_abi.json";

export interface DisplayTokenProps {
    accountAddress: string,
    tokenName: string
}

// transform a bigint to a text with n decimals
export function formatAmountToken(amount: bigint, decimalsToken: number): string {
    // if (decimalsToken !== -1) {
    const initialString = amount.toString();
    const amountText: string = "0".repeat(decimalsToken) + initialString;
    const posLeft = Math.min(decimalsToken, amountText.length - decimalsToken - 1)
    const left: string = amountText.slice(posLeft, amountText.length - decimalsToken);
    const right: string = amountText.slice(-decimalsToken);
    const fullString = left + "." + right;
    return fullString as string;
    // } else {
    //     return "Loading"
    // }
}


const DisplayToken = ({ accountAddress, tokenName }: DisplayTokenProps) => {
    // global Starknet context : provider (readonly)
    const provider = useStoreStarknetTmp(state => state.provider);

    // ERC20 contract context : set ERC20contract (write)
    const setERC20contract = useStoreERC20contractTmp((state) => state.setERC20contract);

    // ERC20 contracts context : getContract (readonly)
    const getERC20Contract = useStoreERC20contractTmp(state => state.getContractERC20);
    const [erc20Contract, setErc20Contract] = useState<Contract>();

    // ERC20 contracts context : decimals (readonly)
    const getDecimalsERC20 = useStoreERC20contractTmp(state => state.getDecimalsERC20);
    const [decimals, setDecimals] = useState<number>();

    // status fetch decimals
    const [balanceERC20, setBalanceERC20] = useState<bigint | undefined>(undefined);

    //
    // when provider available,launch definition of contract 
    useEffect(() => {
        if (provider) {
            setERC20contract(tokenName, provider);
            setDecimals(getDecimalsERC20(tokenName));
            setErc20Contract(getERC20Contract(tokenName));
        }
    }, [getDecimalsERC20, getERC20Contract, provider, setERC20contract, tokenName]);


    // when decimals defined, fetch balance
    useEffect(() => {
        if (decimals) {
            setBalanceERC20(undefined);

            //if (typeof erc20Contract !== "undefined") {
            const contractMyERC20 = getERC20Contract(tokenName);
            if (contractMyERC20) {
                contractMyERC20.call("balanceOf", [accountAddress])
                    .then((res: any) => {
                        const balanceRes = res.balance;
                        const a = BigInt(uint256.uint256ToBN(balanceRes).toString());
                        console.log("a =", a);
                        // console.log("balanceERC20.current =", balanceERC20);
                        setBalanceERC20(a);
                    })
                    .catch((e: Error) => {
                        console.error("Do not succeed to load balance of :", tokenName, accountAddress, e);
                        process.exit(1);
                    }
                    )
            }
        }
    }
        ,
        [erc20Contract, accountAddress, tokenName, decimals, getERC20Contract]);

    return (

        <>
            {tokenName}  :
            {(decimals) ? (
                <>
                    &nbsp; {!balanceERC20 ? (<Spinner color='blue' />) : (formatAmountToken(balanceERC20, decimals))}
                </>
            ) :
                (<Spinner color='blue' />)
            }


        </>
    )

};
export default DisplayToken
