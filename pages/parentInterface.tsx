// page parent
import type { NextPage } from 'next'

import useAddrStore, { MyStateR } from '../context/context'

import { useEffect, useState } from 'react'

import { Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'


const Home: NextPage = () => {
    const adParent = useAddrStore(state => state.AddressParent);
    const [myAdParent, setmyAdParent] = useState<bigint>();
    useEffect(() => { setmyAdParent(adParent) }, [adParent]);

    return (
        <>
            <Box bg="gray.200" w='100%' color='gray.800' borderWidth='1px' overflow='hidden'>
                <Center>
                    <Text fontSize='2xl'>Interface for parent  </Text>
                </Center>

            </Box>
            <Text>Addr Parent = {String(myAdParent)}  </Text>
        </>

    )
}



export default Home
