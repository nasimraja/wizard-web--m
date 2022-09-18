import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import hero from '../../images/hero.png';
import Header from '../header.js';
import Footer from '../footer.js';
import search from '../../images/search.png';
import add from '../../images/WOLFSAW.jpg';
import $ from "jquery";

import { NFT_BUY } from '../../../Config';
import NFT_BUY_ABI from '../../../Config/NFT_BUY.json'
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json'
import {useWallet} from '@binance-chain/bsc-use-wallet'

import Web3 from "web3"
import { parse } from 'yargs';


const Buy = () => {
   
    const [claimEnabled, setClaimEnabled] = useState(false);
    const [icoStarted, setIcoStarted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [endTime, setendTime] = useState(null);
    const [approved, setApproved] = useState(false);
    const [baseToken, setBaseToken] = useState(null);
    const [wBalance, setwBalance] = useState(0);
    const [maxInv, setMaxInv] = useState(0);
    const [exist, setExisting] = useState(false);
    const [tokenSymbol, setTokenSymbol] = useState(0);
    const [limitBalance, setLimitBalance] = useState(0);
    const [stakingAmount, setStakingAmount] = useState(0);
    const [stakingAmountOg, setStakingAmountOg] = useState(0);
    const [depositError, setDepositError] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);
    const [damount, setdAmount] = useState(0);


const [depositmodal, setDepositmodal] = useState(false);
const depositToggle = () => setDepositmodal(!depositmodal);

    
  const [modal, setModal] = useState(false);
  let timerInterval ;
const toggle = () => setModal(!modal);

    const wallet = useWallet();
    let web3Provider  = window.ethereum ; 

    
  useEffect(() => {
    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
       
      }
    //   clearInterval(timerInterval);
    //   timerInterval = setInterval(function(){
    //       getTime() ;
    //   },1000)
	  getData() ;
	 
	},[wallet.account])

    const getData = async() => {
        let _web3 = new Web3(web3Provider);
        let _icoContract = new _web3.eth.Contract(NFT_BUY_ABI,NFT_BUY);
        let _claimenabled = await _icoContract.methods.claimenabled().call() ;
        let _token = await _icoContract.methods.inputtoken().call() ;
        let _wtoken = await _icoContract.methods.wizard().call() ;
        let _maxInv = await _icoContract.methods.price().call() ;
        // console.log(_maxInv)
        setMaxInv(parseFloat(_maxInv/1e18).toFixed(2));

        let _wizardlimit = await _icoContract.methods.wizardlimit().call() ;


        setLimitBalance(_wizardlimit/1e18)


        let _wTokenContract = new _web3.eth.Contract(TOKEN_ABI,_wtoken);


        let _icoTokenContract = new _web3.eth.Contract(TOKEN_ABI,_token);

        let _sold = await _icoContract.methods.claimIndex().call() ;
        let _start = await _icoContract.methods.redeemstarttingrange().call() ;
        let _end = await _icoContract.methods.redeemendrange().call() ;
        let _diff = _end - _start ;
        // alert(_start);
        let _progress = _sold+"/"+_diff  ;
        
    let _stakingAmount = await _icoContract.methods.price().call() ; 
    let _decimals = await _icoTokenContract.methods.decimals().call() ;
      
    setStakingAmount(_stakingAmount/1e1 ** _decimals) ;
    setStakingAmountOg(_stakingAmount) ;
    
        let _symbol = await _icoTokenContract.methods.symbol().call() ;
        setTokenSymbol(_symbol);
        setProgress(_progress);
        setClaimEnabled(_claimenabled);

        let _wbalance1 = await _wTokenContract.methods.balanceOf('0x7d82F56ea0820A9d42b01C3C28F1997721732218').call() ;
            console.log(_wbalance1)
        setBaseToken(_token);
        if(wallet.account){
        // let _approved = await _icoTokenContract.methods.allowance(wallet.account,NFT_BUY).call() ;

        let _exist = await _icoContract.methods.existinguser(wallet.account).call() ;
        setExisting(_exist)
        let _wbalance = await _wTokenContract.methods.balanceOf(wallet.account).call() ;
     
            setwBalance(_wbalance/1e18);
            let _approved = await _icoTokenContract.methods.allowance(wallet.account,NFT_BUY).call() ;
            if(_approved > 0){
                setApproved(true);
            }

        }

    
        // setIcoStarted(_icoeabled);

        
    }   

    const getTime = async() => {
        let _web3 = new Web3(web3Provider);
        let _icoContract = new _web3.eth.Contract(NFT_BUY_ABI,NFT_BUY);
        let _endTime = await _icoContract.methods.icoEndTime().call() ;

        let _currentTime = new Date().getTime()/1e3 ;
        let endTime ;
        if(_endTime > _currentTime ){
            let remainingSeconds =  _endTime - _currentTime ;
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
                setendTime(endTime);
        
            }
            else{
                endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s" ;
                setendTime(endTime);
        
            }
    
        }
        else{
            setendTime(0);

        }
    }

    
    
async function claim(){
    let _web3 = new Web3(web3Provider);
    // console.log(contractAddress,tokenAddress);
    // setShow(true);
    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    const _nftContract = new _web3.eth.Contract(NFT_BUY_ABI,NFT_BUY);
 
    _nftContract.methods.claimTokens().send({from: wallet.account}).on('receipt', function(receipt){
     
        getData() ;
        
        setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}

async function depositToken(){
    let _web3 = new Web3(web3Provider);
    // console.log(contractAddress,tokenAddress);
    // setShow(true);
    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    const _nftContract = new _web3.eth.Contract(NFT_BUY_ABI,NFT_BUY);
 
    _nftContract.methods.trade(damount).send({from: wallet.account}).on('receipt', function(receipt){
     
        getData() ;
        
        setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}
async function deposit(){
    let _web3 = new Web3(web3Provider);
    // console.log(contractAddress,tokenAddress);
    // setShow(true);
    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    const _nftContract = new _web3.eth.Contract(NFT_BUY_ABI,NFT_BUY);
 
    _nftContract.methods.trade().send({from: wallet.account}).on('receipt', function(receipt){
     
        getData() ;
        
        setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}
async function approveToken(){
    let _web3 = new Web3(web3Provider);
    // console.log(contractAddress,tokenAddress);
    // setShow(true);
    setModal(!modal);
    // document.getElementById("exampleModalCenter").modal('show')
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,baseToken);
    const _amount = _web3.utils.toWei('1000000000000000000000000000') ;
    _tokenContract.methods.approve(NFT_BUY,_amount).send({from: wallet.account}).on('receipt', function(receipt){
     
        getData() ;
        
        setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}
  

const handleDepositChange = (e) => {
    let _amt = e.target.value ;
    _amt = parseInt(_amt);
    setDepositAmount(_amt) ;
    setdAmount(_amt) ;

}
		return(
			
			
                <div className="bg-stake">
                    <Header />
                <div className="bg-r">
		 
				<section id="pool-section">
		
					<div className="container">
                    <div className="row">
							<div className="col-lg-12">
                                <div className="nft-content">
                                    <h3>The S3V3 is the LAST collection of the S300 NFTs.</h3>
                                    <p>S3V3 NFT you qualify for the monthly rewards ceremony every single month. </p>
                                    {/* <h4>Limited-time NFTs</h4>
                                    <h5>NFT_BUY Available on Binance</h5> */}
                                </div>
                                <div className="admission-box">
                                    <div className="img-add">
                                        <img src={add} />
                                    </div>
                                    <div className="add-box-c-wrp">
                                        <ul className="add-list">
                                            <li>
                                                <div className="addlist-c-wrp">
                                                    <div className="addlist-c1">
                                                        <p>Wolf Saw Exclusive</p>
                                                    </div>
                                                    <div className="addlist-c2">
                                                        <p>Price</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="addlist-c-wrp">
                                                    <div className="addlist-c1">
                                                        <p>Pass</p>
                                                    </div>
                                                    <div className="addlist-c2">
                                                        <span>~{maxInv} {tokenSymbol}</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="addlist-c-wrp">
                                                    <div className="addlist-c4">
                                                        <span>Wolfsaw Exclusive - Rare Mint - The holder of this NFW will get airdropped 1 of 420 (out of 10,000 total) rare Wolf Saw NFW on the date of the collection reveal.</span>
                                                    </div>
                                                    <div className="addlist-c3">
                                                        <span>(~{maxInv}.00)</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="addlist-c-wrp">
                                                    <div className="addlist-c5">
                                                        <p>{progress} Sold</p>
                                                    </div>
                                                    <div className="addlist-c2">
                                                       
                                                    </div>

                                                </div>
                                                <div className="mt-4">
                                                    
                                                {
                                                    claimEnabled && !approved &&  wBalance >= limitBalance &&
                                                <button className="button" onClick={approveToken} >Approve</button>
                                                }
                                                {
                                                    claimEnabled &&  approved && wBalance >= limitBalance &&
                                                <button className="button" onClick={depositToggle} >Deposit</button>
                                                }
                                                {/* {
                                                    claimEnabled && 
                                                    <button className="button" onClick={claim}  >Claim</button>
                                                } */}

                                                </div>
 
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="time-box">
                                    {/* {!icoStarted && 
                                    <h3>Time Left Until Start {endTime}</h3>                                    
                                    } */}
                                </div>

                            </div>
						</div>
						
					</div>
				</section>
				
					
			</div>

            
   <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>

 
 <Modal isOpen={depositmodal} toggle={depositToggle}  centered={true}>

 
   <ModalBody>
           
      <div className="moveRight">
          
          <span> 
             Your Balance<br />
             {wBalance} {tokenSymbol}
          </span>
      </div>
     <label><br />Enter Multiples of NFT to Buy 
     {/* <span className="depositButton ml-2 p-2" onClick={setMaxDeposit}>Max</span> */}
     </label>
     <input className="form-control" onChange={handleDepositChange} type="number" step="1" min="1" value={damount} />
     <span className="mt-5" >Cost: {damount*stakingAmount } {tokenSymbol}</span><br />                                        <div>
     {
         depositError &&
         <span className="error">{depositError}</span>
     }
   
       </div>
    
   </ModalBody>
   <ModalFooter>
       {
           (approved ) &&
           <Button className="depositButton mr-3" onClick={depositToken}>Deposit</Button>
       }
       {
           (!approved ) &&
           <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button> 
       }
     <Button className="depositButton" onClick={depositToggle}>Cancel</Button>
   </ModalFooter>
 </Modal>
 

            </div>
			
		);
 

}
export default Buy;