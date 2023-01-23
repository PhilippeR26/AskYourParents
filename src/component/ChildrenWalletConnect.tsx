// component : connect children wallet
import { Button, Center, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Account, AccountInterface, Contract, ContractInterface, ec, json, Provider, ProviderInterface } from "starknet";

import { useStoreStarknetTmp } from "context/ContextGlobal/contextStarknetZS";
import { useStoreChildrenTmp } from "context/ContextGlobal/contextChildrenAccountZS";
import { Search2Icon } from "@chakra-ui/icons";

import ChildrenContractAbi from "../contracts/abis/ChildrenAccount_abi.json";
import { OZ_ACCOUNT0_DEVNET_PRIVATE_KEY } from "../contracts/addresses";
import { OZ_ACCOUNT0_DEVNET_ADDRESS } from "../contracts/addresses";


const ChildrenWalletConnect = () => {
    // global Starknet context : account (readonly)
    const accountParentFromStorage = useStoreStarknetTmp(state => state.account);
    const [accountParent, setAccountParent] = useState<AccountInterface>();
    useEffect(() => { setAccountParent(accountParentFromStorage) }, [accountParentFromStorage]);
    // // global Starknet context : connected (readonly)
    // const connectedParentFromStorage = useStoreStarknetTmp(state => state.connected);
    // const [connectedParent, setConnectParent] = useState<boolean>();
    // useEffect(() => { setConnectParent(connectedParentFromStorage) }, [connectedParentFromStorage]);
    // // global Starknet context : connected (writeonly)
    // const setConnectedParent = useStoreStarknetTmp(state => state.setConnected);
    // // global Starknet context : connected (writeonly)
    // const connectBrowserWallet = useStoreStarknetTmp(state => state.connectBrowserWallet);
    // global Starknet context : account (readonly)
    const providerFromStorage = useStoreStarknetTmp(state => state.provider);
    const [provider, setProvider] = useState<Provider>();
    useEffect(() => { setProvider(providerFromStorage) }, [providerFromStorage]);

    // global Children context : ChildrenContract (readonly)
    const childrenContractFromStorage = useStoreChildrenTmp(state => state.childrenContract);
    const [childrenContract, setChildrenContract] = useState<Contract>();
    useEffect(() => { setChildrenContract(childrenContractFromStorage) }, [childrenContractFromStorage]);
    // global Children context : childrenConnected (readonly)
    const childrenConnectedFromStorage = useStoreChildrenTmp(state => state.childrenConnected);
    const [childrenConnected, setChildrenIsConnected] = useState<boolean>();
    useEffect(() => { setChildrenIsConnected(childrenConnectedFromStorage) }, [childrenConnectedFromStorage]);
    // global Children context : setConnectChildrenWallet (writeonly)
    const setConnectChildrenWallet = useStoreChildrenTmp(state => state.connectChildrenWallet);
    // global Children context : setChildrenConnected (writeonly)
    const setChildrenConnected = useStoreChildrenTmp(state => state.setChildrenConnected);




    // useEffect(() => {
    //     if (account && account.address.length > 0) {
    //         setConnected(true);
    //     }
    // }, [account, setConnected, connected]);
    const [inputString, setInputString] = useState<string>("");
    const isAddrInvalid: boolean = (inputString.length !== 66) || (inputString.substring(0, 2) !== "0x");

    async function setAdmin(): Promise<void> { // only for dev purpose
        const privateKey: string = OZ_ACCOUNT0_DEVNET_PRIVATE_KEY;
        const starkKeyPair = ec.getKeyPair(privateKey);
        const accountAddress: string = OZ_ACCOUNT0_DEVNET_ADDRESS;
        try {
            if (typeof provider !== "undefined") {
                const account0 = new Account(provider, accountAddress, starkKeyPair);
                const compiledChildrenABI = json.parse(JSON.stringify(ChildrenContractAbi));

                //if (typeof childrenContract !== "undefined") {
                const myChildrenContract = new Contract(compiledChildrenABI, inputString, provider);
                myChildrenContract.connect(account0);
                if (typeof accountParent !== "undefined") {
                    const result = await myChildrenContract.invoke("addAdmin", [accountParent.address]);
                }
                //}
            }
        } catch (e: any) { console.log(e); }

    };
    return (
        <Center>
            {!childrenConnected ? (
                <>
                    <Button ml="8"
                        onClick={() => { setAdmin() }}>
                        set Parent as admin (dev)
                    </Button>

                    <FormControl isInvalid={isAddrInvalid}>
                        <FormLabel>Enter children wallet address</FormLabel>
                        <Input w="90%" placeholder='0x...' value={inputString} onChange={(e) => setInputString(e.target.value)}>

                        </Input>
                        <FormHelperText>Enter an hexadecimal Starknet testnet address, with 0x prefix, of exactly 64 characters (0x0... if necessary)
                        </FormHelperText>
                        <FormErrorMessage>
                            address not valid.
                        </FormErrorMessage>
                    </FormControl>
                    {!isAddrInvalid && (
                        <Flex>
                            <Spacer />
                            <Button leftIcon={<Search2Icon />}
                                onClick={() => {
                                    provider && accountParent && setConnectChildrenWallet(provider, inputString, accountParent.address)
                                }}>

                                {/* Add onClick to ft for check wallet */}
                                Verify address of children wallet
                            </Button>
                        </Flex>
                    )
                    }
                </>
            ) :  //childrenConnected
                (
                    <Button
                        ml="4"
                        textDecoration="none !important"
                        outline="none !important"
                        boxShadow="none !important"
                        onClick={() => {
                            setChildrenConnected(false);
                        }}
                    >
                        {childrenContract
                            ? `Children account : ${childrenContract.address.substring(0, 6)}...${childrenContract.address.substring(
                                childrenContract.address.length - 4
                            )} is connected`
                            : "No ChildrenAccount"}
                    </Button>
                )
            }
        </Center>
    )
};

export default ChildrenWalletConnect;

