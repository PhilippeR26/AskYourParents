// page parentInterface.tsx
import type { NextPage } from 'next'

import { useStoreParentTmp, useStoreParentPersist } from '../context/ContextGlobal/contextZS'
import { useStarknet } from "context";

import { useEffect, useState, useRef } from 'react'

import { Text, Button, Box, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Flex, Spacer } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import WalletConnect from 'component/ParentWalletConnect'
import ParentPanel1 from 'component/ParentPanel1'

import ERC20addresses from "contracts/ERC20addresses.json";




const Home: NextPage = () => {
    // global context page number
    const panelFromStorage = useStoreParentTmp(state => state.panelNum);
    const setPageNum = useStoreParentTmp((state) => state.setPageNum);
    const [panelNumber, setPageNumber] = useState<number>(1);
    useEffect(() => { setPageNumber(panelFromStorage) }, [panelFromStorage]);
    // global context parent address
    const addressParentFromStorage = useStoreParentPersist(state => state.addressParent);
    const setAddressParent = useStoreParentPersist((state) => state.setAddParent);
    const [addressParent, setAddParent] = useState<string>();
    useEffect(() => { setAddParent(addressParentFromStorage) }, [addressParentFromStorage]);
    // global context children address
    const addressChildrenFromStorage = useStoreParentPersist(state => state.AddressChildren);
    const setAddressChildren = useStoreParentPersist((state) => state.setAddChildren);
    const [addressChildren, setAddChildren] = useState<string>();
    useEffect(() => { setAddChildren(addressChildrenFromStorage) }, [addressChildrenFromStorage]);

    // console.log("ERC20addresses =", ERC20addresses); // DDDDDDDDDDD
    return (
        <>
            <Box bg="gray.200" w='100%' color='gray.800' borderWidth='1px' overflow='hidden'>
                <Center>
                    <Text fontSize='2xl'>Interface for parent  </Text>
                </Center>
            </Box>

            <Text>panel Number = {panelNumber}  </Text>

            <Button ml="4" bg="orange"
                onClick={() => { setPageNum(1); }}>
                panel num 1
            </Button>
            <Button ml="4" bg="green.200"
                onClick={() => { setPageNum(2); }}>
                panel num 2
            </Button>
            <Button ml="4" bg="blue.200"
                onClick={() => { setPageNum(3); }}>
                panel num 3
            </Button>

            <Center>
                {panelNumber == 1 &&
                    <>

                        <div>
                            <ParentPanel1 />
                        </div>
                    </>
                }
                {panelNumber == 2 &&
                    <h1>Panel 2.</h1>
                }
                {panelNumber == 3 &&
                    <h1>Panel 3.</h1>
                }
                {panelNumber == 4 &&
                    <h1>Panel 4.</h1>
                }
            </Center>
        </>
    )
}

export default Home
