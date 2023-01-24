// Panel 1 of Parent page

import { StackDivider, VStack } from "@chakra-ui/react";
import { useStoreChildrenTmp } from "context/ContextGlobal/contextChildrenContractZS";
import { useStoreStarknetTmp } from "context/ContextGlobal/contextStarknetZS";
import { useEffect, useState } from "react";
import { AccountInterface } from "starknet";
import ChildrenWalletConnect from "./ChildrenWalletConnect";
import DisplayContentWallet from "./DisplayContentWallet/DisplayContentWallet";
import ParentWalletConnect from "./ParentWalletConnect";

// connect to Parent account (broswer wallet) and Children Account
const ParentPanel1 = () => {
    // global Starknet context : connectedParent (readonly)
    const connectedFromStorage = useStoreStarknetTmp(state => state.connected);
    const [connectedParent, setConnectParent] = useState<boolean>();
    useEffect(() => { setConnectParent(connectedFromStorage) }, [connectedFromStorage]);
    // global Children context : childrenConnected (readonly)
    const childrenConnectedFromStorage = useStoreChildrenTmp(state => state.childrenConnected);
    const [childrenConnected, setChildrenIsConnected] = useState<boolean>();
    useEffect(() => { setChildrenIsConnected(childrenConnectedFromStorage) }, [childrenConnectedFromStorage]);
    // global Children context : childrenContract (readonly)
    const childrenContract = useStoreChildrenTmp(state => state.childrenContract);

    // global Starknet context : Parent account (readonly)
    const accountParentFromStorage = useStoreStarknetTmp(state => state.account);
    const [accountParent, setAccountParent] = useState<AccountInterface>();
    useEffect(() => { setAccountParent(accountParentFromStorage) }, [accountParentFromStorage]);

    return (
        <VStack spacing={3} divider={<StackDivider borderColor='gray.400' />}>
            <h1>Panel 1. </h1>
            <ParentWalletConnect />
            {connectedParent && (typeof accountParent !== "undefined") && (
                <>
                    <DisplayContentWallet accountAddress={accountParent.address} />
                </>
            )}
            {connectedParent && (typeof accountParent !== "undefined") && (
                <>
                    <ChildrenWalletConnect />
                </>
            )}
            {connectedParent && childrenConnected && childrenContract && (
                <DisplayContentWallet accountAddress={childrenContract.address} />
            )
            }
        </VStack>
    )
}
export default ParentPanel1;