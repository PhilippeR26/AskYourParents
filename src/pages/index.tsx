import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'

import useAddrStore, { MyStateR } from '../context/ContextGlobal/contextGlobal'

import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import { Stack, HStack, VStack, StackDivider } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

const Home: NextPage = () => {
  const adParent = useAddrStore(state => state.AddressParent);
  const [myAdParent, setmyAdParent] = useState<bigint>();
  useEffect(() => { setmyAdParent(adParent) }, [adParent]);

  return (
    <>

      <Box h={10}></Box>
      <VStack spacing={10} divider={<StackDivider borderColor='gray.400' />}>

        <Link href='parentInterface'>
          <Button colorScheme='facebook' >
            Parent interface
          </Button >
        </Link>
        <Link href='childrenInterface'>
          <Button colorScheme='facebook' >
            Children interface
          </Button >
        </Link>
        <Button colorScheme='facebook' >
          Game interface
        </Button >


      </VStack>
    </>
    //       This is it. 🚧

  )
}

export default Home
