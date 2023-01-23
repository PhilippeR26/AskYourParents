// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'


import { useEffect, useState } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import { ToastContainer } from "material-react-toastify";

import "material-react-toastify/dist/ReactToastify.css";

import {
  StarknetProvider,
} from "../context";


function MyApp({ Component, pageProps }: AppProps) {


  return (
    <StarknetProvider>
      <ChakraProvider>
        <Head>
          <title>Pocket Money</title>
          <meta name="Pocket Money" content="citical.devs.fr - application of Cairo with account abstraction in Starknet" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />
        <Box bg="gray.200" w='100%' color='gray.800' borderWidth='1px' overflow='hidden'>
          <Heading>
            <Center> 💰 Pocket Money - Ask your parents 💰 </Center>
          </Heading>
        </Box>
        <Component {...pageProps} />
      </ChakraProvider>
    </StarknetProvider>
  )
}

export default MyApp


// import '../styles/globals.css'
// import type { AppProps } from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp
