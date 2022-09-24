// page parentInterface.tsx
import type { NextPage } from 'next'

import useAddrStore from '../context/contextGlobal/contextGlobal'
import useParentContext from '../context/contextGlobal/contextParent'
import { useStarknet } from "context";

import { useEffect, useState } from 'react'

import { Text, Button, Box, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'

import WalletConnect from 'component/WalletConnect'


const Home: NextPage = () => {
    const adParent = useAddrStore(state => state.AddressParent);
    const [myAdParent, setmyAdParent] = useState<bigint>();
    useEffect(() => { setmyAdParent(adParent) }, [adParent]);

    // UseContext Starknet provider
    const { account, connected, setConnected, connectBrowserWallet } = useStarknet();

    //Zustand context in NextJS : address of children wallet
    const { addressChildren, setAddChild } = useParentContext();
    const [myAdChild, setmyAdChild] = useState<string>();
    useEffect(() => { setmyAdChild(addressChildren) }, [addressChildren]);

    const isAddrInvalid = (myAdChild.length !== 66) || (myAdChild.substring(0, 2) !== "0x");

    return (
        <>
            <Box bg="gray.200" w='100%' color='gray.800' borderWidth='1px' overflow='hidden'>
                <Center>
                    <Text fontSize='2xl'>Interface for parent  </Text>
                </Center>

            </Box>
            <Text>Addr Parent = {String(myAdParent)}  </Text>
            <Text>Addr Child = {myAdChild}  </Text>
            <Box w='100%' color='gray.800' overflow='hidden'>
                <Center>
                    <WalletConnect />
                </Center>
                {(connected) ?
                    <>
                        <Center py={5}>
                            <Button ml="4" bg="orange"
                                onClick={() => {
                                    setAddChild("0xundefined");
                                }}>
                                Reset addr child
                            </Button>
                        </Center>
                        <Center py={5}>
                            {(addressChildren === "0xundefined") ?
                                <Button ml="4" bg="blue.200"
                                    onClick={() => {
                                        ;
                                    }}>
                                    Connect Children Wallet
                                </Button>
                                : ""
                            }

                        </Center>
                    </>
                    : ""
                }
                <Center py={5}>
                    <form>
                        <FormControl isInvalid={isAddrInvalid}>
                            <FormLabel>Children address</FormLabel>
                            <Input placeholder='0x...' onChange={(e) => setmyAdChild(e.target.value)}>

                            </Input>
                            <FormHelperText>Enter an hexadecimal Starknet testnet address of 64 characters, with 0x prefix</FormHelperText>
                            <FormErrorMessage>
                                address not valid.
                            </FormErrorMessage>
                        </FormControl>
                    </form>
                </Center>
            </Box>

        </>

    )
}



export default Home
