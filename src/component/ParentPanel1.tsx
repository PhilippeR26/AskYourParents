// Panel 1 of Parent page

import { useStoreChildrenTmp } from "context/ContextGlobal/contextChildrenAccountZS";
import { useStoreStarknetTmp } from "context/ContextGlobal/contextStarknetZS";
import { useEffect, useState } from "react";
import ChildrenWalletConnect from "./ChildrenWalletConnect";
import WalletConnect from "./ParentWalletConnect";

// connect to Parent account (broswer wallet) and Children Account
const ParentPanel1 = () => {
    // global Starknet context : connected (readonly)
    const connectedFromStorage = useStoreStarknetTmp(state => state.connected);
    const [connectedParent, setConnectParent] = useState<boolean>();
    useEffect(() => { setConnectParent(connectedFromStorage) }, [connectedFromStorage]);
    // global Children context : childrenConnected (readonly)
    const childrenConnectedFromStorage = useStoreChildrenTmp(state => state.childrenConnected);
    const [childrenConnected, setChildrenIsConnected] = useState<boolean>();
    useEffect(() => { setChildrenIsConnected(childrenConnectedFromStorage) }, [childrenConnectedFromStorage]);

    return (
        <>
            <WalletConnect />
            {connectedParent && (
                <ChildrenWalletConnect />
            )}
            {connectedParent && childrenConnected && (

            )
            }
        </>
    )
}
export default ParentPanel1;