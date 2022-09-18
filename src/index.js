import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {UseWalletProvider} from '@binance-chain/bsc-use-wallet'
import Config from "./Config"
import { Web3ReactProvider } from '@web3-react/core'


ReactDOM.render(<UseWalletProvider
    connectors={{
     walletconnect: {rpcUrl : Config.RPC_URL }
    }}
   chainId={Config.CHAIN_ID}>
       <App />
       </UseWalletProvider>
       , document.getElementById('root'));