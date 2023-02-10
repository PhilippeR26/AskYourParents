import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Account, AccountInterface } from "starknet";

import { useStoreStarknetTmp } from "../context/ContextGlobal/contextStarknetZS";

const ParentWalletConnect = () => {
    // global Starknet context : account (readonly)
    const accountFromStorage = useStoreStarknetTmp(state => state.account);
    const [account, setAccount] = useState<AccountInterface>();
    useEffect(() => { setAccount(accountFromStorage) }, [accountFromStorage]);
    // global Starknet context : connected (readonly)
    const connectedFromStorage = useStoreStarknetTmp(state => state.connected);
    const [connected, setConnect] = useState<boolean>();
    useEffect(() => { setConnect(connectedFromStorage) }, [connectedFromStorage]);
    // global Starknet context : connected (writeonly)
    const setConnected = useStoreStarknetTmp(state => state.setConnected);
    // global Starknet context : connectBrowserWallet (writeonly)
    const connectBrowserWallet = useStoreStarknetTmp(state => state.connectBrowserWallet);


    useEffect(() => {
        if (account && account.address.length > 0) {
            setConnected(true);
        }
    }, [account, setConnected, connected]);

    return !connected ? (
        <Button
            ml="4"
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            onClick={() => {
                connectBrowserWallet();
            }}
        >
            Connect Parent Wallet
        </Button>
    ) : (
        <Button
            ml="4"
            textDecoration="none !important"
            outline="none !important"
            boxShadow="none !important"
            onClick={() => {
                setConnected(false);
            }}
        >
            {account
                ? `Your Parent wallet : ${account.address.substring(0, 6)}...${account.address.substring(
                    account.address.length - 4
                )} is connected`
                : "No Account"}
        </Button>
    );
};

export default ParentWalletConnect;

