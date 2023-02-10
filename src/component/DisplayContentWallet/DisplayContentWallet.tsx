import { ViewIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import DisplayToken from "../DisplayToken/DisplayToken";

export interface DisplayContentWalletProps {
    accountAddress: string
}
// const listToken: string[] = ["ETH", "ECU"];
const listToken: string[] = ["ETH", "ECU"];
const DisplayContentWallet = ({ accountAddress }: DisplayContentWalletProps) => {
    return (
        <>
            <h2>This wallet includes :</h2>
            <List>
                {listToken.map((tokenID: string) => (
                    <ListItem key={tokenID}>
                        {/* <ListIcon as={ViewIcon} color='green.500' /> */}
                        👉 <DisplayToken accountAddress={accountAddress} tokenName={tokenID} />

                    </ListItem>
                ))}
            </List>
        </>
    )
};
export default DisplayContentWallet
