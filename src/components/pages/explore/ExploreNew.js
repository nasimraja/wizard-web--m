import React, { Component } from 'react';
import $ from "jquery";
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import Header from '../header.js';
import Footer from '../footer.js';
import Config, { MARKETPLACE } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import NFT_ABI from '../../../Config/NFT_ABI.json';
import Web3 from "web3"
import { useState , useEffect} from 'react';
import ExploreSingle from './ExploreSingle.js';
import useWallet from '@binance-chain/bsc-use-wallet'
import NftSingle from './NftSingle'
import axios from "axios";

const ExploreNew = () => {
    let web3Provider  = window.ethereum ; 
    const wallet = useWallet();
    const [counter,setCounter] = useState([]) ; 
    const [olimit,setolimit] = useState(20) ;
    const [oloading,setoLoading] = useState(false) ;
    const [slimit,setslimit] = useState(20) ;
    const [sloading,setsLoading] = useState(false) ;
    const [mlimit,setmlimit] = useState(20) ;
    const [mloading,setmLoading] = useState(false) ;
    const [climit,setclimit] = useState(20) ;
    const [cloading,setcLoading] = useState(false) ;
    const [ilimit,setilimit] = useState(20) ;
    const [iloading,setiLoading] = useState(false) ;
    const [dlimit,setdlimit] = useState(20) ;
    const [dloading,setdLoading] = useState(false) ;
    const [importnftAddress,setimportnftAddress] = useState(null) ;
    const [importnftId,setImportnftId] = useState(null) ;
    const [importedNfts,setImportedNfts] = useState([]) ;
    
    const [importError,setImportError] = useState(null) ;
    const [apiModal, setApiModal] = useState(false);
    const apiToggle = () => setApiModal(!apiModal);
    
    const [importModal, setImportModal] = useState(false);
    const importToggle = () => setImportModal(!importModal);

    let _acounter = 0 ;
    let _bcounter = 0 ;
    let _ccounter = 0 ;
    let _dcounter = 0 ;
    let _icounter = 0 ;

    const [userBids,setUserBids] = useState([]) ;
    const [userNfts,setUserNfts] = useState([]) ;
    const [nftAddress,setnftAddress] = useState(null) ;
    const [saleArray,setSaleArray] = useState([]) ;
    const [soldArray,setSoldArray] = useState([]) ;
    const [instantArray,setInstantArray] = useState([]) ;
    
 

    
    useEffect(() => {

      $('.tabs6').on('click','a',function(e){
        e.preventDefault();
        var tabId = $(this).attr('data-tab');
        $(this).closest('.tabs6').find('a').removeClass('active');
        $(this).addClass('active');
        $('.tab-panel').removeClass('active');
        $('#'+tabId).addClass('active');
      });
  

    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
       
      }
 
      init() ;
      if(wallet.account){
        getCollection() ;
        getImportedCollection();
      }
    
    },[wallet.account])

    useEffect(() => {
      console.log(counter);
      _acounter = 0;
      _bcounter = 0;
      _ccounter = 0;
      _dcounter = 0;

      getAllStatus();

  },[])

    const init = async () => {
        let _web3 = new Web3(web3Provider);
         let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
         let _count =  await _marketPlaceContract.methods.getTradeCount().call() ;
         console.log(_count);
          let rows = [];
         for (let i = 0; i < _count; i++) {
          rows.push({count : 1}) ;
         }
        //  alert(rows);
         setCounter(rows); 


         if(wallet.account){
           let _userBids = await _marketPlaceContract.methods.getAuctionsOfUser(wallet.account).call() ;
           setUserBids(_userBids);           
         }

    }


    const getImportedCollection = async () => {
      // let _user = "0x4D1294c48EaCF4D5242e68509D2703117B6440B4"
      let _user = wallet.account ; 
      let _web3 = new Web3(web3Provider);
      
      let _getURI = "https://dev.wizard.financial/api/getnftuser/"+_user ; 
      let _imported = await fetch(_getURI) ;
      _imported = await _imported.json() ;
      if(_imported.result == "success"){
        let userTokens = [] ;
        console.log(_imported.data)

       _imported.data.map(async(v,i) => {
       let _nftContract = new _web3.eth.Contract(NFT_ABI,v.nft);
         let _userBalance = await _nftContract.methods.balanceOf(_user).call() ;
        console.log(_userBalance);
         for(let j = 0 ; j < _userBalance; j++){
          let _userToken = await _nftContract.methods.tokenOfOwnerByIndex(_user,j).call() ;
            userTokens.push({"nft" : v.nft , "nftId" :  _userToken});
            

         }
          console.log(userTokens)
         if(i == (_imported.data.length-1)){
          setImportedNfts(userTokens);           

        }

      });


      }

   




      //  let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
      //  let _nftAddress =  await _marketPlaceContract.methods.nftAddress().call() ;
      //  let _nftContract = new _web3.eth.Contract(NFT_ABI,_nftAddress);
 
      //  setnftAddress(_nftAddress)
      //  if(wallet.account){

      //  }

  }

    const getCollection = async () => {
      let _web3 = new Web3(web3Provider);
       let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
       let _nftAddress =  await _marketPlaceContract.methods.nftAddress().call() ;
       let _nftContract = new _web3.eth.Contract(NFT_ABI,_nftAddress);
 
       setnftAddress(_nftAddress)
       if(wallet.account){
         let _userBalance = await _nftContract.methods.balanceOf(wallet.account).call() ;
         let userTokens = [] ;

         for(let i = 0 ; i < _userBalance; i++){
          let _userToken = await _nftContract.methods.tokenOfOwnerByIndex(wallet.account,i).call() ;
            userTokens.push(_userToken);
            if(i == (_userBalance-1)){
               setUserNfts(userTokens);           
            }

         }
       }

  }


    const getStatus =  async (tradeid) => {
      let _web3 = new Web3(web3Provider);
       let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
        let _status =  await _marketPlaceContract.methods.getAuctionStatus(tradeid).call() ;
      // let _status = 1 ;
      console.log(_status);
       return  _status ;
         

  }

  
  const getAllStatus =  async () => {
    // let _web3 = new Web3(web3Provider);
    //  let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
    //  let _count =  await _marketPlaceContract.methods.getTradeCount().call() ;

    //  let onsale = [];
    //  let sold = [];
    //  let instant = [];
    // //  let c = 0 ;
    // for(let i = 0 ; i < _count ; i++ ) {

    //   let _statusF =  await _marketPlaceContract.methods.getFullTrade(i).call() ;
    //   console.log(_statusF)
    //   if(_statusF[8]){
    //     let _status =  await _marketPlaceContract.methods.getAuctionStatus(i).call() ;
    //     if(_status == 1){
    //       onsale.push(i);
    //     }
    //     else{
    //       if(_statusF.lister != _statusF.buyer){
    //         sold.push(i);
    //       }
    //     }
    //     // console.log(i);
        
    //   }
    //   else if(_statusF[6] == '0x0000000000000000000000000000000000000000' ){
        
    //     instant.push(i)
    //   }
    //   if(i == (_count-1)){
    //     console.log(onsale);
    //     // console.log(sold);
    //     setSaleArray(onsale);
    //     setSoldArray(sold);
    //     setInstantArray(instant);
    //     // console.log(soldArray);
    //     // console.log(saleArray);
    //   }
    //  }
 
    let _getURI = "https://address-marketplace.herokuapp.com/api/marketplace/wizard" ; 
    let _imported = await fetch(_getURI) ;
    _imported = await _imported.json() ;
    _imported =_imported[0];
    console.log(_imported.sold.split(','))
      if(_imported.onsale != ""){
        setSaleArray(_imported.onsale.split(','));
      }
        if(_imported.sold != ""){
          setSoldArray(_imported.sold.split(','));
          // console.log(soldArray);
        }
        if(_imported.instant != ""){
          setInstantArray(_imported.instant.split(','));

        }
       

}


useEffect(() => {

},[saleArray])
  
    
  const oloadmore = () => {
    setoLoading(true);
      setolimit(olimit+20)
      setTimeout(() => {
    setoLoading(false);
        
      }, 3000);
  }
    const sloadmore = () => {
      setsLoading(true);
        setslimit(slimit+20)
        setTimeout(() => {
      setsLoading(false);
          
        }, 3000);
    }
    const mloadmore = () => {
      setmLoading(true);
        setmlimit(mlimit+20)
        setTimeout(() => {
      setmLoading(false);
          
        }, 3000);
    }

    const cloadmore = () => {
      setcLoading(true);
        setclimit(climit+20)
        setTimeout(() => {
      setcLoading(false);
          
        }, 3000);
    }
    const iloadmore = () => {
      setiLoading(true);
        setilimit(ilimit+20)
        setTimeout(() => {
      setiLoading(false);
          
        }, 3000);
    }

    const dloadmore = () => {
      setdLoading(true);
        setdlimit(dlimit+20)
        setTimeout(() => {
      setdLoading(false);
          
        }, 3000);
    }

    
    const handleNFTId = async (e) => {
      let _web3 = new Web3(web3Provider);

      setImportnftId(e.target.value);
      if(importnftAddress != ""){
        try {
        let _nftContract = new _web3.eth.Contract(NFT_ABI,e.target.value);
  
          let _mediaURI = await _nftContract.methods.tokenURI(0).call() ;  
          if(_mediaURI == "" || _mediaURI == null){
            setImportError("NFT is not compatible.");
          }
          else{
            setImportError(null);
  
          }
  
        }
        catch(e){
          setImportError("NFT is not compatible.");
  
        }
      }
    }

    const handleNFTAddress = async (e) => {
      let _web3 = new Web3(web3Provider);
      setimportnftAddress(e.target.value);

      if(importnftId != ""){
      try {
      let _nftContract = new _web3.eth.Contract(NFT_ABI,e.target.value);

        let _mediaURI = await _nftContract.methods.tokenURI(0).call() ;  
        if(_mediaURI == "" || _mediaURI == null){
          setImportError("NFT is not compatible.");
        }
        else{
          setImportError(null);

        }

      }
      catch(e){
        setImportError("NFT is not compatible.");

      }
    }
      
    }

    const importTokens = () => {
      var formData = new FormData();
      formData.append("user", wallet.account);
      formData.append("nft", importnftAddress); 
      setApiModal(true) ;
      axios 
      .post("https://dev.wizard.financial/api/addnftuser", formData
        ) 
      .then((response) => {
        if(response.data.result == "success"){
          setImportModal(false)
          setApiModal(false) ;
          getImportedCollection();

        }
        else{
          setApiModal(false) ;
          setImportError("Error: "+response.data.message);
        }

      })
    }
    

    return(
      <div className="main-bg">
    
        
        <div className="container">
          <div className="row">
              <div className="col-lg-12">
                <section id="product-tips">
              
                <div className="main-marketplace">
                <div className="main-tab-box">
                <ul className="tabs6 mb-3" >
                <li class="tab-button"><a href="#" class="tab-link active" data-tab="onsale">Auction</a></li>
                  <li class="tab-button"><a href="#" class="tab-link" data-tab="onbuy">Fixed Price</a></li>
                  <li class="tab-button"><a href="#" class="tab-link" data-tab="soldout">Sold Out / Expired</a></li>
                  <li class="tab-button"><a href="#" class="tab-link" data-tab="mybids">My Bids</a></li>
                  <li class="tab-button"><a href="#" class="tab-link" data-tab="collection"> Your NFTs</a></li>
                  <li class="tab-button"><a href="#" class="tab-link" data-tab="imported"> Imported NFTs</a></li>

                </ul>
                <ul class="tabs5 pull-right">
                  {
                    wallet.account &&
                    <li ><a href={"/collection/"+wallet.account}  >Your Listings</a></li>
                  }
                </ul>
                </div>
              


                <div class="tab-pane mt-4">
                  <div className="tab-panel active" id="onsale">
                  <div className="row">
                 
                  {/* {saleArray.length}
                  {counter.length} */}

                  {
                    counter.length > 0 && saleArray.length > 0 && counter.map((v,i) => {
                      if(_acounter < olimit && $.inArray((counter.length -  (i+1)).toString(),saleArray) >= 0){
                        _acounter++ ;
                        return (
                          <ExploreSingle tradeid={(counter.length -  (i+1))}   />
                        ) 
                          }
                          else{
                            if(saleArray.length == 0  && _acounter == 0 && (i == counter.length - 1))
                            return (
                              <div className="text-center w-100 m-0 p-5  card cards2">
                                  <h3>No Auction Available</h3>
                                </div>
                            )
                          }
                  })}


{
                    saleArray.length == 0 &&
                
                    <div className="text-center w-100 m-0 p-5  card  cards2" >
                                    <h3>No Auction Available</h3>
                                </div>
                        
                    }

                    </div>
             
                  {
                saleArray.length > olimit         &&     
              <div className="loadmore-btn">
              < button type="button" className={oloading ? "loading action-btn" : "action-btn"}   onClick={oloadmore} id="login-btn">Load more</button>
              </div>
              }
                  </div>
                  <div class="tab-panel row" id="onbuy">
                   <div className="row">
                  {
                    counter.length > 0 && instantArray.length > 0 && counter.map((v,i) => {
                      // console.log(inArray(i,saleArray))
                      if(_dcounter < dlimit && $.inArray((counter.length -  (i+1)).toString(),instantArray) >= 0){
                        _dcounter++ ;
                        return (
                          <ExploreSingle tradeid={(counter.length -  (i+1))}   />
                        ) 
                          }
                          else{
                            if(instantArray.length == 0  && _dcounter == 0 && (i == counter.length - 1))
                            return (
                              <div className="text-center w-100 m-0 p-5  card cards2">
                                  <h3>No Auction Available</h3>
                                </div>
                            )
                          }
                  })}


{
                    instantArray.length == 0 &&
                
                    <div className="text-center w-100 m-0 p-5  card  cards2" >
                                    <h3>No Auction Available</h3>
                                </div>
                        
                    }

                 </div>
                  {
                instantArray.length > dlimit         &&     
              <div className="loadmore-btn">
              < button type="button" className={dloading ? "loading action-btn" : "action-btn"}   onClick={dloadmore} id="login-btn">Load more</button>
              </div>
              }
                  </div>
                  <div class="tab-panel row" id="soldout">
                   <div className="row">
                  {
               

               counter.length > 0 && soldArray.length > 0 &&  counter.map((v,i) => {
                 // console.log(soldArray);

                 if(_bcounter < slimit && $.inArray((counter.length -  (i+1)).toString(),soldArray) >= 0){
                   _bcounter++ ;
                   return (
                     <ExploreSingle tradeid={(counter.length -  (i+1))}   />
                   ) 
                     }
                     else{
                       if(soldArray.length == 0 && (i == counter.length - 1)){
                       return (
                         <div className="text-center w-100 m-0 p-5  card  cards2">
                             <h3>No Auction Available</h3>
                           </div>
                       )
                     }
                   }
             })}

{
               soldArray.length == 0 &&
           
               <div className="text-center w-100 m-0 p-5  card  cards2">
                            <h3>No Auction Available</h3>
                           </div>
                   
               }
               </div>
         
             {
           soldArray.length > slimit         &&     
         <div className="loadmore-btn">
         < button type="button" className={sloading ? "loading action-btn" : "action-btn"}   onClick={sloadmore} id="login-btn">Load more</button>
         </div>
         }
                  </div>
                  <div class="tab-panel" id="mybids">
                     <div className="row">
                 
                  {
                    userBids.length > 0 && userBids.map((v,i) => {
                      if(_ccounter< mlimit ){
                        _ccounter++ ;
                        return (
                          <ExploreSingle tradeid={v}   />
                        ) 
                          }
                          else{
                            return (
                              <div className="text-center w-100 m-0 p-5  card cards2">
                                 <h3>No Bids Available</h3>
                                </div>
                            )
                          }
                  })}
                  {
                    userBids.length == 0 &&
                
                    <div className="text-center w-100 m-0 p-5  card  cards2">
                                 <h3>No Bids Available</h3>
                                </div>
                        
                    }
</div>
                 
                  {
                userBids.length > mlimit         &&     
              <div className="loadmore-btn">
              < button type="button" className={mloading ? "loading action-btn" : "action-btn"}   onClick={mloadmore} id="login-btn">Load more</button>
              </div>
              }
                  </div>

                  <div class="tab-panel" id="collection">
                    
                  <div className="row">
                
                  
                  {
                    userNfts.length > 0 && userNfts.map((v,i) => {
                       if(i< climit ){
                        return (
                          <NftSingle nftid={v} nftAddress={nftAddress} imported={false}  />
                        ) 
                          }
                          else{
                            return (
                              <div className="col-lg-12  cards2">
                                  <h3>No Collection Available</h3>
                              
                                </div>
                            )
                          }
                  })}
 {
                    userNfts.length == 0 &&
                
                    <div className="text-center w-100 m-0 p-5  card  cards2">
                                 <h3>No Collection Available</h3>
                                </div>
                        
                    }
               </div>
                  {
                userNfts.length > climit         &&     
              <div className="loadmore-btn">
              < button type="button" className={cloading ? "loading action-btn" : "action-btn"}   onClick={cloadmore} id="login-btn">Load more</button>
              </div>
              }
                  </div>

                  <div class="tab-panel" id="imported">
                     <div className="row">
                    <div className="col-lg-12">
                      <div className="d-flex justify-content-end">
                        <button className="mb-3" className="importBtn" onClick={importToggle}>Import Other NFTs</button>
                      </div>
                      </div>
                      </div>
                     <div className="row">

                    {
                      importedNfts.length > 0 && importedNfts.map((v,i) => {
                         if(i< ilimit ){
                          return (
                            <NftSingle nftid={v.nftId} nftAddress={v.nft} imported={true}  />
                          ) 
                            }
                           
                    })}
   {
                      importedNfts.length == 0 &&
                  
                      <div className="text-center w-100 m-0 p-5  card  cards2">
                                   <h3>No Imported Collection Available</h3>
                                  </div>
                          
                      }
                      </div>
             
                    {
                  importedNfts.length > ilimit         &&     
                <div className="loadmore-btn">
                < button type="button" className={iloading ? "loading action-btn" : "action-btn"}   onClick={iloadmore} id="login-btn">Load more</button>
                </div>
                }
                    </div>


                </div>
                </div>
                  
                </section>
              </div>
          </div>
        </div>

        <Modal isOpen={apiModal} toggle={apiToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4 pb-3" >Saving NFT Media and Creating Meta... <br />Do not Close Tab/Window or reload</div>      

   </ModalBody>
 
 </Modal>
        
 <Modal isOpen={importModal} toggle={importToggle}  centered={true}>

 
<ModalBody>
        
 
  <label>Paste NFT Address </label>
  <input className="form-control mb-1" onChange={handleNFTAddress} type="text"   />
              {
                importError && 
                <p className="text-dark">
                    Error: {importError}
                </p>
              }
              {
                !importError && importnftAddress != null && 
                <p className="text-dark">
                    Success: NFT is compatible.
                </p>
              }
 

  
 
</ModalBody>
<ModalFooter>
   
       <Button className="depositButton mr-3" onClick={importTokens}  >Import</Button>
  
    
  <Button className="depositButton" onClick={importToggle}>Cancel</Button>
</ModalFooter>
</Modal>

       
      </div>
    );
 

}
export default ExploreNew;