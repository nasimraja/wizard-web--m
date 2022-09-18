/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import $, { inArray } from "jquery";
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";


import Config, { MARKETPLACE } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import NFT_ABI from '../../../Config/NFT_ABI.json';
import Web3 from "web3"
import { useState , useEffect } from 'react';
import useWallet from '@binance-chain/bsc-use-wallet'

import ConnectButton from '../ConnectButton.js';

const ExploreSingle = (props) => {
    let web3Provider  = window.ethereum ; 
    const wallet = useWallet();
    const [name,setName] = useState(0) ;
    const [price,setPrice] = useState(0) ;
    const [media,setMedia] = useState(null) ;
    const [balance, setBalance] = useState(0);
    const [approval, setApproval] = useState(0) ;
    const [damount, setdAmount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [depositError,setDepositError] = useState(null) ;
    const [buyer,setBuyer] = useState(null) ;
    const [lister,setLister] = useState(null) ;
    
    const [decimals, setDecimals] = useState(0);
    const [bidIncreasePercentage,setBidIncreasePercentage] = useState(0) ;
    const [minimumBid,setMinimumBid] = useState(0) ;
    const [symbol,setSymbol] = useState(null) ;
    const [highestBid,setHighestBid] = useState(0) ;
    const [userbid, setUserbid] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [bidStatus, setBidStatus] = useState(null);
    const bidStatusName = ['Bidding Inactive' , 'Bidding Open' , 'Bidding Paused' , 'Bidding Closed', ''];
    const [highestBidder,setHighestBidder] = useState(null) ;
    const [canClaim, setCanClaim] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);

    let timeInterval ;
    let timeInterval2 ;
    const [modal, setModal] = useState(false);
    const [bidModal, setBidmodal] = useState(false);

    const toggle = () => setModal(!modal);
    const bidToggle = () => setBidmodal(!bidModal);
    const [tokenAddress,settokenAddress] = useState(null) ;

    useEffect(() => {
        if(window.ethereum){
            web3Provider  = window.ethereum;
          }
          else{
            web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
           
          }
     
          init() ;
 
        },[wallet.account])
        useEffect(() => {
          clearInterval(timeInterval);
          if(bidStatus == 1){
            timeInterval = setInterval(() => {
                getTimer() ;          
                
            }, 1000); 
          }
            },[bidStatus]);

            
        const init = async () => {
            let _web3 = new Web3(web3Provider);
             let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
             let _trade =  await _marketPlaceContract.methods.getTrade(props.tradeid).call() ;
             let _fullTrade =  await _marketPlaceContract.methods.getFullTrade(props.tradeid).call() ;
             let _token = _fullTrade[5];
             settokenAddress(_token);
             let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_token);
             let _symbol = await _tokenContract.methods.symbol().call() ;
             setSymbol(_symbol);
             let _nftToken =  _trade.nftadd    ;
             let _nftTokenId =  _trade.nftid    ;
             let _nftContract = new _web3.eth.Contract(NFT_ABI,_nftToken);
             let _mediaURI = await _nftContract.methods.tokenURI(_nftTokenId).call() ;
            //  alert(_image)

             let _NFTname = await _nftContract.methods.symbol().call() ;
             try{
              // let _mediaURI  = _mediaURI.image ; 
              if(_mediaURI.includes("https://ipfs.infura.io/") ){
            //  alert("found")
            _mediaURI = _mediaURI.replace("https://ipfs.infura.io/" , "https://wizard.infura-ipfs.io/") 
           }
              if(_mediaURI.includes("ipfs://")){
                  //  alert("found")
                  _mediaURI = _mediaURI.replace("ipfs://" , "https://wizard.infura-ipfs.io/ipfs/") 
                 }
              _mediaURI = await fetch(_mediaURI) ;
              _mediaURI = await _mediaURI.json() ;

              let _image  = _mediaURI.image ; 
              // alert(_image)
              if(_image.includes("https://ipfs.infura.io/") ){
            //  alert(_image)
            _image = _image.replace("https://ipfs.infura.io/" , "https://wizard.infura-ipfs.io/") 
           }
              if(_image.includes("ipfs://")){
                  //  alert("found")
                  _image = _image.replace("ipfs://" , "https://wizard.infura-ipfs.io/ipfs/") 
                 }
                //  console.log(_image)
              setMedia(encodeURI(_image));
              
             }
             catch{
               
             }
          
            //  alert(encodeURI(_mediaURI.image))
            //  let _media = await getBase64FromUrl(_mediaURI)  ;
             setHighestBidder(_trade.highestBidder); 
             
               let _statusF =  await _marketPlaceContract.methods.getFullTrade(props.tradeid).call() ;
               if(_statusF[8]){

             let _status =  await _marketPlaceContract.methods.getAuctionStatus(props.tradeid).call() ;
             setBidStatus(_status)
               }
               else{
             setBidStatus(4)

               }
               setLister(_statusF.lister)
             let _bidIncreasePercentage =  await _marketPlaceContract.methods.bidIncreasePercentage().call() ;
             setBidIncreasePercentage(_bidIncreasePercentage);

             let _likes =  await _marketPlaceContract.methods.likes(props.tradeid).call() ;
             setLikes(_likes);

           
 

            //  setMedia(_media.toDataURL());
            //  setMedia(_media);
             let _name = _trade.title  ; 
            //  setName(_name); 
             setName(_name == "" ?  _mediaURI.name ? _mediaURI.name : _NFTname : _name )
             let _decimals = await _tokenContract.methods.decimals().call() ;
             setDecimals(_decimals);
             setPrice(_trade.startingPrice/1e1 ** _decimals); 

             let _highestBid = parseFloat(_trade.maxbid/1e1 ** _decimals).toFixed(2);
             setHighestBid(_highestBid);

             setBuyer(_trade.buyer)
             let _minimumBid = parseFloat(parseFloat(_highestBid) + parseFloat(_highestBid * _bidIncreasePercentage / 100 )).toFixed(2) ;
             setMinimumBid(_minimumBid)

             if(wallet.account){
               
              let _liked =  await _marketPlaceContract.methods.likesMap(props.tradeid,wallet.account).call() ;
              console.log(props.tradeid);
              console.log(_liked);
             setLiked(_liked);

             let _balance = await _tokenContract.methods.balanceOf(wallet.account).call() ;
             _balance = parseFloat(_balance/1e1 ** _decimals).toFixed(2);
             setBalance(_balance)

                let _approval = await _tokenContract.methods.allowance(wallet.account,MARKETPLACE).call() ;  
                setApproval(_approval) 

              let _canClaim =  await _marketPlaceContract.methods.claim(props.tradeid,wallet.account).call() ;
              setCanClaim(_canClaim)
              let _userBid =  await _marketPlaceContract.methods.getBid(props.tradeid,wallet.account).call() ;
              _userBid = parseFloat(_userBid/1e1 ** _decimals).toFixed(2);
              setUserbid(_userBid)


             }
        }
 
        const handleDepositChange = (e) => {
          setDepositAmount(e.target.value) ;
          setdAmount(e.target.value) ;
      
      }

      async function setMaxDeposit(){


          setdAmount(balance*0.99)
          setDepositAmount(balance*0.99)
      }
        
      
  
async function placeBid(){
  setDepositError(false);
  let _amount = parseFloat(depositAmount) ;

  if(_amount+parseFloat(userbid)  < minimumBid  ){
    setDepositError('Bid must be at least '+bidIncreasePercentage+'% higher than highest bid. Suggested Bid: '+(minimumBid)+' '+symbol+'');
    return false;
}

  if(_amount+parseFloat(userbid) <= highestBid  && highestBidder != wallet.account){
      setDepositError('Please bid amount higher than your last bid.');
      return false;
  }

  



  if(balance <= 0 ||  (_amount-parseFloat(userbid)) > balance ){
      setDepositError('Insufficient Balance. Please fund your wallet with some '+symbol+' Token and try again.');
      return false;
  }

  if(_amount <= 0 || _amount == ""){
      setDepositError('Invalid Deposit Amount. Please enter a valid amount greater than 0.');
      return false;
  }



  let _web3 = new Web3(web3Provider);
  const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);


  _amount = _web3.utils.toWei(_amount.toString()) ;
 
  setModal(!modal);
  _marketPlaceContract.methods.placeBid(props.tradeid ,_amount).send({
      from: wallet.account
  }).on('receipt', function(receipt){
      setModal(modal);
      init() ;
      bidToggle() ;
  }).on('error', function(receipt){
      setModal(modal);

  })
  
}




async function buyNft(){

  let _web3 = new Web3(web3Provider);
  const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);

  setModal(!modal);
  _marketPlaceContract.methods.buyNft(props.tradeid).send({
      from: wallet.account
  }).on('receipt', function(receipt){
      setModal(modal);
      init() ; 
  }).on('error', function(receipt){
      setModal(modal);

  })
  
}
async function claimBid(){

    let _web3 = new Web3(web3Provider);
    const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
 
    setModal(!modal);
    _marketPlaceContract.methods.withdraw(props.tradeid).send({
        from: wallet.account
    }).on('receipt', function(receipt){
        setModal(modal);
        init() ; 
    }).on('error', function(receipt){
        setModal(modal);

    })
    
}


        const getTimer = async () => {
          let _web3 = new Web3(web3Provider);
          let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
          let _tradeTime =  await _marketPlaceContract.methods.getAuctionTime(props.tradeid).call() ;
          let _now = new Date().getTime() / 1e3 ;

          if(_tradeTime._endtime > _now){
              let remainingSeconds = _tradeTime._endtime - _now ;
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
              let _endTime ;
              if(remainingSeconds <= 0){
                  _endTime = "Ended" ;
                  setEndTime(_endTime);    
          
              }
              else if(remainingDay > 0){
                  _endTime = remainingDay+"d : "+remainingHour+"h : "+remainingMinutes+"m";
                  setEndTime(_endTime);
              
              }
              else{
                  _endTime = remainingHour+"h : "+remainingMinutes+"m : "+remainingSec+"s";
                  setEndTime(_endTime);
              }
          }
      }

      
      
      
      async function unLikeTrade(){
        let _web3 = new Web3(web3Provider);
     
        setModal(!modal);
     
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
  
        _marketPlaceContract.methods.unLike(props.tradeid).send({from: wallet.account}).on('receipt', function(receipt){
            init();          
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }

      async function likeTrade(){
        let _web3 = new Web3(web3Provider);
     
        setModal(!modal);
     
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
  
        _marketPlaceContract.methods.like(props.tradeid).send({from: wallet.account}).on('receipt', function(receipt){
            init();          
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }

      async function approveToken(){
        let _web3 = new Web3(web3Provider);
     
        setModal(!modal);
     
        const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,tokenAddress);
        const _amount = _web3.utils.toWei('10000000000000000000000') ;
        _tokenContract.methods.approve(MARKETPLACE,_amount).send({from: wallet.account}).on('receipt', function(receipt){
            init();          
             setModal(modal);
    
        })
      
        .on('error', function(error, receipt) {
        setModal(modal);
            
        });
           
    }
    
    
        const getBase64FromUrl = async (url) => {
            const data = await fetch(url);
            const blob = await data.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob); 
              reader.onloadend = () => {
                const base64data = reader.result;   
                resolve(base64data);
              }
            });
          }
		return(
  
						<div className="col-lg-3">
              <div class="product-list">
						<a href={"/product/"+props.tradeid}>

                {
                  media == null || media.includes('data:text/html;') ?
                     <div class="product-img" >
              {/* <img src={media} /> */}
          </div>                      
              :
                <div class="product-img" style={{backgroundImage : 'url('+media+')'}}>
                  {/* <img src={media} /> */}
              </div>     
                }
                
             </a>
              <div class="product-content">
              <div className="d-flex w-100 justify-content-between">
                  <h4 className=""><a href={"/product/"+props.tradeid}>{name}</a></h4>
                  <span className="p-1">
                    {
                      liked ?
                  <i className="fa fa-heart liked clickable" onClick={unLikeTrade} ></i>
                  :
                  <i className="fa fa-heart clickable" onClick={likeTrade} ></i> 
                    }
                    {likes}
                  </span>

                  </div>
                  <div className="wrp-busd">
                      <div className="busd-child1 pb-1">
                        <h5>{price} {symbol}</h5>
                      </div>
                      <div className="busd-child2">
                        <p>{bidStatusName[bidStatus]}</p>
                      </div>
                  </div>
                  <div className="more-detail">
                    {
                  bidStatus != 4 && 
                    <ul className="m-0">
                      <li className="d-flex justify-content-between"><p className="title font-weight-bold">Highest Bid</p> <p className="value  ">{highestBid} {symbol}</p> </li>
                      <li className="d-flex justify-content-between"><p className="title font-weight-bold">Your Bid</p> <p className="value  ">{userbid} {symbol}</p> </li>
                      {
                       
                        endTime != 0   ?
                      <li className="d-flex justify-content-between"><p className="title font-weight-bold">Ends In</p> <p className="value  ">{endTime}</p> </li>
                      :
                        highestBidder == lister ?
                      <li className="d-flex justify-content-between"><p className="title font-weight-bold">Expired</p> </li>
                      :
                      <li className="d-flex justify-content-between"><p className="title font-weight-bold">Sold Out</p> </li>
                     
                      }

                    </ul>
}
                    </div>
                   

                    {wallet.account &&  bidStatus == 1 &&
                        <button class="x-product-place-bid-button" onClick={bidToggle} >Place Bid</button>                        
                        }
                           {wallet.account &&  bidStatus == 4 && approval > 0 &&
                        <button class="x-product-place-bid-button" onClick={buyNft} >Buy Now</button>                        
                        }
                          {wallet.account &&  bidStatus == 4 && approval == 0 &&
                        <button class="x-product-place-bid-button" onClick={approveToken} >Approve to Buy</button>                        
                        }
                         {!wallet.account &&
                         <div className="mt-3 text-center"  >
                        <ConnectButton  />      
                        </div>                  
                        }
                          {wallet.account && !canClaim && bidStatus == 3 && highestBidder == wallet.account && buyer == null && 
                        <button class="x-product-place-bid-button" onClick={claimBid} >Claim</button>                        
                       
                        }
                          {wallet.account && !canClaim && userbid > 0 && bidStatus == 3 && highestBidder != wallet.account &&
                        <button class="x-product-place-bid-button" onClick={claimBid} >Withdraw</button>                        
                       
                        }
              </div>
              </div>
            
             
   <Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>

 <Modal isOpen={bidModal} toggle={bidToggle}  centered={true}>

 
<ModalBody>
        
   <div className="moveRight">
       
       <span> 
          Your Balance<br />
          {balance} {symbol}
       </span>
   </div>
  <label><br />Enter Bid Amount <span className="maxButton ml-2 p-2" onClick={setMaxDeposit}>Max</span></label>
  <input className="form-control" onChange={handleDepositChange} type="text" value={damount} />
  
    {
      parseFloat(damount) > userbid &&
    <h5 className="info font-size-large" >Your Deduction: {damount-userbid}</h5>
    }

  {
      depositError &&
      <span className="error">{depositError}</span>
  }


  
 
</ModalBody>
<ModalFooter>
    {
       ( approval == 0 || approval < damount*decimals) &&
       <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button>
    }
    {
       ( approval > 0 && approval >= damount*decimals) &&
       <Button className="depositButton mr-3" onClick={placeBid}>Bid Now</Button>

    }
  <Button className="depositButton" onClick={bidToggle}>Cancel</Button>
</ModalFooter>
</Modal>

						</div>
		 
		);
 

}
export default ExploreSingle;