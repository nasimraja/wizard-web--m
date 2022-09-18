import React, { useState } from "react";
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";
    
import hero from '../../images/hero.png';
import Header from '../header.js';
import Footer from '../footer.js';
import search from '../../images/search.png';
import big from '../../images/big.png';
import play from '../../images/play.png';
import MULTI_NFT_STAKE_ABI from  "../../../Config/MULTI_NFT_STAKE_ABI.json"
import POOL_CONTRACT from  "../../../Config/POOL_CONTRACT.json"
import TOKEN_ABI from  "../../../Config/TOKEN_ABI.json"
import NFT_ABI from  "../../../Config/NFT_ABI.json"

import STAKENFT_ABI from  "../../../Config/STAKENFT_ABI.json"

import Config, {EX_LINK} from  "../../../Config"
import Web3 from "web3"
import { useEffect } from 'react';
import {useWallet} from '@binance-chain/bsc-use-wallet'
import ConnectButton from '../ConnectButton'
import WIZARD from '../../images/add.gif';
import ORDINARY from '../../images/Ordinary.gif';
import EPIC from '../../images/Epic.gif';
import AUTOSHARK from '../../images/AUTOSHARK.gif';
import RARE from '../../images/Rare.gif';
import { func } from "prop-types";
import ROUTER_ABI from  "../../../Config/ROUTER_ABI.json"
import DMTNT from '../../images/DMTNT.gif';
import BabyNFT from '../../images/BabyNFT.gif';
import NFWolfPup from '../../images/NFWolfPup.gif';
import NFB from '../../images/BananaWIZARDs.gif';
import MCS from '../../images/MoonCafeSloth.gif';
import BK from '../../images/BananaKing.gif';
import PEAR from '../../images/PEAR.gif';
 


import BBQG from '../../images/BarbecueNFT.gif';
import SQ from '../../images/SquirrelNFT.gif';
import OWL from '../../images/OwlNFTFARM.gif';
import SING from '../../images/SingularfarmNFT.gif';
import MDF from '../../images/MDFNFT.gif';
import CL from '../../images/Lovesswap.gif';
import GT from '../../images/GT.gif';
import MPS from '../../images/MPS.gif';
import BTCG from '../../images/BTCG.gif';
import PMDB from '../../images/PMDB.gif';
import DSG from '../../images/DSG.gif';
import CDP from '../../images/CDP.gif';
import NftIcon from "./NftIcon";
 
 

const ChooseSingleNFtStake = (props) => {
  
  let web3Provider  = window.ethereum ; 
 
const NFT_STAKE =  props.stakeAddress ;
const wallet = useWallet();
const [modal, setModal] = useState(false);
 
const [NFT, setNft] = useState(false);
const toggle = () => setModal(!modal);
   
const [damount, setdAmount] = useState(0);

const [symbol, setSymbol] = useState('');
const [sTokenPrice, setsTokenPrice] = useState(0);
const [nftAddress, setNftAddress] = useState(props.address);
const [userNfts, setUserNfts] = useState([]);

 
const [stakefee ,setstakefee] =useState(0);
const [totalStaked ,settotalStaked] =useState(0);
const [nftSymbol, setNftSymbol] = useState('');
const [stakeTokenAddress, setstakeTokenAddress] = useState('');


const [approval, setApproval] = useState(0);
const [claimAllowed, setClaimAllowed] = useState(false);

const [userStaked, setUserStaked] = useState(0);
const [endTime, setEndTime] = useState(null);
const [depositAmount, setDepositAmount] = useState(0);
const [balance, setBalance] = useState(0);
const [stakingAmount, setStakingAmount] = useState(0);
const [startRange, setStartRange] = useState(0);
const [endRange, setEndRange] = useState(0);
const [stakingAmountOg, setStakingAmountOg] = useState(0);

const [limit, setLimit] = useState(0);
 

const [depositError, setDepositError] = useState('');


const [depositmodal, setDepositmodal] = useState(false);
const depositToggle = () => setDepositmodal(!depositmodal);


const [unstakeModal, setUnstakemodal] = useState(false);
const unstakeToggle = () => setUnstakemodal(!unstakeModal);
const [unstakeRedeemableModal, setunstakeRedeemableModal] = useState(false);
const unstakeToggleRedeemable = () => setunstakeRedeemableModal(!unstakeRedeemableModal);


async function setMaxDeposit(){

 
    setdAmount(balance)
    setDepositAmount(balance)
}



const handleDepositChange = props.handleDepositChange() ;


  
const initContracts = async() => {
    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
   

    // let _start = await _stakeContract.methods.stakingstarttingrange(props.index).call() ; 
    // let _end = await _stakeContract.methods.stakingendrange(props.index).call() ; 
    // setStartRange(_start)
    // setEndRange(_end)

    let _nftContract = new _web3.eth.Contract(NFT_ABI,nftAddress);

    if(wallet.account){
        let _userBalance = await _nftContract.methods.balanceOf(wallet.account).call() ;
        let _approved = await _nftContract.methods.isApprovedForAll(wallet.account,NFT_STAKE).call() ;
        setApproval(_approved)
        let userTokens = [] ;
// alert(_userBalance)
        for(let i = 0 ; i < _userBalance; i++){
         let _userToken = await _nftContract.methods.tokenOfOwnerByIndex(wallet.account,i).call() ;
           userTokens.push(_userToken);
           if(i == (_userBalance-1)){
              setUserNfts(userTokens);           
           }

        }
      }
}   


async function claim(){
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);

    

    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
     
    _stakeContract.methods.redeemNft().send({from: wallet.account}).on('receipt', function(receipt){
        initContracts(); 
     
         setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}



async function unstakeRedeemable(){
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);

    

    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
     
    _stakeContract.methods.emergencyunstaketoken().send({from: wallet.account}).on('receipt', function(receipt){
        initContracts(); 
        unstakeToggleRedeemable() ;
         setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}



async function unstake(){
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);

    

    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
     
    _stakeContract.methods.emergencyunstaketoken().send({from: wallet.account}).on('receipt', function(receipt){
        initContracts(); 
        unstakeToggle() ;
         setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}


const getTotalStaked = async () => {

    var v = POOL_CONTRACT[props.index] ;  
    let _web3 = new Web3(web3Provider);
    var TOKEN_POOL_ABI = null;
    var settTotalStaked = null;
    let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
    let totalStaked = await _tokenPoolContract.methods.totalStaked().call() ;
    let stakeTokenAddress = await _tokenPoolContract.methods.stakeToken().call() ;
    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,stakeTokenAddress);
    let stotalDecimals = await _tokenContract.methods.decimals().call() ;
         
    // temp['totalStaked'] = parseFloat(totalStaked/1e18).toFixed(4) ;
    if(totalStaked > 1e1**stotalDecimals){
        totalStaked = parseFloat(totalStaked/1e1**stotalDecimals).toFixed(4) ;
    }
    else{
        totalStaked = parseFloat(totalStaked/1e1**stotalDecimals).toFixed(8) ;
    }
    settTotalStaked(totalStaked);
}
 
async function approvenft(){
    let _web3 = new Web3(web3Provider);

 
    const _tokenContract = new _web3.eth.Contract(NFT_ABI,nftAddress);

    setModal(!modal);
    
    _tokenContract.methods.setApprovalForAll(NFT_STAKE,true).send({from: wallet.account}).on('receipt', function(receipt){
        initContracts(); 
     
         setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}

useEffect(() => {

    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
       
      }
},[])
      

useEffect(() => {
    initContracts() ;

    if(wallet.account){
    // setInterval(function(){
    //     getTime()
        
    // },1000)
}
},[wallet.account])

		return(

                
			<div className="mr-5 mt-2"> 
                {/* <p className="text-dark">{nftAddress}</p>  */}
                {
                    userNfts.length > 0 && userNfts.map((v,i) => {
                        // if(parseInt(v) >= startRange && parseInt(v) <= endRange ){
                            return (
                                <label className="mr-3">
                                <input type={"checkbox"} name={nftAddress} onChange={() => handleDepositChange(nftAddress,v)} /> ID: {v} <NftIcon nftid={v} nftAddress={nftAddress} />
                                </label>
                            )
                        // }
                           
                    })
                }
                {
                     userNfts.length > 0 && !approval &&
                     <button onClick={approvenft} >Approve NFT</button> 
                }
                {
                  userNfts.length == 0 &&
                  <p className="text-dark text-center">No NFTs in your wallet</p>

                }
            </div>
			
		);
 

}
export default ChooseSingleNFtStake;