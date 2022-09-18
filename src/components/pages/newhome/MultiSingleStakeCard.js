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
import ChooseSingleNFt from "./ChooseSingleNFt";
 
 

const MultiSingleStakeCard = (props) => {
  
  let web3Provider  = window.ethereum ; 
const NFT = props.data.nft ;
const NFT_STAKE = props.data.address ;
const wallet = useWallet();
const [status, setStatus] = useState(false);
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
   
const [damount, setdAmount] = useState(0);
const [depositArray, setDepositArray] = useState([]);

const [symbol, setSymbol] = useState('');
const [sTokenPrice, setsTokenPrice] = useState(0);
const [feeToken, setFeeToken] = useState(null);


const [stakefee ,setstakefee] =useState(0);
const [totalStaked ,settotalStaked] =useState(0);
const [nftSymbol, setNftSymbol] = useState('');
const [stakeTokenAddress, setstakeTokenAddress] = useState('');


const [approval, setApproval] = useState(0);
const [claimAllowed, setClaimAllowed] = useState(false);
const [stakeAllowed, setStakeAllowed] = useState(false);

const [userStaked, setUserStaked] = useState(0);
const [endTime, setEndTime] = useState(null);
const [depositAmount, setDepositAmount] = useState(0);
const [balance, setBalance] = useState(0);
const [stakingAmount, setStakingAmount] = useState(0);
const [stakingAmountOg, setStakingAmountOg] = useState(0);

const [limit, setLimit] = useState(0);
const [combination, setCombination] = useState(0);
 

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



const handleDepositChange = (n,v) => {
    // alert(v);
    let _temp = depositArray ; 
    // _temp[n] = v ;
    _temp.push(v) ;
    setDepositArray(_temp);  

}




async function depositToken(){
    setDepositError(false);
    // let _amount = parseInt(depositAmount) ;
  
    if(balance <= stakefee ){
        setDepositError('Insufficient Balance for fee. Please fund your wallet with some '+symbol+' Token and try again.');
        return false;
    }


    
    let _array = [];
    depositNow(depositArray) ;
    
    // let _web3 = new Web3(web3Provider);
    // const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
 
    // combination.map(async (v,i) => {
    //     let _getNft = await _stakeContract.methods.nftStakeaddresses(i).call() ; 
    //     if(depositArray[_getNft] != null){
    //         _array.push(depositArray[_getNft]);

    //     }
    //     if(i == (combination.length - 1)){
    //         depositNow(_array) ;
    //     }

    // })
    
}

async function depositNow(_array){
//   alert(_array.length);
    if(_array.length != limit){
        setDepositError('Invalid Deposit Selection. Please choose not more or less than '+limit+'  NFTs');
        return false;
    }

    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);
 

    console.log(_array);

    setModal(!modal);
    _stakeContract.methods.stakeNft(_array).send({
        from: wallet.account
    }).on('receipt', function(receipt){
        setModal(modal);
        depositToggle() ;
        initContracts() ;

       
       
    }).on('error', function(receipt){
        setModal(modal);

    })
    
}


 const getTime = async() => {

    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);

    // console.log(_unlockTime);
    let _claimtime = await _stakeContract.methods.claimtime().call() ;  
    let endTime ; 
    
    let _currentTime = new Date().getTime()/1e3 ;
    let _unlockTime = 0 ;
   
         _unlockTime = await _stakeContract.methods.nftclaimtime(wallet.account).call() ;  

   

    if(_unlockTime > 0 && _currentTime < _unlockTime ){
        setClaimAllowed(false)
 
    let remainingSeconds = _unlockTime - _currentTime ;
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
    if(remainingDay > 0){
        endTime = remainingDay+"d : "+remainingHour+"h : "+remainingMinutes+"m";
        setEndTime(endTime);

    }
    else{
        endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s" ;
        setEndTime(endTime);

    }
}
else if(_unlockTime < _currentTime && _unlockTime > 0 ){
   
   setEndTime("Ended")

     
    setClaimAllowed(true)
}
 
 } 

 
 const showTime = async() => {

    let _web3 = new Web3(web3Provider);
    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);

    // console.log(_unlockTime);
    let _claimtime = await _stakeContract.methods.claimtime().call() ;  
   
     
    let remainingSecondsC = _claimtime ;
    // console.log("Remaining Sec" , remainingSeconds);

    let remainingDayC = Math.floor(
        remainingSecondsC / (60 * 60 * 24)
    );
    let remainingHourC = Math.floor(
      (remainingSecondsC % (60 * 60 * 24)) / (60 * 60)
    );
    let remainingMinutesC = Math.floor(
      (remainingSecondsC % (60 * 60)) / 60
    );
    let remainingSec = Math.floor(remainingSecondsC % 60);
  
    let endTimeC = remainingDayC+"d : "+remainingHourC+"h : "+remainingMinutesC+"m";
        setEndTime(endTimeC);

 } 

const initContracts = async() => {
    let _web3 = new Web3(web3Provider);
    console.log(NFT_STAKE);
    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);

    let _nfttoken = await _stakeContract.methods.nftredeem().call() ;  

    let _nftcombination = await _stakeContract.methods.nftcombination().call() ;  
    // let _stakinglimit = await _stakeContract.methods.stakinglimit().call() ;  
    let rows = [];
    for (let i = 0; i < 1; i++) {
     rows.push({count : 1}) ;
    }
    setCombination(rows);
    setLimit(_nftcombination);


    const _nftContract = new _web3.eth.Contract(STAKENFT_ABI,_nfttoken);
    let _nftsymbol = await _nftContract.methods.symbol().call() ;

    setNftSymbol(_nftsymbol)

    let _feeToken = await _stakeContract.methods.feeToken().call() ;
setFeeToken(_feeToken)
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_feeToken);
    // setstakeTokenAddress(_staketoken);
    // let sprice = await getPrice(_staketoken,0);
    // // let sprice = 0 ;
    // setsTokenPrice(sprice);
    let _symbol = await _tokenContract.methods.symbol().call() ;
    setSymbol(_symbol);

    let _decimals = await _tokenContract.methods.decimals().call() ;
    let _stakingFee = await _stakeContract.methods.fee().call() ;  
    setstakefee(_stakingFee/1e1**_decimals);    

    

    // let _stakingAmount = await _stakeContract.methods.stakingamount().call() ; 
    // if(props.data.fee == 1){
    //     let _stakingFee = await _stakeContract.methods.fees().call() ;  
    //     setstakefee(_stakingFee/props.data.feedecimal);    
    // } 
    // let _totalStaked = await _tokenContract.methods.balanceOf(NFT_STAKE).call() ;  
    // _totalStaked = parseFloat(_totalStaked/1e1 ** _decimals).toFixed(2);
    // settotalStaked(_totalStaked);

    // setStakingAmount(_stakingAmount/1e1 ** _decimals) ;
    // setStakingAmountOg(_stakingAmount) ;

    // setSymbol(_symbol);
    
    let _status = await _stakeContract.methods.status().call() ; 
    setStatus(_status);

    if(wallet.account){

        let _userStaked = await _stakeContract.methods.existinguser(wallet.account).call() ; 
        // console.log(_userStaked); 
        setStakeAllowed(!_userStaked) ;


 
        
        

        let _approval = await _tokenContract.methods.allowance(wallet.account,NFT_STAKE).call() ;
        _approval = parseFloat(_approval/1e1 ** _decimals).toFixed(2) ;

        setApproval(_approval);
        let _balance = await _tokenContract.methods.balanceOf(wallet.account).call() ;
        _balance = parseFloat(_balance/1e1 ** _decimals).toFixed(2) ;
        setBalance(_balance);
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
     
    _stakeContract.methods.emergencyunstakenft().send({from: wallet.account}).on('receipt', function(receipt){
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

// const getPrice = async (_token,ape) => {
    
//     let _web3 = new Web3(web3Provider);
//     const BNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'; // BNB or another token
//     const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' ; //BUSD
   
 
//     let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_token);
//     let stotalDecimals = await _tokenContract.methods.decimals().call() ;

 

//     let SROUTER_ADDRESS = null ; 
   
//         if(ape == 0){
//             SROUTER_ADDRESS = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
//         }
//         else if(ape == 1) {
//             SROUTER_ADDRESS = '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7';

//         }

         
//         let _amountUSD = 1 * (10 ** 18 ); 

//         let _routerContractS = new _web3.eth.Contract(ROUTER_ABI, SROUTER_ADDRESS);

//         let _resultUSDS = await _routerContractS.methods.getAmountsOut(_amountUSD+'', [BNB, BUSD]).call();
//         let BNBUsdS = _resultUSDS[1] / (10 ** 18);
 
     
 
 
//         let _stokenPrice = 0 ;
  
 
//                  let _amountS = 1 * (10 ** stotalDecimals ); 
//                 let _resultS = await _routerContractS.methods.getAmountsOut(_amountS+'', [_token, BNB]).call();
//                 _stokenPrice = _resultS[1] / (10 ** 18); // price of 1 CAKE in BUSD
                
//                 _stokenPrice = _stokenPrice * BNBUsdS ;
                 
            
//             return _stokenPrice ;

//         }
 
async function approveToken(){
    let _web3 = new Web3(web3Provider);

    const _stakeContract = new _web3.eth.Contract(MULTI_NFT_STAKE_ABI,NFT_STAKE);

    let _staketoken = await _stakeContract.methods.feeToken().call() ;  

    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_staketoken);

    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    
    const _amount = _web3.utils.toWei('10000000000000000000000000000') ;
    _tokenContract.methods.approve(NFT_STAKE,_amount).send({from: wallet.account}).on('receipt', function(receipt){
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
    showTime() ; 
    if(wallet.account){
        setInterval(() => {
            getTime();
        },1000)
    }

},[wallet.account])

		return(

                
			<div>
                <div className="faq-mobile">
                    <div className="faq-singular" itemprop="mainEntity">
                        <h2 className="faq-question" itemprop="name">
                            <div className="bnbmobile-wrp">
                                
                                <div className="bnb-left">
                                <div className="img-bison">
                                            <img src={props.data.image} />
                                        </div>
                                <div className="token1">
                                         
                                         
                                            <h3 >{nftSymbol} NFT</h3>
                                    
                                    </div>
                                    {/* <div className="apr">
                                        
                                        <ul className="arp-list">
                                            <li>
                                                <div className="wrp-arp">
                                                   
                                                    <div className="apr-c1"><h3>{userStaked} {symbol}</h3></div>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div> */}
                                    <div className="apr">
                                        
                                        <ul className="arp-list">
                                            <li>
                                                <div className="wrp-arp">
                                                   
                                                    {
                                                        props.data.fee == 1 ?
                                                        <div className="apr-c1"><h3>Redeemable</h3></div>
                                                        :
                                                        <div className="apr-c1"><h3>Non-Redeemable</h3></div>
                                                    }
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                <div className="bnb-right">
                                    <div className="mobile-unloackbtn">
                                    
                                    {
                                            wallet.account && props.data.status == 1 && !claimAllowed && stakeAllowed &&
                                            <button onClick={depositToggle}>Stake</button>
                                        }
                                       
                                          {
                                            wallet.account  && !claimAllowed && !stakeAllowed &&
                                            <button className="mr-3" onClick={unstakeToggleRedeemable}>Unstake</button>
                                        }
                                          {
                                            wallet.account && claimAllowed &&
                                            <button onClick={claim}>Claim</button>
                                        }
                                    {
                                        !wallet.account && 
                                        <ConnectButton />
                                    }
                                    </div>
                                </div>
                            </div>
                        </h2>
                        <div className="faq-answer" itemprop="acceptedAnswer">
                            <div itemprop="text">
                                <div className="bottom-list">
                                    <ul className="arp-list2">
                                    <li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>End</p>
									</div>
									
									<div className="apr-c text-right">
										<p>{endTime}</p>
									</div>
								</div>
							</li>
							 
                            <li>
								<div className="wrp-arp2">
									<div className="apr-c">
										<p>Stake Fee</p>
									</div>
									<div className="apr-c text-right">
										<p>{stakefee/100}%</p>
									</div>
								</div>
							</li>
                          
                            <li>
                            
                            </li>
                            <li>
                            <div className="wrp-arp2">
									<div className="apr-c bscscan">
                            <a target="_blank" href={EX_LINK+props.data.nft} target="_blank">View on BscScan</a>
                            </div>
									<div className="apr-c bscscan">
									<a target="_blank" href={'https://pancakeswap.finance/swap?outputCurrency='+feeToken}>Buy {symbol} Token</a>
                                    </div>
								</div>
                            </li>
                            </ul>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrp-satke mb-3 onlyDesktop">
			<div class="panel-heading" role="tab" id="accordion">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse'+props.index} aria-expanded="true" aria-controls={'collapse'+props.index}>

                               <div className="wrp-bison1">
                                    <div className="bison-c1 bg-bison">
                                        <div className="img-bison">
                                            <img src={props.data.image} />
                                        </div>
                                        {/* <div className="img-bison-c">
                                            <img src={play} />
                                        </div>
                                        <div className="img-bison">
                                            <img src={big} />
                                        </div> */}
                                    </div>
                                    <div className="token1">
                                             <h3 >{nftSymbol} NFT</h3>
                                         
                                    </div>
                                    {/* <div className="apr">
                                        
                                        <ul className="arp-list">
                                            <li>
                                                <div className="wrp-arp">
                                                    <div className="apr-c mr-right"></div>
                                                    <div className="apr-c1"><h3>{userStaked} {symbol}</h3></div>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div> */}
                                    <div className="apr">
                                        
                                        <ul className="arp-list">
                                            <li>
                                                <div className="wrp-arp">
                                                    <div className="apr-c mr-right"></div>
                                                    {
                                                        props.data.fee == 1 ?
                                                        <div className="apr-c1"><h3>Redeemable</h3></div>
                                                        :
                                                        <div className="apr-c1"><h3>Non-Redeemable</h3></div>
                                                    }
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                    <div className="q-marg">
                                        <h3>{endTime}</h3>
                                    </div>
                                    <div className="bison-btn">
                                    {
                                            wallet.account && props.data.status == 1 && !claimAllowed && stakeAllowed && status &&
                                            <button onClick={depositToggle}>Stake</button>
                                        }
                                     
                                          {
                                            wallet.account  && !claimAllowed && !stakeAllowed && 
                                            <button className="mr-3" onClick={unstakeToggleRedeemable}>Unstake</button>
                                        }
                                          {
                                            wallet.account && claimAllowed &&
                                            <button onClick={claim}>Claim</button>
                                        }
                                          {
                                        !wallet.account && 
                                        <ConnectButton />
                                    }

                                    </div>
                                </div>
                                </a>
                             </div>
			<div id={'collapse'+props.index} className="panel-collapse collapse in mt-4" role="tabpanel" aria-labelledby="headingOne">
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
										<p>Stake Fee</p>
									</div>
									<div className="apr-c">
										<p>{stakefee} {symbol}</p>
									</div>
								</div>
							</li>
                           
                           
                            </ul>
				<ul className="arp-list2">

						  
                            <li>
                            <div className="wrp-arp2">
									<div className="apr-c bscscan">
                            <a target="_blank" href={EX_LINK+props.data.nft} target="_blank">View on BscScan</a>
                            </div>
									<div className="apr-c bscscan">
									<a target="_blank" href={'https://pancakeswap.finance/swap?outputCurrency='+feeToken}>Buy {symbol} Token</a>
                                    </div>
								</div>
                            </li>
                            
							
						</ul>
					 
                      
				</div>
                 
						
				</div>
			</div>
					
                
   <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>

 
 <Modal isOpen={unstakeRedeemableModal} toggle={unstakeToggleRedeemable}  centered={true}>

 
<ModalBody>


  <span className="mt-5 text-center" >Please confirm if you want to unstake.</span>


    
 
</ModalBody>
<ModalFooter>
 
        <Button className="depositButton mr-3" onClick={unstakeRedeemable}>Unstake</Button>
   
  <Button className="depositButton" onClick={unstakeToggleRedeemable}>Cancel</Button>
</ModalFooter>
</Modal>
 <Modal isOpen={unstakeModal} toggle={unstakeToggle}  centered={true}>

 
   <ModalBody>
   
   
     <span className="mt-5 text-center" >"Warning: you will lose all the progress so far if you unstake your tokens now, So if you decided to stake again the timer will begin from start again"</span>
 
   
       
    
   </ModalBody>
   <ModalFooter>
    
           <Button className="depositButton mr-3" onClick={unstake}>Proceed</Button>
      
     <Button className="depositButton" onClick={unstakeToggle}>Cancel</Button>
   </ModalFooter>
 </Modal>

 <Modal isOpen={depositmodal} toggle={unstakeToggle}   centered={true}>

 
   <ModalBody>
           
      <div className="moveRight">
          
          <span> 
             Your {symbol} Balance<br />
             {balance} {symbol}
          </span>
      </div>
     <label><br />Choose Any {limit} NFT to stake
     {/* <span className="depositButton ml-2 p-2" onClick={setMaxDeposit}>Max</span> */}
     </label>
     {/* <input className="form-control" onChange={handleDepositChange} type="number" step="1" min="1" value={damount} />
      */}
    <div className="" >
        
        {
            limit > 0 && combination.length > 0 && combination.map((v,i) => {

                return (
                    <ChooseSingleNFt index={i} address={NFT_STAKE} handleDepositChange={() => handleDepositChange} />

                )

            })
        }
      
    </div>
   

     <span className="mt-5 text-info" >Fee: {(stakefee) } {symbol}  </span><br />                                        <div>
     {
         depositError &&
         <span className="error text-danger">{depositError}</span>
     }
   
       </div>
    
   </ModalBody>
   <ModalFooter>
       {
           (approval > 0 && approval > stakingAmountOg*damount) &&
           <Button className="depositButton mr-3" onClick={depositToken}>Deposit</Button>
       }
       {
           (approval == 0 || approval < stakefee) &&
           <Button className="depositButton mr-3" onClick={approveToken}>Approve {symbol}</Button> 
       }
     <Button className="depositButton" onClick={depositToggle}>Cancel</Button>
   </ModalFooter>
 </Modal>
            </div>
            </div>
			
		);
 

}
export default MultiSingleStakeCard;