import React, { Component } from 'react';
import $ from "jquery";
import Header from '../header.js';
import Footer from '../footer.js';
import Config, { MARKETPLACE } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import NFT_ABI from '../../../Config/NFT_ABI.json';
import Web3 from "web3"
import acc from '../../images/acc.png';
import { useState , useEffect} from 'react';
import ExploreSingle from './ExploreSingle.js';
import useWallet from '@binance-chain/bsc-use-wallet'
import NftSingle from './NftSingle'
const SellerImage = (props) => {
    let web3Provider  = window.ethereum ; 
   
    

    const [profilePic,setProfilePic] = useState(null);
 

    
    useEffect(() => {
 

    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
       
      }
 
      getImage() ;
      // getCollection() ;
    },[])
 
 

    const getImage = async () => {
      let _web3 = new Web3(web3Provider);
      let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
      let _data = await _marketPlaceContract.methods.profiles(props.address).call() ;
      if(_data == ""){
        setProfilePic(acc) ;
      }
      else{
        _data = JSON.parse(_data);
        if(_data.profilePic){
          setProfilePic(_data.profilePic);
        }
        else{
          setProfilePic(acc) ;
        }
      }
 
    }
       

    return(
 
                   
                                                  <img src={profilePic} />
                                              
   
          
    );
 

}
export default SellerImage;