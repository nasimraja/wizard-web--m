import React, { useState } from "react";
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";
 
 
import Mfista3 from "../../images/soon.png"
import NAUT from "../../images/3.png"
import TWINIMG from "../../images/twin.png"
import CRUSH from "../../images/crush.png"
import GUARD from "../../images/guard.png"
import WIZARD from "../../images/WIZARD.gif"

import BIRB from "../../images/birb-logo.svg"
import big from '../../images/big.png';
import play from '../../images/play.png';
import right from "../../images/right.png"
 
import roiicon from "../../images/icons/roiicon.png";
  
import TOKEN_POOL_ABI from  "../../../Config/TOKEN_POOL.json"
import TOKEN_ABI from  "../../../Config/TOKEN_ABI.json"
import ROUTER_ABI from  "../../../Config/ROUTER_ABI.json"
import Config, {EX_LINK} from  "../../../Config"

import LP_ABI from  "../../../Config/LP_ABI.json"
import Web3 from "web3"
   
import WIZARDLP from "../../images/WIZARDLP.gif"
import PWARLP from "../../images/PWARLP.gif"
import ELOINLP from "../../images/ELOINLP.gif"

import ALTURALP from "../../images/ALTURALP.gif"
import PIRATELP from "../../images/PIRATELP.gif"
import PLAYLP from "../../images/PLAYLP.gif"
import PLAY from "../../images/PLAY.gif"
import XDITTOLP from "../../images/XDITTOLP.gif"
import ALPHA from "../../images/ALPHA.gif"
import ALPHALP from "../../images/ALPHALP.gif"

import BEAR from "../../images/BEAR.gif"
import BEARLP from "../../images/BEARLP.gif"


import FOOTWIZARD from "../../images/FOOTWIZARD.gif"
import FOOTLP from "../../images/FOOTLP.gif"
import WIZARDFOOT from "../../images/WIZARDFOOT.gif"

import WIZARDGUARD from '../../images/WIZARDGUARD.gif' ;
import GUARDLP from '../../images/GUARSDLP.gif' ;
import GUARDWIZARD from '../../images/GUARDWIZARD.gif' ;

import WIZRDPWAR from "../../images/WIZARDPWAR.gif"
import ELOIN from "../../images/ELOIN.gif"
import PWARDWIZARD from "../../images/PWARDWIZARD.gif"
import JAW from "../../images/JAW.gif"
import DITTOLP from "../../images/DITTOLP.gif"

import { useEffect } from 'react';
import {useWallet} from '@binance-chain/bsc-use-wallet'
import ConnectButton from '../../services/ConnectButton'
import pool from "../pools/pool";
 

const POOL_CONTRACT =
[ 

  

    //////
    {address: "0xdC3Cf68139b9eE88539E16292CaBe42fe720cF68", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARD , fee: 1 ,status : 1 , primaryPair: null },

    {address: "0xA9F3daC336968aea4ea9Da9591e0a5e97F573A1b", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARD , fee: 0 ,status : 1 , primaryPair: null },

    
    {address: "0xF7d94D52Ccf760C6c02B34b736e7F3a42919F5BE", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "GUARD" , sape : 0 , rape: 1, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARDGUARD, simage : WIZARDGUARD , fee: 1 ,status : 1 , primaryPair: null },

    {address: "0x264907c1f8d71c71F98F9B54b29865c3c9a19B6c", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "GUARD " , sape : 0 , rape: 1, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP, simage : WIZARDLP , fee: 1 ,status : 1 , primaryPair: null },
  
    {address: "0xf0D53A04c555c5D2f899cAd85540ef02E136691E", ownname : "CORE" , endTime : 1627851600000 , name: "GUARD" , lp: 0, rewardToken: "WIZARD" , sape : 1 , rape: 0, stakeToken: "GUARD" , website : "https://wizard.financial" , image : GUARDWIZARD, simage : GUARDWIZARD , fee: 1 ,status : 1 , primaryPair: null },
  
    {address: "0x967C2Bfe1459088338EeEBe75ac42B6D040622B0", ownname : "CORE" , endTime : 1627851600000 , name: "GUARD LP" , lp: 1, rewardToken: "WIZARD" , sape : 3 , rape: 0, stakeToken: "GUARD LP" , website : "https://wizard.financial" , image : GUARDLP, simage : GUARDLP , fee: 1 ,status : 1 , primaryPair: '0x55d398326f99059fF775485246999027B3197955' },
   
    {address: "0x4dbbe653650a6086dDaF16Af5480A07D807d8701", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "FOOT" , sape : 0 , rape: 1, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARDFOOT , fee: 1 ,status : 1  , primaryPair: null },

    {address: "0x3C71E0ccc16C8d2De234b96e01b119A6413835a8", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "FOOT" , sape : 0 , rape: 1, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARD, simage : WIZARDLP , fee: 1 ,status : 1 , primaryPair: null },

    {address: "0xa1bd3042ca4896e1cd3d384eec6e7e826977aa23", ownname : "CORE" , endTime : 1627851600000 , name: "FOOT" , lp: 0, rewardToken: "WIZARD" , sape : 1 , rape: 0, stakeToken: "FOOT" , website : "https://bigfoottoken.finance/" , image : WIZARD, simage : FOOTWIZARD , fee: 1 ,status : 1 , primaryPair: null },

    {address: "0xF5E047a89f3f5851EDC5CE209E99dab8aA7CbdC9", ownname : "CORE" , endTime : 1627851600000 , name: "FOOT LP" , lp: 1, rewardToken: "WIZARD" , sape : 1 , rape: 0, stakeToken: "FOOT LP" , website : "https://bigfoottoken.finance/" , image : WIZARD, simage : FOOTLP , fee: 1 ,status : 1 , primaryPair: null },


    // {address: "0x8e0A533f7Df4AE3C0C79a64D9194af49dcDEF1bA", ownname : "CORE" , endTime : 1627851600000 , name: "DITTO LP" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "DITTO LP" , website : "https://wizard.financial" , image : WIZARD, simage : DITTOLP , fee: 0 ,status : 1 },

    {address: "0x0f1DddEb48Fc57262478A8bc690B1B58Fb730944", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "DITTO" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP, simage : WIZARDLP , fee: 1 ,status : 1 , primaryPair: null },



    {address: "0xfBBf706aF305f0b13f412cEC17b0638834b1bcf1", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "JAW" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : WIZARD, simage : JAW , fee: 1 ,status : 1, primaryPair: null},

    {address: "0xB17F5129d9314019cB6d2ff5C42006C30fE026E4", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "JAW" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP, simage : WIZARDLP , fee: 1 ,status : 1 , primaryPair: null},



    {address: "0xF82bA8577Fc27446f2f6986ADB2099Aea5710ECC", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "BEAR" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://wizard.financial" , image : BEAR, simage : BEAR , fee: 1 ,status : 1 , primaryPair: null},
    {address: "0x82364026b4Ce059CF03097042A439bdC9271ad48", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "BEAR" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : BEARLP, simage : BEARLP , fee: 1 ,status : 1, primaryPair: null},

    {address: "0xf833Aa19a3aA80384E76a30D1af20Dd934150277", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP , simage : WIZARDLP , fee: 1 ,status : 1, primaryPair: null},
    {address: "0xD4B6972cf3c2a48223f36546Af864Cd186Ea330e", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://wizard.financial" , image : WIZARDLP , simage : WIZARDLP , fee: 0 ,status : 1, primaryPair: null},
	{address: "0xDC83A356f45860925329ad21fC069e2d3A606Cb0", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "PWAR" , sape : 0 , rape: 0, stakeToken: "WIZARD" , website : "https://polkawar.com/" , image : WIZRDPWAR , simage : WIZRDPWAR , fee: 1,status : 1, primaryPair: null},
	{address: "0x35a193DBd5dF064B71d4C55D1a95a59f35cb3975", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 0, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "PWAR" , website : "https://wizard.financial" , image : WIZRDPWAR , simage : PWARDWIZARD , fee: 1,status : 1, primaryPair: null},
	{address: "0x9e30dD18E9363488B9fcE43e3ce3d9FcF99f6471", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD LP" , lp: 1, rewardToken: "PWAR" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://polkawar.com/" , image : WIZARDLP , simage : WIZARDLP , fee: 1,status : 1, primaryPair: null},
	{address: "0xe15e9bF9bC7dFc505BE98Bb601EF2C3f9bb89Dc1", ownname : "CORE" , endTime : 1627851600000 , name: "PWAR LP" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "PWAR LP" , website : "https://wizard.financial" , image : PWARLP , simage : PWARLP , fee: 1,status : 1, primaryPair: null},
	{address: "0xCcC73Dc32752cDd13C200d4eCE7Cf3bB550fBf67", ownname : "CORE" , endTime : 1627851600000 , name: "ELOIN" , lp: 0, rewardToken: "ELOIN" , sape : 0 , rape: 0, stakeToken: "ELOIN" , website : "https://www.eloin.in" , image : ELOIN , simage : ELOIN , fee: 1,status : 1, primaryPair: null},
    {address: "0xa9CE7765aEA906bAe5d79E5214840d634b5e1f09", ownname : "CORE" , endTime : 1627851600000 , name: "ELOIN" , lp: 1, rewardToken: "ELOIN" , sape : 0 , rape: 0, stakeToken: "ELOIN LP" , website : "https://www.eloin.in" , image : ELOINLP , simage : ELOINLP , fee: 1,status : 1, primaryPair: null},

    {address: "0x0B39ccA687dCe2c17e5c7Bc3220E3237AFfaEb9D", ownname : "CORE" , endTime : 1627851600000 , name: "PLAY" , lp: 1, rewardToken: "PLAY" , sape : 0 , rape: 0, stakeToken: "PLAY LP" , website : "https://polyplay.net/" , image : PLAYLP , simage : PLAYLP , fee: 1,status : 1, primaryPair: null},
    {address: "0x0ED49399670e8144BA764FaD423c8558Cee1827A", ownname : "CORE" , endTime : 1627851600000 , name: "ALTURA" , lp: 1, rewardToken: "ALTURA" , sape : 0 , rape: 0, stakeToken: "ALTURA LP" , website : "https://www.alturanft.com/" , image : ALTURALP   , simage : ALTURALP , fee: 1,status : 1, primaryPair: null},
    {address: "0x95e88a1FC73c8a4fb05076f53F90407da4F8F36d", ownname : "CORE" , endTime : 1627851600000 , name: "PLAY" , lp: 0, rewardToken: "PLAY" , sape : 0 , rape: 0, stakeToken: "PLAY" , website : "https://polyplay.net/" , image : PLAY , simage : PLAY , fee: 1,status : 1, primaryPair: null},
    {address: "0xD50261195eb0CA158Cde16F30fAE29CDC77743fc", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "WIZARD" , sape : 0 , rape: 0, stakeToken: "PIRATE LP" , website : "https://wizard.financial/" , image : PIRATELP , simage : PIRATELP , fee: 1,status : 1, primaryPair: null},
    {address: "0xEAf1331160Be23E60Eaf3eB5E633eCC1D09700CC", ownname : "CORE" , endTime : 1627851600000 , name: "PIRATE" , lp: 1, rewardToken: "PIRATE" , sape : 0 , rape: 0, stakeToken: "WIZARD LP" , website : "https://www.eloin.in" , image : WIZARDLP , simage : WIZARDLP , fee: 1,status : 1, primaryPair: null},

    
    {address: "0x6dcec55bD51dfB8a78ef8139500EB446a57932A9", ownname : "CORE" , endTime : 1627851600000 , name: "WIZARD" , lp: 1, rewardToken: "WIZARD" , sape : 2 , rape: 0, stakeToken: "XDITTO LP" , website : "https://wizard.financial/" , image : XDITTOLP , simage : XDITTOLP , fee: 1,status : 1, primaryPair: null},
    {address: "0x2734cf994Dd4Fe8869a27D760FFc7EEF58e9A30D", ownname : "CORE" , endTime : 1627851600000 , name: "XDITTO" , lp: 1, rewardToken: "XDITTO" , sape : 0 , rape: 2, stakeToken: "WIZARD LP" , website : "https://ditto.money/" , image : WIZARDLP , simage : WIZARDLP , fee: 1,status : 1, primaryPair: null},

    {address: "0x0A0414901127822ff6F17EE8239f522F562d8c63", ownname : "CORE" , endTime : 1627851600000 , name: "ALKOM" , lp: 0, rewardToken: "ALKOM" , sape : 0 , rape: 0, stakeToken: "ALKOM" , website : "#" , image : ALPHA , simage : ALPHA , fee: 1,status : 1, primaryPair: null},
    {address: "0x3514C423c64b13967ABbF99cC161ba8edc556CbD", ownname : "CORE" , endTime : 1627851600000 , name: "ALKOM" , lp: 1, rewardToken: "ALKOM" , sape : 0 , rape: 0, stakeToken: "ALKOM LP" , website : "#" , image : ALPHA , simage : ALPHALP , fee: 1,status : 1, primaryPair: null},


];

const PoolCard = (props) => {
  const data = JSON.parse(sessionStorage.getItem('pool'));
  const [isOpen, setOpen]= useState(false);
  const [isConnected, setConnected]= useState(false);
  const [modal, setModal] = useState(false);
  const [depositmodal, setDepositmodal] = useState(false);

  const [oneDayRoi, setOneDayRoi] = useState(0);
  const [sevenDayRoi, setSevenDayRoi] = useState(0);
  const [thirtyDayRoi, setThirtyDayRoi] = useState(0);
  const [yearRoi, setyearRoi] = useState(0);
  
  const [oneDay, setOneDay] = useState(0);
  const [sevenDay, setSevenDay] = useState(0);
  const [thirtyDay, setThirtyDay] = useState(0);
  const [year, setyear] = useState(0);
  const [sTokenPrice, setsTokenPrice] = useState(0);
  const [rTokenPrice, setrTokenPrice] = useState(0);

  
  const [visible, setVisible] = useState(false);


  const [rlink, setRlink] = useState(null);
  const [slink, setSlink] = useState(null);
  

  
  const [link, setLink] = useState('0');
//   const [web3Provider, setweb3Provider] = useState(null);
  let web3Provider  = window.ethereum ; 
   
  let rewardInterval ;
  let aprInterval ;
  let totalStakedInterval ;
  let userStakedInterval ;
  let endTimeInterval ;

  

  const [roimodal, setRoimodal] = useState(false);
  const [withdrawmodal, setWithdrawmodal] = useState(false);
  const [nowithdrawmodal, setnoWithdrawmodal] = useState(false);
  const [noclaimRewardmodal, setnoclaimRewardmodal] = useState(false);
  
  const [details, setShowDetails] = useState([]);
  
  const [symbol, setSymbol] = useState('');
  const [rsymbol, setrSymbol] = useState('');
  
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [currentContract, setCurrentContract] = useState('');
  const [wcurrentContract, setWCurrentContract] = useState('');
  const [wsamount, setwsamount] = useState('');
  const [damount, setdAmount] = useState('');
  
  const [wsymbol, setWSymbol] = useState('');
  const [wbalance, setWBalance] = useState(0);
  const [userReward, setuserReward] = useState(0);
  const [apr, setApr] = useState(0);
  const [totalStaked, settTotalStaked] = useState(0);
  const [userStaked, setuserStaked] = useState(0);
  const [endTime, setendTime] = useState(0);

  

//   var poolsArray = [] ;
  const [poolsArray, setPoolsArray]= useState([]);
//   const [pools, setPools]= useState([]);
  const [tpop, setTPop]= useState(false);
const [show, setShow] = useState(false);
const [depositError, setDepositError] = useState(false);
const [withdrawError, setWithdrawError] = useState(false);
  
const [selectedPage, setSelectedPage] = useState("Project_Detail");
 

const wallet = useWallet();

 
 

useEffect(()=>{

        
    'use strict';
    
function Tabs() {
var bindAll = function() {
var menuElements = document.querySelectorAll('[data-tab]');
for(var i = 0; i < menuElements.length ; i++) {
  menuElements[i].addEventListener('click', change, false);
}
}

var clear = function() {
var menuElements = document.querySelectorAll('[data-tab]');
for(var i = 0; i < menuElements.length ; i++) {
  menuElements[i].classList.remove('active');
  var id = menuElements[i].getAttribute('data-tab');
  document.getElementById(id).classList.remove('active');
}
}



var change = function(e) {
clear();
e.target.classList.add('active');
var id = e.currentTarget.getAttribute('data-tab');
document.getElementById(id).classList.add('active');
}

bindAll();


$('.tabs2').on('click','a',function(e){
    e.preventDefault();
    var tabId = $(this).attr('data-tab');
    $(this).closest('.tabs2').find('a').removeClass('active');
    $(this).addClass('active');
    
  });

//   second tab js
$('.tabs').on('click','a',function(e){
    e.preventDefault();
    var tabId = $(this).attr('data-tab');
    $(this).closest('.tabs').find('a').removeClass('active');
    $(this).addClass('active');
    $('.tab-panel').removeClass('active');
    $('#'+tabId).addClass('active');
  });

}

 


var connectTabs = new Tabs();






},[])


 
useEffect(() => {
    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
       
      }


    initContracts() ;
    getUserReward() ;
    getTotalStaked() ;
    getApr() ;
    getUserStaked() ;
    getEndTime() ;

    clearInterval(rewardInterval);
    clearInterval(totalStakedInterval);
    clearInterval(aprInterval);
    clearInterval(userStakedInterval);
    clearInterval(endTimeInterval);
    
    rewardInterval = setInterval(() => {
        getUserReward()    
    }, 30*1000);

    totalStakedInterval = setInterval(() => {
        getTotalStaked()    
    }, 30*1000);
      
    aprInterval = setInterval(() => {
        getApr()    
    }, 30*1000);

    userStakedInterval = setInterval(() => {
        getUserStaked()    
    }, 30*1000);

    endTimeInterval = setInterval(() => {
        getEndTime()    
    }, 30*1000);
    
    
    
    getVisibility() ;
   
},[wallet.account])

const toggle = () => setModal(!modal);
const depositToggle = () => setDepositmodal(!depositmodal);
const withdrawToggle = () => setWithdrawmodal(!withdrawmodal);
const nowithdrawToggle = () => setnoWithdrawmodal(!nowithdrawmodal);
const roimodalToggle = () => setRoimodal(!roimodal);
const noclaimRewardToggle = () => setnoclaimRewardmodal(!noclaimRewardmodal);

const handleDepositChange = (e) => {
    setDepositAmount(e.target.value) ;
    setdAmount(e.target.value) ;

}
const handleWithdrawChange = (e) => {
    setWithdrawAmount(e.target.value)
    setwsamount(e.target.value)
}
const toggleDetails = (box) => {

    const detailarr = details.slice()  ;

    const index = detailarr.indexOf(box) ;

    if(index >= 0) {
        detailarr.splice(index, 1) ;
        setShowDetails(detailarr);
    }
    else{
        detailarr.push(box) ;
        setShowDetails(detailarr);

    }
}





const initContracts  = async () =>  {

    // setPoolsArray([]) ;

    let _web3 = new Web3(web3Provider);
    console.log(wallet) ;
    let ltemparr =  [] ;
    // poolsArray = [] ;
        // setPools([]) ;
    var pools = [] ;
  
      
        var v = POOL_CONTRACT[props.index] ;  
        let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
        
        let temp = {} ;
        temp['name'] = v.name ;  
        temp['address'] = v.address ;  
        
        temp['rewardToken'] = v.rewardToken ;
        temp['stakeToken'] = v.stakeToken ;
        temp['ownname'] = v.ownname ;
        temp['sape'] = v.sape ;
        temp['status'] = v.status ;
        
        // let endTime = v.endTime ;
        // let remainingSeconds = (endTime - new Date()) / 1000;


        
        temp['approval'] = 0 ;

        temp['website'] = v.website ;
        temp['lp'] = v.lp ;
        temp['image'] = v.image ;
        temp['simage'] = v.simage ;
        
        temp['stakeTokenAddress'] = await _tokenPoolContract.methods.stakeToken().call() ;
        temp['rewardTokenAddress'] = await _tokenPoolContract.methods.rewardToken().call() ;
        temp['stakeFee'] =  0;
        temp['unstakeFee'] =  0;
        temp['fee'] =  v.fee;
        if(v.fee == 1){

                  let _stakeFee = await _tokenPoolContract.methods.stakeFee().call() ;
                  temp['stakeFee'] = parseFloat(_stakeFee/10).toFixed(2) ;
                  let _unstakeFee = await _tokenPoolContract.methods.unstakeFee().call() ;
                  temp['unstakeFee'] = parseFloat(_unstakeFee/10).toFixed(2) ;
           
        }

        let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,temp['stakeTokenAddress']);
 
 

   
 
        var account = wallet.account ;
        temp['user'] = account;

   
   
        if(account != null){
          
            temp['approval'] = await _tokenContract.methods.allowance(account,v.address).call() ;  
         
             
                
        }

       
        setPoolsArray(temp);

             
  

  }
 
  const getEndTime = async () => {
    var v = POOL_CONTRACT[props.index] ;  
    let _web3 = new Web3(web3Provider);

    let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
    let _endBlock = await _tokenPoolContract.methods.bonusEndBlock().call() ;

    let _latestBlock = await _web3.eth.getBlock('latest') ;
    let _endTime = 0 ;
    let remainingblock = parseInt(_endBlock) - parseInt(_latestBlock.number) ;


    let remainingSeconds = remainingblock*3 ;
    // console.log("Remaining Sec" , remainingSeconds);

    let remainingDay = Math.floor(
      remainingSeconds / (60 * 60 * 24)
    );
    let remainingHour = Math.floor(
      (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
    );
    let remainingMinutes = Math.floor(
      (remainingSeconds % (60 * 60)) / 60
    );
    let remainingSec = Math.floor(remainingSeconds % 60);
    if(remainingSeconds <= 0){
        _endTime = "Ended" ;
        setendTime(_endTime);    

    }
    else if(remainingDay > 0){
        _endTime = remainingDay+"d : "+remainingHour+"h : "+remainingMinutes+"m";
        setendTime(_endTime);
    

    }
    else{
        _endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s" ;
        setendTime(_endTime);
        

    }

 
 
 

}


const getVisibility =async () => {
    var v = POOL_CONTRACT[props.index] ;  
    let _web3 = new Web3(web3Provider);

    let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
    let _endBlock = await _tokenPoolContract.methods.bonusEndBlock().call() ;

    let _latestBlock = await _web3.eth.getBlock('latest') ;
 
    let remainingblock = parseInt(_endBlock) - parseInt(_latestBlock.number) ;
 
    if(props.status == 0 ){
        if(remainingblock <= 0 ){
            setVisible(true) ;
        }
        else{
            setVisible(false) ;

        }
    }
    else if(props.status == 1){
        if(remainingblock <= 0){
            setVisible(false) ;
        }
        else{
            setVisible(true) ;

        }
    }

}

const getUserReward = async () => {
    var v = POOL_CONTRACT[props.index] ;  
    let _web3 = new Web3(web3Provider);

    let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
    let _rewardTokenAddress = await _tokenPoolContract.methods.rewardToken().call() ;
    let _rtokenContract = new _web3.eth.Contract(TOKEN_ABI,_rewardTokenAddress);

    let rtotalDecimals = await _rtokenContract.methods.decimals().call() ;
    let userReward = 0 ;
    if(wallet.account != null){
        
    userReward = await _tokenPoolContract.methods.pendingReward(wallet.account).call() ;  
    userReward = parseFloat(userReward/1e1**rtotalDecimals).toFixed(4) ;
    console.log(userReward);
    setuserReward(userReward);
    }

}


const getUserStaked = async () => {
    var v = POOL_CONTRACT[props.index] ;  
    let _web3 = new Web3(web3Provider);

    let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
    let stakeTokenAddress = await _tokenPoolContract.methods.stakeToken().call() ;
    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,stakeTokenAddress);
    let stotalDecimals = await _tokenContract.methods.decimals().call() ;
         
    let userStaked = 0 ;
    if(wallet.account != null){
        let userInfo = await _tokenPoolContract.methods.userInfo(wallet.account).call() ;  
        if(userInfo.amount > 1e1**stotalDecimals){
        userStaked  = parseFloat(userInfo.amount/1e1**stotalDecimals).toFixed(4) ; 
        }
        else{
        userStaked  = parseFloat(userInfo.amount/1e1**stotalDecimals).toFixed(8) ; 
        }
    

    setuserStaked(userStaked);
    }

}

 
const getTotalStaked = async () => {

    var v = POOL_CONTRACT[props.index] ;  
    let _web3 = new Web3(web3Provider);

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

const getApr = async () => {
    var v = POOL_CONTRACT[props.index] ;  
    let _web3 = new Web3(web3Provider);
    const BNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'; // BNB or another token
    const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' ; //BUSD
    let _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,v.address);
  
    let totalStaked = await _tokenPoolContract.methods.totalStaked().call() ;
    let stakeTokenAddress = await _tokenPoolContract.methods.stakeToken().call() ;
    let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,stakeTokenAddress);
    let stotalDecimals = await _tokenContract.methods.decimals().call() ;

    let rewardTokenAddress = await _tokenPoolContract.methods.rewardToken().call() ;
    let _rtokenContract = new _web3.eth.Contract(TOKEN_ABI,rewardTokenAddress);

    let rtotalDecimals = await _rtokenContract.methods.decimals().call() ;

    let _sdomain ; 
    let _sdomainLp ; 
    let _rdomain ; 
    let _rdomainLp ; 
    let RROUTER_ADDRESS = null ; 
        let SROUTER_ADDRESS = null ; 
        if(v.rape == 0){
            RROUTER_ADDRESS = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
            _rdomain = "https://pancakeswap.finance/swap?outputCurrency=" ;
            _rdomainLp = "https://pancakeswap.finance/add/" ;
        }
        else if(v.rape == 1) {
            RROUTER_ADDRESS = '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7';
            _rdomain = "https://app.apeswap.finance/swap?outputCurrency=" ;
            _rdomainLp = "https://app.apeswap.finance/add/" ;

        }
        else if(v.rape == 2) {
            RROUTER_ADDRESS = '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F';
            _rdomain = "https://www.bakeryswap.org/#/swap?outputCurrency=" ;
            _rdomainLp = "https://www.bakeryswap.org/#/add/" ;
        }
        else if(v.rape == 3) {
            RROUTER_ADDRESS = '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd';
            _rdomain = "https://exchange.babyswap.finance/#/swap?outputCurrency=" ;
            _rdomainLp = "https://exchange.babyswap.finance/#/add/" ;
        }
        
        if(v.sape == 0){
            _sdomain = "https://pancakeswap.finance/swap?outputCurrency=" ;
            _sdomainLp = "https://pancakeswap.finance/add/" ;

            SROUTER_ADDRESS = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
        }
        else if(v.sape == 1){
            SROUTER_ADDRESS = '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7';
            _sdomain = "https://app.apeswap.finance/swap?outputCurrency=" ;
            _sdomainLp = "https://app.apeswap.finance/add/" ;
        }
        else if(v.sape == 2) {
            SROUTER_ADDRESS = '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F';
            _sdomain = "https://www.bakeryswap.org/#/swap?outputCurrency=" ;
            _sdomainLp = "https://www.bakeryswap.org/#/add/" ;
        }
        else if(v.sape == 3) {
            SROUTER_ADDRESS = '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd';
            _sdomain = "https://exchange.babyswap.finance/#/swap?outputCurrency=" ;
            _sdomainLp = "https://exchange.babyswap.finance/#/add/" ;
        }
        let _amountUSD = 1 * (10 ** 18 ); 

        let _routerContractS = new _web3.eth.Contract(ROUTER_ABI, SROUTER_ADDRESS);

        let _resultUSDS = await _routerContractS.methods.getAmountsOut(_amountUSD+'', [BNB, BUSD]).call();
        let BNBUsdS = _resultUSDS[1] / (10 ** 18);
 
        let _routerContractR = new _web3.eth.Contract(ROUTER_ABI, RROUTER_ADDRESS);
 
        let _resultUSDR = await _routerContractR.methods.getAmountsOut(_amountUSD+'', [BNB, BUSD]).call();
        let BNBUsdR = _resultUSDR[1] / (10 ** 18);

    let apr  = 0 ;

    let slink = _sdomain+stakeTokenAddress ;
    setSlink(slink);
    let _tokenLpContract ;
    let _tokenA ;
    let _tokenB ;

    let _pairPrimary = [
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        'BNB',
        'BUSD',
        '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        '0x55d398326f99059fF775485246999027B3197955'
    ]

    if(v.lp == 1){

    _tokenLpContract = new _web3.eth.Contract(LP_ABI,stakeTokenAddress);
    
    _tokenA = await  _tokenLpContract.methods.token0().call() ;
    _tokenB = await  _tokenLpContract.methods.token1().call() ;

    let __stokenA ;
    let __stokenB ;
    if(!_pairPrimary.includes(_tokenA)) {
        __stokenA = _tokenA ;
        __stokenB = _tokenB ;
    }
    else if(!_pairPrimary.includes(_tokenB)) {
        __stokenA = _tokenB ;
        __stokenB = _tokenA ;

    }

    slink = _sdomainLp+__stokenA+"/"+__stokenB ;
    setSlink(slink);    
    }


    let rlink = _rdomain+rewardTokenAddress ;
    setRlink(rlink);

    if(totalStaked > 0 ){
        let _stokenPrice = 0 ;
        let _tokenPrice = 0 ;

        if(v.lp == 1){
            console.log("It's LP");

         
            let _tokenSupply = await  _tokenLpContract.methods.getReserves().call() ;

            let _tokenAContract = new _web3.eth.Contract(TOKEN_ABI,_tokenA);
            let _tokenBContract = new _web3.eth.Contract(TOKEN_ABI,_tokenB);
            let _tokenAdecimals = await _tokenAContract.methods.decimals().call() ;
            let _tokenBdecimals = await _tokenBContract.methods.decimals().call() ;

            // let _tokenBSupply = await  _tokenLpContract.methods.token1().call() ;
            // let _tokenADetails = await fetch('https://api.dex.guru/v1/tokens/'+_tokenA+'-bsc').then((data) => data.json());
            // let _tokenBDetails = await fetch('https://api.dex.guru/v1/tokens/'+_tokenB+'-bsc').then((data) => data.json());
            let _amountA = 1 * (10 ** _tokenAdecimals ); 
            let _amountB = 1 * (10 ** _tokenBdecimals ); 
            // console.log("Getting LP Price");
            
            let _tokenBpriceUSD = BNBUsdS ;
            if(_tokenB != BNB){
                let _resultB ;
                if(_pairPrimary.includes(_tokenB) || v.primaryPair == null) {
                _resultB = await _routerContractS.methods.getAmountsOut(_amountB+'', [_tokenB, BNB]).call();
                }
                else{
                _resultB = await _routerContractS.methods.getAmountsOut(_amountB+'', [_tokenB, v.primaryPair]).call();
                }

                
                _tokenBpriceUSD = _resultB[1] / (10 ** 18); // price of 1 CAKE in BUSD
                // _tokenBpriceUSD = _tokenBpriceUSD * BNBUsdS ;

                if(v.primaryPair == null) {
                    _tokenBpriceUSD = _tokenBpriceUSD * BNBUsdS ;
                }

            }

            let _tokenApriceUSD = BNBUsdS ;
            if(_tokenA != BNB){
             let _resultA ;
            if(_pairPrimary.includes(_tokenA) || v.primaryPair == null) {
                _resultA = await _routerContractS.methods.getAmountsOut(_amountA+'', [_tokenA, BNB]).call();
            }
            else{
                _resultA = await _routerContractS.methods.getAmountsOut(_amountA+'', [_tokenA, v.primaryPair]).call();
            }

            _tokenApriceUSD = _resultA[1] / (10 ** 18); // price of 1 CAKE in BUSD
            
            if(v.primaryPair == null) {
            _tokenApriceUSD = _tokenApriceUSD * BNBUsdS ;
            }

            }
            console.log("Token A "+v.name+" Price: ", _tokenApriceUSD);
            console.log("Token B "+v.name+" Price: ", _tokenBpriceUSD);
            
            let _tokenAsupply = _tokenSupply._reserve0/1e1**_tokenAdecimals ;
            let _tokenBsupply = _tokenSupply._reserve1/1e1**_tokenBdecimals ;

            let _totalValue = parseFloat(_tokenApriceUSD*_tokenAsupply) + parseFloat(_tokenBpriceUSD*_tokenBsupply) ;
            // console.log("Total "+v.name+" Value: ", _totalValue);
            console.log("Total "+v.name+" Value: ", _totalValue);

            let _totalSupply = await  _tokenLpContract.methods.totalSupply().call() ; 
            let _lpDecimals = await  _tokenLpContract.methods.decimals().call() ; 
            console.log("Total "+v.name+" Supply: ", _totalSupply);
            _totalSupply = _totalSupply/1e1**_lpDecimals ;
            _stokenPrice = parseFloat(_totalValue/_totalSupply)
            console.log("Total "+v.name+" Price: ", _stokenPrice);
            
  
    
    
            }
            else{
                console.log("Getting S Price");
                // _stokenPrice = 1 ;
                let _amountS = 1 * (10 ** stotalDecimals ); 
                let _resultS ;
                if(v.primaryPair == null) {
                _resultS = await _routerContractS.methods.getAmountsOut(_amountS+'', [stakeTokenAddress, BNB]).call();
                 }
                 else{
                _resultS = await _routerContractS.methods.getAmountsOut(_amountS+'', [stakeTokenAddress, v.primaryPair]).call();
                 }
                _stokenPrice = _resultS[1] / (10 ** 18); // price of 1 CAKE in BUSD
                console.log("StakeP "+v.stakeToken+": "+_stokenPrice)

                _stokenPrice = _stokenPrice * BNBUsdS ;
                // const _stokenDetails = await fetch('https://api.dex.guru/v1/tokens/'+temp['stakeTokenAddress']+'-bsc').then((data) => data.json());
                // console.log("StakeP "+v.stakeToken+": "+_stokenPrice)
                // _stokenPrice  = _stokenDetails.priceUSD ;
                // _stokenPrice  = _stokenDetails.priceUSD ;

           


            }
            setsTokenPrice(_stokenPrice) ;
            console.log("Getting R Price");

        let _amountR = 1 * (10 ** rtotalDecimals ); 
        let _resultR ;

        if(v.primaryPair == null) {
              _resultR = await _routerContractR.methods.getAmountsOut(_amountR+'', [rewardTokenAddress, BNB]).call();

             }
             else{
          _resultR = await _routerContractR.methods.getAmountsOut(_amountR+'', [rewardTokenAddress, v.primaryPair]).call();
            
             }
        _tokenPrice = _resultR[1] / (10 ** 18); // price of 1 CAKE in BUSD
        _tokenPrice = _tokenPrice * BNBUsdR ;
        console.log("Token Price "+rewardTokenAddress , _tokenPrice );

        setrTokenPrice(_tokenPrice) ;
      

           // const _tokenDetails = await fetch('https://api.dex.guru/v1/tokens/'+temp['rewardTokenAddress']+'-bsc').then((data) => data.json());
           // let _tokenDetails = tokenDetails.json() ;
        // _tokenPrice  = _tokenDetails.priceUSD ;
        console.log("Total "+v.name+" Price: ", _tokenPrice);

        let _rewardperblock = await _tokenPoolContract.methods.rewardPerBlock().call() ;
        console.log(_rewardperblock);
        console.log(_tokenPrice);
        let earnPerYear = 10512000 * _rewardperblock * _tokenPrice  ; 
        console.log("APY "+v.name ,   earnPerYear/1e1**rtotalDecimals);
       
        let sttokenpool = _stokenPrice*totalStaked ;
        console.log("Stakig "+v.stakeToken+" Amount", totalStaked);
        console.log("Stakig "+v.stakeToken+" Token Price", _stokenPrice);
        console.log("Stakig "+v.stakeToken+" Token Amount", sttokenpool);
        console.log(v.name+" APR" , parseFloat(((earnPerYear/1e1**rtotalDecimals)/(sttokenpool/1e1**stotalDecimals))*100).toFixed())

        apr = parseFloat(((earnPerYear/1e1**rtotalDecimals)/(sttokenpool/1e1**stotalDecimals))*100).toFixed() ;
        setApr(apr);

    }
    else{
        setApr(apr);
    }
} 

async function isApproved(contractAddress,tokenAddress){
    let _web3 = new Web3(web3Provider);
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,tokenAddress);
    var approval = await _tokenContract.methods.allowance(wallet.account,contractAddress).call() ; 
    console.log(approval); 
    if(approval > 0){
        return true  ;
    }
    else{
        return false  ;

    }

}


const calculateCakeEarnedPerThousandDollars = (numberOfDays, farmApy, cakePrice) => {
    // Everything here is worked out relative to a year, with the asset compounding daily
    const timesCompounded = 365
    //   We use decimal values rather than % in the math for both APY and the number of days being calculates as a proportion of the year
    const apyAsDecimal = farmApy / 100
    const daysAsDecimalOfYear = numberOfDays / timesCompounded
    //   Calculate the starting CAKE balance with a dollar balance of $1000.
    const principal = 1000 / cakePrice
    console.log(cakePrice);
  
    // This is a translation of the typical mathematical compounding APY formula. Details here: https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
    const finalAmount = principal * (1 + apyAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear)
  
    // To get the cake earned, deduct the amount after compounding (finalAmount) from the starting CAKE balance (principal)
    const interestEarned = finalAmount - principal
    return parseFloat(interestEarned).toFixed(2)
  }
  
  const apyModalRoi = (amountEarned, amountInvested) => {
    const percentage = (amountEarned / amountInvested) * 100
    return percentage.toFixed(2)
  }


function opennoclaimRewardModal(){
    setnoclaimRewardmodal(!noclaimRewardmodal)

}

function opennoWithdrawModal(){
    setnoWithdrawmodal(!nowithdrawmodal)

}



async function setMaxWIthdraw(){

    // let _web3 = new Web3(web3Provider);
    // const _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,wcurrentContract);
    // let userInfo = await _tokenPoolContract.methods.userInfo(wallet.account).call() ;  
    // let _staketoken = await _tokenPoolContract.methods.stakeToken().call() ;  
    // const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_staketoken);
 

    // const decimals = await _tokenContract.methods.decimals().call();
    // const wbalance  = parseFloat(userInfo.amount/1e1**decimals).toFixed(4) ; 

    setwsamount(wbalance)
    setWithdrawAmount(wbalance)
}

async function openWithdrawModal(contractAddress,tokenAddress){
    setWithdrawmodal(!withdrawmodal)
    setWithdrawError(false);
    setwsamount('')
    setWithdrawAmount('')
 

    let _web3 = new Web3(web3Provider);
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,tokenAddress);
    const _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,contractAddress);
    const wsymbol = await _tokenContract.methods.symbol().call();
    const decimals = await _tokenContract.methods.decimals().call();
    let userInfo = await _tokenPoolContract.methods.userInfo(wallet.account).call() ;  

    
    setWSymbol(wsymbol);
    setWCurrentContract(contractAddress);

    if(userInfo.amount < 1e1**decimals){
        const wbalance  = parseFloat(userInfo.amount/1e1**decimals)  ; 
        setWBalance(wbalance);
    }
    else{
        const wbalance  = parseFloat(userInfo.amount/1e1**decimals)  ; 
        setWBalance(wbalance);
    }

} 


async function openRoiModal(contractAddress,rtoken,stoken,rtokenprice,stokenprice,ape,lp){
    let _web3 = new Web3(web3Provider);
    const _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,contractAddress);
    const _stokenContract = new _web3.eth.Contract(TOKEN_ABI,stoken);
    const _rtokenContract = new _web3.eth.Contract(TOKEN_ABI,rtoken);
    
    const symbol = await _stokenContract.methods.symbol().call();
    const rsymbol = await _rtokenContract.methods.symbol().call();
     
    let stotalDecimals = await _stokenContract.methods.decimals().call() ;
    let rtotalDecimals = await _rtokenContract.methods.decimals().call() ;
    let totalStaked = await _tokenPoolContract.methods.totalStaked().call() ;
    
    // temp['rewardTokenAddress'] = await _tokenPoolContract.methods.rewardToken().call() ;
    // const _tokenDetails = await fetch('https://api.dex.guru/v1/tokens/'+rtoken+'-bsc').then((data) => data.json());
    // let _tokenDetails = tokenDetails.json() ;
    let _tokenPrice  = rtokenprice ;
    
    let _rewardperblock = await _tokenPoolContract.methods.rewardPerBlock().call() ;

    const _stokenDetails = await fetch('https://api.dex.guru/v1/tokens/'+stoken+'-bsc').then((data) => data.json());
    
    let _stokenPrice  = stokenprice ;
    let sttokenpool = _stokenPrice*totalStaked ;


    let earnPerYear = 10512000 * _rewardperblock * _tokenPrice  ; 
    earnPerYear = parseFloat((earnPerYear/1e1**rtotalDecimals)/(sttokenpool/1e1**stotalDecimals)).toFixed() ;
    console.log(_tokenPrice);
    let oneDay = calculateCakeEarnedPerThousandDollars(1 , earnPerYear*100 , _tokenPrice)
    let sevenDay = calculateCakeEarnedPerThousandDollars(7 , earnPerYear*100 , _tokenPrice)
    let thirtyDay = calculateCakeEarnedPerThousandDollars(30 , earnPerYear*100 , _tokenPrice)
    let year = calculateCakeEarnedPerThousandDollars(365 , earnPerYear*100 , _tokenPrice)
    console.log(oneDay);

    let oneDayRoi =   apyModalRoi(oneDay,1000/_tokenPrice);
    let sevenDayRoi =   apyModalRoi(sevenDay,1000/_tokenPrice);
    let thirtyDayRoi =   apyModalRoi(thirtyDay,1000/_tokenPrice);
    let yearRoi =   apyModalRoi(year,1000/_tokenPrice);
    
    
    setRoimodal(!roimodal)

    setOneDay(oneDay);
    setSevenDay(sevenDay);
    setThirtyDay(thirtyDay);
    setyear(year);


    setOneDayRoi(oneDayRoi);
    setSevenDayRoi(sevenDayRoi);
    setThirtyDayRoi(thirtyDayRoi);
    setyearRoi(yearRoi);
    setrSymbol(rsymbol);
    setSymbol(symbol);
    var v = POOL_CONTRACT[props.index] ;  
    let _sdomain ;
    let _sdomainLp ;
    let _rdomain ;
    let _rdomainLp ;
    if(v.rape == 0){
     
        _rdomain = "https://pancakeswap.finance/swap?outputCurrency=" ;
        _rdomainLp = "https://pancakeswap.finance/add/" ;
    }
    else if(v.rape == 1) {
       
        _rdomain = "https://app.apeswap.finance/swap?outputCurrency=" ;
        _rdomainLp = "https://app.apeswap.finance/add/" ;

    }
    else if(v.rape == 2) {
        
        _rdomain = "https://www.bakeryswap.org/#/swap?outputCurrency=" ;
        _rdomainLp = "https://www.bakeryswap.org/#/add/" ;
    }
    if(v.sape == 0){
        _sdomain = "https://pancakeswap.finance/swap?outputCurrency=" ;
        _sdomainLp = "https://pancakeswap.finance/add/" ;

       
    }
    else if(v.sape == 1){
       
        _sdomain = "https://app.apeswap.finance/swap?outputCurrency=" ;
        _sdomainLp = "https://app.apeswap.finance/add/" ;
    }
    else if(v.sape == 2) {
       
        _sdomain = "https://www.bakeryswap.org/#/swap?outputCurrency=" ;
        _sdomainLp = "https://www.bakeryswap.org/#/add/" ;
    }


    if(ape == 1){
        setLink( _sdomain+stoken)
    }
    else{

        if(lp == 1){
            let _tokenLpContract = new _web3.eth.Contract(LP_ABI,stoken);
            let _tokenA = await  _tokenLpContract.methods.token0().call() ;
            let _tokenB = await  _tokenLpContract.methods.token1().call() ;
            let stokenB ;
            if(_tokenA != 'BNB' && _tokenA != "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
                stoken = _tokenA ;
                stokenB = _tokenB ;
            }
            else if(_tokenB != 'BNB' && _tokenB != "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
                stoken = _tokenB ;
                stokenB = _tokenA ;

            }
            

            setLink(_sdomainLp+stoken+"/"+stokenB)

        }
        else{
            setLink(_sdomain+stoken)

        }

    }
}

 

async function setMaxDeposit(){

 
    setdAmount(balance)
    setDepositAmount(balance)
}

async function openDepositModal(contractAddress, tokenAddress){
    setDepositmodal(!depositmodal)
    setDepositError(false);
    setdAmount('')
    setDepositAmount('')
    let _web3 = new Web3(web3Provider);
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,tokenAddress);
    const symbol = await _tokenContract.methods.symbol().call();
    const balance = await _tokenContract.methods.balanceOf(wallet.account).call();
    const decimals = await _tokenContract.methods.decimals().call();
    setSymbol(symbol);
    setCurrentContract(contractAddress);
    if(balance < 1e1**decimals){
        setBalance(parseFloat(balance/1e1**decimals) );
    }
    else{
        setBalance(parseFloat(balance/1e1**decimals) );

    }
}

async function claimReward(currentContract){
    let _web3 = new Web3(web3Provider);
    setModal(!modal);
    console.log(wallet.account);
    const _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,currentContract);
    _tokenPoolContract.methods.withdraw(0).send({
        from: wallet.account
    }).on('receipt', function(receipt){
        setModal(modal);
        initContracts() ;
        getUserReward() ;
        getTotalStaked() ;
        getApr() ;
        getUserStaked() ;
        getEndTime() ;
    }).on('error', function(error){
        console.log(error);
        setModal(modal);

    })


}



async function withdrawToken(){
    setWithdrawError(false);
    if(wbalance <= 0 ){
        setWithdrawError('Insufficient Staked Balance. Please enter amount smaller than or equal to your staked balance.');
        return false;
    }

    if(withdrawAmount <= 0 || withdrawAmount == ""){
        setWithdrawError('Invalid Withdraw Amount. Please enter a valid amount greater than 0.');
        return false;
    }


    let _web3 = new Web3(web3Provider);

 
    const _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,wcurrentContract);

    let _staketoken = await _tokenPoolContract.methods.stakeToken().call() ;  

    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_staketoken);

    let _decimals = await _tokenContract.methods.decimals().call() ;  
    // _decimals = 1e1**_decimals ;
 
    let _amount = parseFloat(withdrawAmount) ;
    // let _amount = parseFloat(depositAmount).toFixed() + parseFloat(depositAmount*0.4).toFixed();
    // let _amount = parseFloat(depositAmount*_decimals).toFixed() ;

    if(_decimals == 18){
        _amount = _web3.utils.toWei(_amount.toString()) ;
    }
    else{
        // withdrawAmount
        _amount = parseFloat(_amount*1e1**_decimals).toFixed() ;
    }

    // let _amount = parseFloat(depositAmount).toFixed() + parseFloat(depositAmount*0.4).toFixed();
    // let _amount = _web3.utils.toWei(withdrawAmount.toString(), _web3.utils.toBN(_decimals) );

    console.log(_amount);

    setWithdrawmodal(false)
    setModal(!modal);
    _tokenPoolContract.methods.withdraw(_amount).send({
        from: wallet.account
    }).on('receipt', function(receipt){
        setModal(modal);
        initContracts() ;
        getUserReward() ;
        getTotalStaked() ;
        getApr() ;
        getUserStaked() ;
        getEndTime() ;
    }).on('error', function(receipt){
        setModal(modal);

    })
    
}

async function depositToken(){
    setDepositError(false);
    if(balance <= 0 ){
        setDepositError('Insufficient Balance. Please fund your wallet with some '+symbol+' Token and try again.');
        return false;
    }

    if(depositAmount <= 0 || depositAmount == ""){
        setDepositError('Invalid Deposit Amount. Please enter a valid amount greater than 0.');
        return false;
    }


    let _web3 = new Web3(web3Provider);
    const _tokenPoolContract = new _web3.eth.Contract(TOKEN_POOL_ABI,currentContract);

    let _staketoken = await _tokenPoolContract.methods.stakeToken().call() ;  

    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_staketoken);

    let _decimals = await _tokenContract.methods.decimals().call() ;   
    // _decimals = 1e1**_decimals ;
    let _amount = parseFloat(depositAmount) ;
    // console.log(_amount);
    // _amount = parseInt(_amount) ;
    // let _amount = parseFloat(depositAmount).toFixed() + parseFloat(depositAmount*0.4).toFixed();
    // _amount = _web3.utils.toWei(_amount.toString()) ;
    if(_decimals == 18){
        _amount = _web3.utils.toWei(_amount.toString()) ;
    }
    else{
        _amount = parseFloat(_amount*1e1**_decimals).toFixed() ;

        // _amount = _web3.utils.toBN(_amount).mul( _web3.utils.toBN(1e1**_decimals)) ;
    }

    console.log(_amount);

    setDepositmodal(false)
    setModal(!modal);
    _tokenPoolContract.methods.deposit(_amount).send({
        from: wallet.account
    }).on('receipt', function(receipt){
        setModal(modal);
        initContracts() ;
        getUserReward() ;
        getTotalStaked() ;
        getApr() ;
        getUserStaked() ;
        getEndTime() ;
    }).on('error', function(receipt){
        setModal(modal);

    })
    
}

async function approveToken(contractAddress, tokenAddress){
    let _web3 = new Web3(web3Provider);
    console.log(contractAddress,tokenAddress);
    setShow(true);
    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,tokenAddress);
    const _amount = _web3.utils.toWei('100000000') ;
    _tokenContract.methods.approve(contractAddress,_amount).send({from: wallet.account}).on('receipt', function(receipt){
        initContracts(); 
        getUserReward() ;
        getTotalStaked() ;
        getApr() ;
        getUserStaked() ;
        getEndTime() ;
         setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}




function submitApprove(){
  setOpen(false);
}



return (
    
                          <>
                          {
            visible && 

                            <div class="panel panel-default onlyDesktop">
			<div class="panel-heading" role="tab" id="headingOne">
				<h4 class="panel-title">
				<a role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse'+props.index} aria-expanded="true" aria-controls={'collapse'+props.index}>
				<div className="wrp-bison">
					<div className="bison-c1 bg-bison">
						<div className="img-bison">
							<img src={poolsArray.simage} />
						</div>
                        
					</div>
					<div className="token">
						<h3>{poolsArray.rewardToken}</h3>
					</div>
					<div className="apr">
						
						<ul className="arp-list">
							<li>
								<div className="wrp-arp">
									<div className="apr-c mr-right"><h3> <img onClick={() => openRoiModal(poolsArray.address,poolsArray.rewardTokenAddress,poolsArray.stakeTokenAddress,rTokenPrice,sTokenPrice,poolsArray.sape, poolsArray.lp)} className="roiicon" src={roiicon} />{apr}% </h3></div>
									<div className="apr-c"><h3>${parseFloat(totalStaked*sTokenPrice).toFixed()}</h3></div>
								</div>
							</li>
							
						</ul>
					</div>
					<div className="q-marg">
						<h3>{userReward} </h3>
					</div>
					<div className="bison-btn">
                        {!wallet.account && 
						<ConnectButton />                        
                        }
                        {wallet.account && poolsArray.approval > 0 &&  props.status == 1 &&
						<button onClick={() => openDepositModal(poolsArray.address,poolsArray.stakeTokenAddress)}>Deposit</button>                        
                        }
                        {wallet.account && poolsArray.approval == 0 && props.status == 1 &&
						<button onClick={() => approveToken(poolsArray.address,poolsArray.stakeTokenAddress)}>Approve</button>                        
                        }
                        
					</div>
				</div>
				</a>
			</h4>
			</div>
			<div id={'collapse'+props.index} class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
				<div class="panel-body">
				<div className="bottom-list">
				<ul className="arp-list2">
							
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>End</p>
									</div>
									
									<div className="apr-c ">
										<p>{endTime}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Total Staked:</p>
									</div>
									<div className="apr-c ">
										<p>{totalStaked}</p>
									</div>
								</div>
							</li>
                            <li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Stake Fee</p>
									</div>
									<div className="apr-c">
										<p>{poolsArray.stakeFee}%</p>
									</div>
								</div>
							</li>
                            <li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Unstake Fee</p>
									</div>
									<div className="apr-c">
										<p>{poolsArray.unstakeFee}%</p>
									</div>
								</div>
							</li>
                           
                            </ul>
				<ul className="arp-list2">

							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Stake</p>
									</div>
									<div className="apr-c">
										<p>{poolsArray.stakeToken}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Staked Value</p>
									</div>
									<div className="apr-c">
										<p>${parseFloat(userStaked*sTokenPrice).toFixed()}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Earned Value</p>
									</div>
									<div className="apr-c">
										<p>${parseFloat(userReward*rTokenPrice).toFixed()}</p>
									</div>
								</div>
							</li>
                            <li>
                            <div className="wrp-arp2">
									<div className="apr-c bscscan">
                            <a href={EX_LINK+poolsArray.address} target="_blank">View on BscScan</a>
                            </div>
									<div className="apr-c bscscan">
									<a href={poolsArray.website}>View Project Site</a>
                                    </div>
								</div>
                            </li>
                            <li>
                            <div className="wrp-arp2 text-center font-big">
                              
                                <p>
                                Stake {poolsArray.stakeToken} <a href={slink} target="_blank"  ><i className="fa fa-external-link"></i></a>  EARN {poolsArray.rewardToken } <a href={rlink} target="_blank" ><i className="fa fa-external-link"></i></a>
                                </p>
                                
                                            
								</div>
                            </li>
							
						</ul>
						<div className="wrp-staked">
							<p>Staked</p>
							<p>{userStaked} {poolsArray.stakeToken}</p>
                            {wallet.account && userStaked > 0 && 
						<button onClick={() => openWithdrawModal(poolsArray.address,poolsArray.stakeTokenAddress)}>Unstake</button>                        
                        }
                        {wallet.account && userReward > 0 && 
						<button onClick={() => claimReward(poolsArray.address)}>Claim</button>                        
                        }
						</div>
                      
				</div>
                 
						
				</div>
			</div>
			</div>

}

{
            visible && 

            <div className="faq-mobile">
            <div class="faq-singular" itemscope itemprop="mainEntity" >
											<h2 class="faq-question" itemprop="name">
												<div className="bnbmobile-wrp">
													<div className="bnb-left">
														<h3>{poolsArray.rewardToken}</h3>
														<p>APR <span> <img onClick={() => openRoiModal(poolsArray.address,poolsArray.rewardTokenAddress,poolsArray.stakeTokenAddress,rTokenPrice,sTokenPrice,poolsArray.sape, poolsArray.lp)} className="roiicon" src={roiicon} />{apr}%</span></p>
														<p>Earned {userReward} {poolsArray.rewardToken}</p>
													</div>
													<div className="bnb-right">
														<div className="mobile-unloackbtn">
                                                        {!wallet.account && 
						<ConnectButton />                        
                        }
                        {wallet.account && poolsArray.approval > 0 && props.status == 1 &&
						<button onClick={() => openDepositModal(poolsArray.address,poolsArray.stakeTokenAddress)}>Deposit</button>                        
                        }
                        {wallet.account && poolsArray.approval == 0 && props.status == 1 &&
						<button onClick={() => approveToken(poolsArray.address,poolsArray.stakeTokenAddress)}>Approve</button>                        
                        }
														</div>
													</div>
												</div>
											</h2>
											<div class="faq-answer" itemscope itemprop="acceptedAnswer" >
												<div itemprop="text">
												<div className="bottom-list">
				<ul className="arp-list2">
							
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>End</p>
									</div>
									
									<div className="apr-c  text-right">
										<p>{endTime}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Total Staked:</p>
									</div>
									<div className="apr-c  text-right">
										<p>{totalStaked}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Stake</p>
									</div>
									<div className="apr-c  text-right">
										<p>{poolsArray.stakeToken}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Staked Value</p>
									</div>
									<div className="apr-c  text-right">
										<p>${parseFloat(userStaked*sTokenPrice).toFixed()}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Earned Value</p>
									</div>
									<div className="apr-c  text-right">
										<p>${parseFloat(userReward*rTokenPrice).toFixed()}</p>
									</div>
								</div>
							</li>
                            <li>
                            <div className="wrp-arp2">
									<div className="apr-c">
        							<p>Staked</p>
									</div>
									<div className="apr-c text-right">

							<p>{userStaked}</p>
									</div>
                                     

						</div>

                            </li>
                            <li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Stake Fee</p>
									</div>
									<div className="apr-c text-right">
										<p>{poolsArray.stakeFee}%</p>
									</div>
								</div>
							</li>
                            <li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Unstake Fee</p>
									</div>
									<div className="apr-c text-right">
										<p>{poolsArray.unstakeFee}%</p>
									</div>
								</div>
							</li>
							<li>
                            <div className="wrp-arp2">
									<div className="apr-c">
									<a href={EX_LINK+poolsArray.address} target="_blank" >View on BscScan</a>
                                    </div>
									<div className="apr-c  text-right">
									<a href={poolsArray.website} target="_blank">View Project Site</a>
                                    </div>

								</div>
							</li>
                            <li>
                            <div className="wrp-arp2 text-center font-big">
                              
                                <p>
                                Stake {poolsArray.stakeToken} <a href={slink} target="_blank"  ><i className="fa fa-external-link"></i></a>  EARN {poolsArray.rewardToken } <a href={rlink} target="_blank" ><i className="fa fa-external-link"></i></a>
                                </p>
                                
                                            
								</div>
                            </li>
                            <li>
                            <div className="wrp-arp2">
                            
                            {wallet.account && userStaked > 0 && 
						<button onClick={() => openWithdrawModal(poolsArray.address,poolsArray.stakeTokenAddress)}>Unstake</button>                        
                        }
                        {wallet.account && userReward > 0 && 
						<button onClick={() => claimReward(poolsArray.address)}>Claim</button>                        
                        }
                        	</div>
							</li>
							
						</ul>
						 
				</div> 
												</div>
											</div>
						</div>		
					</div>
}

                
   <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>
 
 <Modal isOpen={noclaimRewardmodal} toggle={noclaimRewardToggle}  centered={true}>

   
   <ModalBody>
   <div className="modaltext">You have not earned any reward in this pool yet.</div>        
   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={noclaimRewardToggle}>Close</Button>
    
 </Modal>
 <Modal isOpen={nowithdrawmodal} toggle={nowithdrawToggle}  centered={true}>

   <ModalBody>
   <div className="modaltext">You have not staked in this pool yet.</div>        
   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={nowithdrawToggle}>Close</Button>

    
 </Modal>

 <Modal isOpen={roimodal} toggle={roimodalToggle}  centered={true}>
 <ModalHeader toggle={roimodalToggle}><span className="ml-1 roititle">ROI</span></ModalHeader>
   <ModalBody>
   <div className="roiarea">
            <table >
                   <tr>
                    <th width="40%">
                       Timeframe
                    </th>
                    <th width="30%">
                       ROI
                    </th>
                    <th width="30%">
                       {rsymbol} per $1000
                    </th>
                    </tr>
                <tr>
                <td colSpan="3">
                </td>
                   </tr>
                   <tr>
                <td colSpan="3">
                </td>
                   </tr>
                <tr>
                    <td>
                       1d
                    </td>
                    <td>
                       {oneDayRoi}%
                    </td>
                    <td>
                       {oneDay}
                    </td>
                    </tr>
                    <tr>
                    <td>
                       7d
                    </td>
                    <td>
                       {sevenDayRoi}%
                    </td>
                    <td>
                       {sevenDay}
                    </td>
                    </tr>
                    <tr>
                    <td>
                       30d
                    </td>
                    <td>
                       {thirtyDayRoi}%
                    </td>
                    <td>
                       {thirtyDay}
                    </td>
                    </tr>
                    <tr>
                    <td>
                       365d(annual)
                    </td>
                    <td>
                       {yearRoi} %
                    </td>
                    <td>
                       {year}
                    </td>
                    </tr>
            </table>
            <p>Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.</p>
            <p className="text-center"><a target="_blank" href={link} >Get {symbol}</a></p>
       </div>        
   </ModalBody>
    
 </Modal>

 <Modal isOpen={withdrawmodal} toggle={withdrawToggle}  centered={true}>
  
 <ModalBody>
         
    <div className="moveRight">
        
        <span> 
           Your Staked<br />
           {wbalance} {wsymbol}
        </span>
    </div>
   <label><br />Enter Withdraw Amount <span className="depositButton ml-2 p-2" onClick={setMaxWIthdraw}>Max</span> </label>
   <input className="form-control" onChange={handleWithdrawChange} type="text"  value={wsamount} />
   {
       withdrawError &&
       <span className="error">{withdrawError}</span>
   }
    {
            poolsArray.fee == 1 &&
            <div className="notice">
                    <p>
                        Note: Unstaking Fee of {poolsArray.unstakeFee}% is applicable.
                    </p>
            </div>
        }
 </ModalBody>
 <ModalFooter>
   <Button className="depositButton mr-3" onClick={withdrawToken}>Withdraw</Button>{' '}
   <Button className="depositButton" onClick={withdrawToggle}>Cancel</Button>
 </ModalFooter>
</Modal>
 <Modal isOpen={depositmodal} toggle={depositToggle}  centered={true}>

 
   <ModalBody>
           
      <div className="moveRight">
          
          <span> 
             Your Balance<br />
             {balance} {symbol}
          </span>
      </div>
     <label><br />Enter Deposit Amount <span className="depositButton ml-2 p-2" onClick={setMaxDeposit}>Max</span></label>
     <input className="form-control" onChange={handleDepositChange} type="text" value={damount} />
     {
         depositError &&
         <span className="error">{depositError}</span>
     }
      {
            poolsArray.fee == 1 &&
            <div className="notice">
                    <p>
                        Note: Staking Fee of {poolsArray.stakeFee}% is applicable.
                    </p>
            </div>
        }
        {
            poolsArray.stakeToken == "NAUT" &&
            <div className="notice">
                    <p>
                    Warning: NAUT token burn 4% while deposit and 4% during withdraw. So you will lose 7.84% of the total amount you stake in and out process.
                    </p>
            </div>
        }
    
   </ModalBody>
   <ModalFooter>
     <Button className="depositButton mr-3" onClick={depositToken}>Deposit</Button>{' '}
     <Button className="depositButton" onClick={depositToggle}>Cancel</Button>
   </ModalFooter>
 </Modal>
  </>

);
}
export default PoolCard;

 