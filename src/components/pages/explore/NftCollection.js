import React, { Component } from 'react';
import $ from "jquery";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { useParams } from "react-router-dom"

import Header from '../header.js';
import Footer from '../footer.js';
import Config, { MARKETPLACE, NFT_MAKER } from '../../../Config/index.js';
import NFT_MAKER_ABI from '../../../Config/NFT_MAKER_ABI.json';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';

import NFT_ABI from '../../../Config/NFT_ABI.json';
import Web3 from "web3"
import { useState, useEffect } from 'react';
import ExploreSingle from './ExploreSingle.js';
import useWallet from '@binance-chain/bsc-use-wallet'
import NftSingle from './NftSingle'
import axios from "axios";
import CollectionBanner1 from '../../images/CollectionBanner1.jpg';
import CollectionBanner2 from '../../images/CollectionBanner2.jpg';
import BigFootBanner from '../../images/BigFootBanner.jpg';
import BeyondtheMacros from '../../images/BeyondtheMacros.png';
import Blood from '../../images/Blood.png';
import Gluck from '../../images/Gluck.png';
import Nutrition from '../../images/Nutrition.png';
import PageLadder from '../../images/PageLadder-1.png';
import Reign from '../../images/Reign.png';
import Sabers from '../../images/Sabers.png';
import System from '../../images/System.png';
import BABA from '../../images/BabaBanner.png';
import Wolf from '../../images/Wolfde.png';
import DEAP from '../../images/DEAP.png';
import EIGHT from '../../images/EIGHT.png';
import LNB from '../../images/LNB.png';
import CustomHappy from '../../images/CustomHappy.png';

import EMCOTechnology from '../../images/EMCO Technology(1200x300).png';
import OGalchemist from '../../images/OG alchemist ( 1200x300).png';
import TheWealthSanctum from '../../images/The Wealth Sanctum(1200x800).jpg';


const NftCollection = () => {
  let web3Provider = window.ethereum;
  const wallet = useWallet();
  const { address } = useParams();
  const [counter, setCounter] = useState([]);
  const [olimit, setolimit] = useState(20);
  const [oloading, setoLoading] = useState(false);
  const [slimit, setslimit] = useState(20);
  const [sloading, setsLoading] = useState(false);
  const [mlimit, setmlimit] = useState(20);
  const [mloading, setmLoading] = useState(false);
  const [climit, setclimit] = useState(20);
  const [cloading, setcLoading] = useState(false);
  const [ilimit, setilimit] = useState(20);
  const [iloading, setiLoading] = useState(false);
  const [dlimit, setdlimit] = useState(20);
  const [dloading, setdLoading] = useState(false);
  const [importnftAddress, setimportnftAddress] = useState(null);
  const [importnftId, setImportnftId] = useState(null);
  const [importedNfts, setImportedNfts] = useState([]);

  const [importError, setImportError] = useState(null);
  const [apiModal, setApiModal] = useState(false);
  const apiToggle = () => setApiModal(!apiModal);

  const [importModal, setImportModal] = useState(false);
  const importToggle = () => setImportModal(!importModal);

  let _acounter = 0;
  let _bcounter = 0;
  let _ccounter = 0;
  let _dcounter = 0;
  let _icounter = 0;

  const [userBids, setUserBids] = useState([]);
  const [userNfts, setUserNfts] = useState([]);
  const [userCollectNfts, setUserCollectNfts] = useState([]);
  
  const [nftAddress, setnftAddress] = useState(null);
  const [saleArray, setSaleArray] = useState([]);
  const [soldArray, setSoldArray] = useState([]);
  const [instantArray, setInstantArray] = useState([]);

  const [nftName, setNftName] = useState(null);
  const [nftSymbol, setNftSymbol] = useState(null);

  


  useEffect(() => {

    $('.tabs6').on('click', 'a', function (e) {
      e.preventDefault();
      var tabId = $(this).attr('data-tab');
      $(this).closest('.tabs6').find('a').removeClass('active');
      $(this).addClass('active');
      $('.tab-panel').removeClass('active');
      $('#' + tabId).addClass('active');
    });


    if (window.ethereum) {
      web3Provider = window.ethereum;
    }
    else {
      web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)

    }

    init();
    if (wallet.account) {
    console.log("user Collection",1);
      
      getCollection();
      // getImportedCollection();
    }

  }, [wallet.account])

  useEffect(() => {
    console.log(counter);
    _acounter = 0;
    _bcounter = 0;
    _ccounter = 0;
    _dcounter = 0;
    getNft() ; 
    getAllStatus();

  }, [])
 const getNft = async () => {
  let _web3 = new Web3(web3Provider);

  let _nftContract = new _web3.eth.Contract(NFT_ABI, address);
  let _symbol = await _nftContract.methods.symbol().call();
  let _name = await _nftContract.methods.name().call();
  setNftName(_name);
  setNftSymbol(_symbol)
 }

 
  const init = async () => {
    let _web3 = new Web3(web3Provider);
    let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
    //  let _count =  await _marketPlaceContract.methods.getTradeCount().call() ;
    //  console.log(_count);
    //   let rows = [];
    //  for (let i = 0; i < _count; i++) {
    //   rows.push({count : 1}) ;
    //  }
    //  alert(rows);
    try {
      let _result = await fetch('https://address-marketplace.herokuapp.com/api/getbynftadd?nftAdr=' + address);
      _result = await _result.json();

      console.log(_result);
      setCounter(_result.Data);
    }
    catch {

    }

    if (wallet.account) {
      let _userBids = await _marketPlaceContract.methods.getAuctionsOfUser(wallet.account).call();
      setUserBids(_userBids);
    }

  }


  const getImportedCollection = async () => {
    // let _user = "0x4D1294c48EaCF4D5242e68509D2703117B6440B4"
    let _user = wallet.account;
    let _web3 = new Web3(web3Provider);

    let _getURI = "https://dev.wizard.financial/api/getnftuser/" + _user;
    let _imported = await fetch(_getURI);
    _imported = await _imported.json();
    if (_imported.result == "success") {
      let userTokens = [];
      console.log(_imported.data)

      _imported.data.map(async (v, i) => {
        let _nftContract = new _web3.eth.Contract(NFT_ABI, v.nft);
        let _userBalance = await _nftContract.methods.balanceOf(_user).call();
        console.log(_userBalance);
        for (let j = 0; j < _userBalance; j++) {
          let _userToken = await _nftContract.methods.tokenOfOwnerByIndex(_user, j).call();
          userTokens.push({ "nft": v.nft, "nftId": _userToken });


        }
        console.log(userTokens)
        if (i == (_imported.data.length - 1)) {
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
    // let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
    // let _nftAddress = await _marketPlaceContract.methods.nftAddress().call();
    // let _nftContract = new _web3.eth.Contract(NFT_ABI, _nftAddress);
    let _makerContract = new _web3.eth.Contract(NFT_MAKER_ABI, NFT_MAKER);
    // setnftAddress(_nftAddress);
    console.log("user Collection",1);

    if (wallet.account) {
      console.log("user Collection",1);

      let _collectionCount = await _makerContract.methods.getCollectionCount(wallet.account).call();
      console.log("user Collection",_collectionCount);
      let userCollections = [];
      for(let j = 0 ; j <  _collectionCount;j++){
        let _nft = await _makerContract.methods.usersNFts(wallet.account,j).call();
        let _nftCont = new _web3.eth.Contract(NFT_ABI, _nft);

        let _userBalance = await _nftCont.methods.balanceOf(wallet.account).call();
      
  
        for (let i = 0; i < _userBalance; i++) {
          let _userToken = await _nftCont.methods.tokenOfOwnerByIndex(wallet.account, i).call();
          userCollections.push([_nft,_userToken]);
          if (i == (_userBalance - 1) && j == (_collectionCount - 1)  ) {
            setUserCollectNfts(userCollections);
  
  
          }
        }
      }

      // let _userBalance = await _nftContract.methods.balanceOf(wallet.account).call();
      // let userTokens = [];

      // for (let i = 0; i < _userBalance; i++) {
      //   let _userToken = await _nftContract.methods.tokenOfOwnerByIndex(wallet.account, i).call();
      //   userTokens.push(_userToken);
      //   if (i == (_userBalance - 1)) {
      //     setUserNfts(userTokens);


      //   }

      // }
    }

  }


  const getStatus = async (tradeid) => {
    let _web3 = new Web3(web3Provider);
    let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
    let _status = await _marketPlaceContract.methods.getAuctionStatus(tradeid).call();
    // let _status = 1 ;
    console.log(_status);
    return _status;


  }


  const getAllStatus = async () => {
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

    let _getURI = "https://address-marketplace.herokuapp.com/api/marketplace/wizard";
    let _imported = await fetch(_getURI);
    _imported = await _imported.json();
    _imported = _imported[0];
    console.log(_imported.sold.split(','))
    if (_imported.onsale != "") {
      setSaleArray(_imported.onsale.split(','));
    }
    if (_imported.sold != "") {
      setSoldArray(_imported.sold.split(','));
      // console.log(soldArray);
    }
    if (_imported.instant != "") {
      setInstantArray(_imported.instant.split(','));

    }


  }


  useEffect(() => {

  }, [saleArray])


  const oloadmore = () => {
    setoLoading(true);
    setolimit(olimit + 20)
    setTimeout(() => {
      setoLoading(false);

    }, 3000);
  }
  const sloadmore = () => {
    setsLoading(true);
    setslimit(slimit + 20)
    setTimeout(() => {
      setsLoading(false);

    }, 3000);
  }
  const mloadmore = () => {
    setmLoading(true);
    setmlimit(mlimit + 20)
    setTimeout(() => {
      setmLoading(false);

    }, 3000);
  }

  const cloadmore = () => {
    setcLoading(true);
    setclimit(climit + 20)
    setTimeout(() => {
      setcLoading(false);

    }, 3000);
  }
  const iloadmore = () => {
    setiLoading(true);
    setilimit(ilimit + 20)
    setTimeout(() => {
      setiLoading(false);

    }, 3000);
  }

  const dloadmore = () => {
    setdLoading(true);
    setdlimit(dlimit + 20)
    setTimeout(() => {
      setdLoading(false);

    }, 3000);
  }


  const handleNFTId = async (e) => {
    let _web3 = new Web3(web3Provider);

    setImportnftId(e.target.value);
    if (importnftAddress != "") {
      try {
        let _nftContract = new _web3.eth.Contract(NFT_ABI, e.target.value);

        let _mediaURI = await _nftContract.methods.tokenURI(0).call();
        if (_mediaURI == "" || _mediaURI == null) {
          setImportError("NFT is not compatible.");
        }
        else {
          setImportError(null);

        }

      }
      catch (e) {
        setImportError("NFT is not compatible.");

      }
    }
  }

  const handleNFTAddress = async (e) => {
    let _web3 = new Web3(web3Provider);
    setimportnftAddress(e.target.value);

    if (importnftId != "") {
      try {
        let _nftContract = new _web3.eth.Contract(NFT_ABI, e.target.value);

        let _mediaURI = await _nftContract.methods.tokenURI(0).call();
        if (_mediaURI == "" || _mediaURI == null) {
          setImportError("NFT is not compatible.");
        }
        else {
          setImportError(null);

        }

      }
      catch (e) {
        setImportError("NFT is not compatible.");

      }
    }

  }

  const importTokens = () => {
    var formData = new FormData();
    formData.append("user", wallet.account);
    formData.append("nft", importnftAddress);
    setApiModal(true);
    axios
      .post("https://dev.wizard.financial/api/addnftuser", formData
      )
      .then((response) => {
        if (response.data.result == "success") {
          setImportModal(false)
          setApiModal(false);
          // getImportedCollection();

        }
        else {
          setApiModal(false);
          setImportError("Error: " + response.data.message);
        }

      })
  }

  let details = [];
  details['0x4D1294c48EaCF4D5242e68509D2703117B6440B4'] = {
    name: "Wizard Official",
    banner: CollectionBanner2
  };

  details['0xA42d1FeC93C1f4aE99703b27f239346B38fCE36A'] = {
    name: "BigFoot",
    banner: BigFootBanner
  };

  details['0x4D1294c48EaCF4D5242e68509D2703117B6440B4'] = {
    name: "Magic Boxes",
    banner: CollectionBanner1
  };

  details['0x4054ae4f4C5db663E38FfeBc5B4aE14383B9be59'] = {
    name: "Beyond Macros",
    banner: BeyondtheMacros
  };
  details['0xE7d93EB6bF80c0E44B8AC7d119686b71d2AD6DaA'] = {
    name: "Custom Happy",
    banner: CustomHappy
  };

  details['0x65726303Fdc3932c4eB90f62f41f139D100797bC'] = {
    name: "PageLadder Inc",
    banner: PageLadder
  };
  details['0xaab2Be0b3Fd73b6bDF509C50c434FC0b2b1CEe89'] = {
    name: "Nutrition Dynamic",
    banner: Nutrition
  };
  details['0x60150e683C081c113ff776f16096F1a3CB064e05'] = {
    name: "Gluck Walrath LLP",
    banner: Gluck
  };
  details['0x1926f0fd85CF2eC6B93dD9392e04FC337209Ae47'] = {
    name: "San Diego SabersSD Sabres",
    banner: Sabers
  };
  details['0x8A83dce4bb96548499fd2aAf45F0c2Ef6d9Af063'] = {
    name: "Junior Reign",
    banner: Reign
  };
  details['0x6127c6180A5Dd538ab224f4179FC76eD56268AD6'] = {
    name: "Systems By Design",
    banner: System
  };
  details['0xB7aFA8475c4B08D8eb37320EC54a53732013872D'] = {
    name: "The Great Baba",
    banner: BABA
  };
  details['0xf6237d61a59a8bC87e46Ea2341d96E1E32424B8d'] = {
    name: "Wolf Den",
    banner: Wolf
  };

  details['0x3707B21D7E3cbf338849C2E8C6D50670445ce83B'] = {
    name: "DEAP",
    banner: DEAP
  };
  details['0x93f25B36Ba668a66927b233F0263D7d5CC0ef03F'] = {
    name: "8IGHT",
    banner: EIGHT
  };
  details['0x903BC3810E404E71C479A4E53bFb415c433b026c'] = {
    name: "LNB FUND",
    banner: LNB
  };
  details['0x52d5F5e14d0a23F1ab36D741aBd675C9D8477362'] = {
    name: "EMCO Technology",
    banner: EMCOTechnology
  };
  details['0xf7C86d64995471ce7cae19DcE391532071b71B8A'] = {
    name: "OG alchemist",
    banner: OGalchemist
  };
  details[' 0x140Ade6442f2F60A357E9B272047f7Af520B2453'] = {
    name: "The Wealth Sanctum",
    banner: TheWealthSanctum
  };
  return (
    <div className="main-bg">


      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <section id="product-tips">
              {
                details[address] &&
                <img src={details[address].banner} style={{ width: "100%", height: "300px", marginBottom: "10px" }} />
              }
              <div className="tabs-btn">
              <h3>{nftName} ({nftSymbol}) Collection</h3>
              
                <ul class="tabs05 pull-right">
                  {
                    <li ><a href="/profile"  >Your Profile</a></li>
                  }
                </ul>
                </div>
            
              <small className="small-text">Newly NFT listed might take one minute to show.</small>
              <div className="main-marketplace">
                <div className="main-tab-box">
                  <ul className="tabs6 mb-3" >
                    <li class="tab-button"><a href="#" class="tab-link active" data-tab="onsale">Auction</a></li>
                    <li class="tab-button"><a href="#" class="tab-link" data-tab="onbuy">Fixed Price Sale</a></li>
                    <li class="tab-button"><a href="#" class="tab-link" data-tab="soldout">Sold Out / Expired</a></li>
                    <li class="tab-button"><a href="#" class="tab-link" data-tab="collection">Collection</a></li>
                    {/* <li class="tab-button"><a href="#" class="tab-link" data-tab="mybids">My Bids</a></li>
                  <li class="tab-button"><a href="#" class="tab-link" data-tab="collection"> Your NFTs</a></li>
                  <li class="tab-button"><a href="#" class="tab-link" data-tab="imported"> Imported NFTs</a></li> */}

                  </ul>
                  <ul class="tabs5 pull-right">
                    <li ><a href="/single"  >Create</a></li>
                  </ul>
                </div>



                <div class="tab-pane mt-4">
                  <div className="tab-panel active" id="onsale">
                    <div className="row">

                      {/* {counter.length} */}

                      {
                        counter.length > 0 && saleArray.length > 0 && counter.map((v, i) => {
                          if (_acounter < olimit && $.inArray(v.id.toString(), saleArray) >= 0) {
                            _acounter++;
                            return (
                              <ExploreSingle tradeid={v.id} />
                            )
                          }
                          else {
                            if ((saleArray.length == 0 || _acounter == 0) && (i == counter.length - 1))
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
                      saleArray.length > olimit &&
                      <div className="loadmore-btn">
                        < button type="button" className={oloading ? "loading action-btn" : "action-btn"} onClick={oloadmore} id="login-btn">Load more</button>
                      </div>
                    }
                  </div>
                  <div class="tab-panel row" id="onbuy">
                    <div className="row">
                      {
                        counter.length > 0 && instantArray.length > 0 && counter.map((v, i) => {
                          // console.log(inArray(i,saleArray))
                          if (_dcounter < dlimit && $.inArray(v.id.toString(), instantArray) >= 0) {
                            _dcounter++;
                            return (
                              <ExploreSingle tradeid={v.id} />
                            )
                          }
                          else {
                            if (instantArray.length == 0 && _dcounter == 0 && (i == counter.length - 1))
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
                      instantArray.length > dlimit &&
                      <div className="loadmore-btn">
                        < button type="button" className={dloading ? "loading action-btn" : "action-btn"} onClick={dloadmore} id="login-btn">Load more</button>
                      </div>
                    }
                  </div>
                  <div class="tab-panel row" id="soldout">
                    <div className="row">
                      {


                        counter.length > 0 && soldArray.length > 0 && counter.map((v, i) => {
                          // console.log(soldArray);

                          if (_bcounter < slimit && $.inArray(v.id.toString(), soldArray) >= 0) {
                            _bcounter++;
                            return (
                              <ExploreSingle tradeid={v.id} />
                            )
                          }
                          else {
                            if (soldArray.length == 0 && (i == counter.length - 1)) {
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
                      soldArray.length > slimit &&
                      <div className="loadmore-btn">
                        < button type="button" className={sloading ? "loading action-btn" : "action-btn"} onClick={sloadmore} id="login-btn">Load more</button>
                      </div>
                    }
                  </div>
                  {/* <div class="tab-panel" id="mybids">
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
                  </div> */}


   <div class="tab-panel" id="collection">
                    
                  <div className="row">
                
                  
                  {
                    userCollectNfts.length > 0 && userCollectNfts.map((v,i) => {
                       if(i< climit ){
                        return (
                          <NftSingle nftid={v[1]} nftAddress={v[0]} imported={true}  />
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
                    userCollectNfts.length == 0 &&
                
                    <div className="text-center w-100 m-0 p-5  card  cards2">
                                 <h3>No Collection Available</h3>
                                </div>
                        
                    }
               </div>
                  {
                userCollectNfts.length > climit         &&     
              <div className="loadmore-btn">
              < button type="button" className={cloading ? "loading action-btn" : "action-btn"}   onClick={cloadmore} id="login-btn">Load more</button>
              </div>
              }
                  </div>

                  {/* <div class="tab-panel" id="collection">
                    
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
                  </div> */}
                  {/* 
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
                    </div> */}


                </div>
              </div>

            </section>
          </div>
        </div>
      </div>

      <Modal isOpen={apiModal} toggle={apiToggle} centered={true}>


        <ModalBody>
          <div className="modaltext text-center mt-4 pb-3" >Saving NFT Media and Creating Meta... <br />Do not Close Tab/Window or reload</div>

        </ModalBody>

      </Modal>

      <Modal isOpen={importModal} toggle={importToggle} centered={true}>


        <ModalBody>


          <label>Paste NFT Address </label>
          <input className="form-control mb-1" onChange={handleNFTAddress} type="text" />
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
export default NftCollection;