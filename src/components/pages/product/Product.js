import React, { Component } from 'react';
import $ from "jquery";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody, Alert } from "reactstrap";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';

import check from '../../images/check.png';
import gamecontroller1 from '../../images/game_controller1.png';
import avatar from '../../images/avatar.png';
import v3 from '../../images/v3.png';
import Config, { MARKETPLACE } from '../../../Config/index.js';
import MARKETPLACE_ABI from '../../../Config/MARKETPLACE_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import NFT_ABI from '../../../Config/NFT_ABI.json';
import Web3 from "web3"
import { useState, useEffect } from 'react';
import useWallet from '@binance-chain/bsc-use-wallet'
import ConnectButton from '../ConnectButton.js';
import WIZARDGIF from '../../images/WizardFlying.gif';

import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import { useParams } from 'react-router-dom';

const Product = (props) => {
    const { tradeid } = useParams();
    let web3Provider = window.ethereum;

    const [modal, setModal] = useState(false);
    const [bidModal, setBidmodal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [trade, setTrade] = useState([]);
    
    const toggle = () => setModal(!modal);
    const bidToggle = () => setBidmodal(!bidModal);


    const [renewSaleModal, setRenewSaleModal] = useState(false);
    const [renewAuctionModal, setRenewAuctionModal] = useState(false);

    const renewSaleToggle = () => setRenewSaleModal(!renewSaleModal);
    const renewAuctionToggle = () => setRenewAuctionModal(!renewAuctionModal);


    const wallet = useWallet();
    const bidStatusName = ['Inactive', 'Open', 'Paused', 'Closed']
    const [name, setName] = useState(0);
    const [description, setDescription] = useState(0);

    const [balance, setBalance] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [buyPrice, setBuyPrice] = useState(0);

    const [bidStatus, setBidStatus] = useState(null);
    const [lister, setLister] = useState(null);

    const [userbid, setUserbid] = useState(0);

    const [price, setPrice] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [newStartTime, setNewStartTime] = useState(null);
    const [newEndTime, setNewEndTime] = useState(null);


    const [media, setMedia] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [highestBidder, setHighestBidder] = useState(null);
    const [highestBid, setHighestBid] = useState(null);
    const [tokenAddress, setTokenAddress] = useState(null);
    const [approval, setApproval] = useState(0);
    const [owner, setOwner] = useState(null);
    const [buyer, setBuyer] = useState(null);
    const [depositError, setDepositError] = useState(null);
    const [bidIncreasePercentage, setBidIncreasePercentage] = useState(0);
    const [minimumBid, setMinimumBid] = useState(0);

    const [decimals, setDecimals] = useState(0);
    const [damount, setdAmount] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [nftAddress, setNftAddress] = useState(0);
    const [canClaim, setCanClaim] = useState(false);
    let timeInterval;
    let timeInterval2;
    const [artist, setArtist] = useState(0);
    const [public_profile_link, setPublic_profile_link] = useState(0);

    const [height, setHeight] = useState(0);
    const [breadth, setBreadth] = useState(0);
    const [length, setLength] = useState(0);
    const [weight, setWeight] = useState(0);
    const [tags, setTags] = useState(0);
    
    


    useEffect(() => {
        clearInterval(timeInterval);
        // alert(bidStatus)
        if (bidStatus === 1) {
            // alert("here");
            timeInterval = setInterval(() => {
                getTimer();

            }, 1000);
        }
    }, [bidStatus]);

    useEffect(() => {


        if (window.ethereum) {
            web3Provider = window.ethereum;
        }
        else {
            web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)

        }

        clearInterval(timeInterval2);

        timeInterval2 = setInterval(() => {

            init();
        }, 1000);

    }, [wallet.account]);


    const getTimer = async () => {
        let _web3 = new Web3(web3Provider);
        let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        let _tradeTime = await _marketPlaceContract.methods.getAuctionTime(tradeid).call();
        
        let _now = new Date().getTime() / 1e3;

        if (_tradeTime._endtime > _now) {
            let remainingSeconds = _tradeTime._endtime - _now;
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
            let _endTime;
            if (remainingSeconds <= 0) {
                _endTime = "Ended";
                setEndTime(_endTime);

            }
            else if (remainingDay > 0) {
                _endTime = remainingDay + "d : " + remainingHour + "h : " + remainingMinutes + "m";
                setEndTime(_endTime);

            }
            else {
                _endTime = remainingHour + "h : " + remainingMinutes + "m : " + remainingSec + "s";
                setEndTime(_endTime);
            }
        }
    }




    async function unLikeTrade() {
        let _web3 = new Web3(web3Provider);

        setModal(!modal);

        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        _marketPlaceContract.methods.unLike(tradeid).send({ from: wallet.account }).on('receipt', function (receipt) {
            // init();          
            setModal(modal);

        })

            .on('error', function (error, receipt) {
                setModal(modal);

            });

    }


    async function likeTrade() {
        let _web3 = new Web3(web3Provider);

        setModal(!modal);

        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        _marketPlaceContract.methods.like(tradeid).send({ from: wallet.account }).on('receipt', function (receipt) {
            // init();          
            setModal(modal);

        })

            .on('error', function (error, receipt) {
                setModal(modal);

            });

    }


    const init = async () => {
        let _web3 = new Web3(web3Provider);
        let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        let _trade = await _marketPlaceContract.methods.getTrade(tradeid).call();
        let _fullTrade = await _marketPlaceContract.methods.getFullTrade(tradeid).call();
        let _token = _fullTrade[5];

        //   console.log(_fullTrade);
        //  let _status =  await _marketPlaceContract.methods.getAuctionStatus(tradeid).call() ;
        //  setBidStatus(_status)

        setTokenAddress(_token)



        let _bidIncreasePercentage = await _marketPlaceContract.methods.bidIncreasePercentage().call();
        setBidIncreasePercentage(_bidIncreasePercentage);

        let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token);
        let _symbol = await _tokenContract.methods.symbol().call();
        let _decimals = await _tokenContract.methods.decimals().call();
        if (_fullTrade[8]) {

            let _status = await _marketPlaceContract.methods.getAuctionStatus(tradeid).call();
            setBidStatus(_status)
        }
        else {
            setBidStatus(4)
            let _buyPrice = parseFloat(_fullTrade.nftTokenPrice / 1e1 ** _decimals).toFixed(2)
            setBuyPrice(_buyPrice)
        }

        setDecimals(_decimals);
        setSymbol(_symbol);
        if (wallet.account) {
            let _canClaim = await _marketPlaceContract.methods.claim(tradeid, wallet.account).call();
            setCanClaim(_canClaim)

            let _balance = await _tokenContract.methods.balanceOf(wallet.account).call();
            _balance = parseFloat(_balance / 1e1 ** _decimals).toFixed(2);
            setBalance(_balance)

            let _approval = await _tokenContract.methods.allowance(wallet.account, MARKETPLACE).call();
            setApproval(_approval);

            let _userBid = await _marketPlaceContract.methods.getBid(tradeid, wallet.account).call();
            _userBid = parseFloat(_userBid / 1e1 ** _decimals).toFixed(2);
            setUserbid(_userBid)

        }

        let _nftToken = _trade.nftadd;
        setNftAddress(_nftToken);

        let _nftTokenId = _trade.nftid;
        let _nftContract = new _web3.eth.Contract(NFT_ABI, _nftToken);
        let _mediaURI = await _nftContract.methods.tokenURI(_nftTokenId).call();

        let _owner = await _nftContract.methods.ownerOf(_nftTokenId).call();
        let _NFTname = await _nftContract.methods.symbol().call() ;

        setOwner(_owner);
        if (_trade.buyer != '0x0000000000000000000000000000000000000000') {
            setBuyer(_trade.buyer);
        }
        //  let _hs = await _nftContract.methods.tokenURI(_nftTokenId).call() ;
        setHighestBidder(_trade.highestBidder);
        setLister(_fullTrade.lister);
        console.log("trade" , _fullTrade);
        setTrade(_fullTrade)

        let _highestBid = parseFloat(_trade.maxbid / 1e1 ** _decimals).toFixed(2);

        let _minimumBid = parseFloat(parseFloat(_highestBid) + parseFloat(_highestBid * _bidIncreasePercentage / 100)).toFixed(2);

        setMinimumBid(_minimumBid)

        if (wallet.account) {
            let _liked = await _marketPlaceContract.methods.likesMap(tradeid, wallet.account).call();
            // console.log(props.tradeid);
            console.log(_liked);
            setLiked(_liked);
        }


        let _likes = await _marketPlaceContract.methods.likes(tradeid).call();
        setLikes(_likes);
        //  setEndTime(_trade.)

        setHighestBid(_highestBid);
        //  alert(_mediaURI)
        //  let _media = await getBase64FromUrl(_mediaURI)  ; 
        //  setMedia(_media.toDataURL());
        console.log("here",_mediaURI);

        if(_mediaURI.includes("ipfs://") ){
            //  alert("found")
            _mediaURI = _mediaURI.replace("ipfs://" , "https://wizard.infura-ipfs.io/ipfs/") 
           }
           if(_mediaURI.includes("https://ipfs.infura.io/") ){
            //  alert("found")
            _mediaURI = _mediaURI.replace("https://ipfs.infura.io/" , "https://wizard.infura-ipfs.io/") 
           }

        _mediaURI = await fetch(_mediaURI);
        _mediaURI = await _mediaURI.json();
        //  console.log(_mediaURI);
        // if(_media.includes('data:text/html;')){
        //  setMedia(WIZARDGIF);
        // }
        // else{
        let _image  = _mediaURI.image ; 
        if(_image.includes("https://ipfs.infura.io/") ){
            //  alert("found")
            _image = _image.replace("https://ipfs.infura.io/" , "https://wizard.infura-ipfs.io/") 
           }
        if(_image.includes("ipfs://")){
            //  alert("found")
            _image = _image.replace("ipfs://" , "https://wizard.infura-ipfs.io/ipfs/") 
           }
        setMedia(encodeURI(_image));
        // alert(encodeURI(_mediaURI.image))

        // }
        let _name = _trade.title;
        if(_mediaURI.description){

        setDescription(_mediaURI.description);
        }

        if(_mediaURI.properties){

            setArtist(_mediaURI.properties.artist);
            setPublic_profile_link(_mediaURI.properties.public_profile_link);
    
            setHeight(_mediaURI.properties.height);
            setBreadth(_mediaURI.properties.breadth);
            setLength(_mediaURI.properties.length);
            setWeight(_mediaURI.properties.weight);
            setTags(_mediaURI.properties.tags);
        }
     
        // alert(_name)
        // setName(_name == "" ? _NFTname : _name )
        setName(_name == "" ?  _mediaURI.name ? _mediaURI.name : _NFTname : _name )

        let _price = parseFloat(_trade.startingPrice / 1e1 ** _decimals).toFixed(2);
        setPrice(_price);

    }


    async function placeBid() {
        setDepositError(false);
        let _amount = parseFloat(depositAmount);


        if (_amount + parseFloat(userbid) < minimumBid) {
            setDepositError('Bid must be at least ' + bidIncreasePercentage + '% higher than highest bid. Suggested Bid: ' + (minimumBid) + ' ' + symbol);

            return false;
        }


        if (_amount + parseFloat(userbid) <= highestBid && highestBidder != wallet.account) {
            setDepositError('Please bid amount higher than your last bid.');
            return false;
        }




        if (balance <= 0 || (_amount - parseFloat(userbid)) > balance) {
            setDepositError('Insufficient Balance. Please fund your wallet with some ' + symbol + ' Token and try again.');
            return false;
        }

        if (_amount <= 0 || _amount == "") {
            setDepositError('Invalid Deposit Amount. Please enter a valid amount greater than 0.');
            return false;
        }



        let _web3 = new Web3(web3Provider);
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);


        _amount = _web3.utils.toWei(_amount.toString());

        setModal(!modal);
        _marketPlaceContract.methods.placeBid(tradeid, _amount).send({
            from: wallet.account
        }).on('receipt', function (receipt) {
            setModal(modal);
            init();
            bidToggle();
        }).on('error', function (receipt) {
            setModal(modal);

        })

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

    const handleDepositChange = (e) => {
        setDepositAmount(e.target.value);
        setdAmount(e.target.value);

    }

    const handleStartTimeChange = (e) => {
        console.log(e.target.value);
        setNewStartTime(e.target.value);
    }

    const handleNewEndTimeChange = (e) => {
        console.log(e.target.value);
        setNewEndTime(e.target.value);
    }

    const handleNewPriceChange = (e) => {
        setNewPrice(e.target.value);


    }


    async function setMaxDeposit() {


        setdAmount(balance * 0.99)
        setDepositAmount(balance * 0.99)
    }





    async function renewSale() {

        let _web3 = new Web3(web3Provider);
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        let _newPrice = _web3.utils.toWei(newPrice.toString());
        setModal(!modal);
        _marketPlaceContract.methods.renewInstantSellAuction(tradeid, _newPrice).send({
            from: wallet.account
        }).on('receipt', function (receipt) {
            setModal(modal);
            setRenewSaleModal(!renewSaleModal)
            init();
        }).on('error', function (receipt) {
            setModal(modal);

        })

    }


    async function cancelSale() {

        let _web3 = new Web3(web3Provider);
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        setModal(!modal);
        _marketPlaceContract.methods.cancelInstantSellAuction(tradeid).send({
            from: wallet.account
        }).on('receipt', function (receipt) {
            setModal(modal);
            init();
        }).on('error', function (receipt) {
            setModal(modal);

        })

    }

    async function cancelAuction() {

        let _web3 = new Web3(web3Provider);
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        setModal(!modal);
        _marketPlaceContract.methods.endAuction(tradeid).send({
            from: wallet.account
        }).on('receipt', function (receipt) {
            setModal(modal);
            init();
        }).on('error', function (receipt) {
            setModal(modal);

        })

    }

    async function renewAuction() {

        let _web3 = new Web3(web3Provider);
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);
        let _newPrice = _web3.utils.toWei(newPrice.toString());
        let _newStartTime = new Date(newStartTime).getTime() / 1e3;
        let _newEndTime = new Date(newEndTime).getTime() / 1e3;
        setModal(!modal);
        _marketPlaceContract.methods.renewAuction(tradeid, _newPrice, _newStartTime, _newEndTime).send({
            from: wallet.account
        }).on('receipt', function (receipt) {
            setModal(modal);
            init();
        }).on('error', function (receipt) {
            setModal(modal);

        })

    }

    async function claimBid() {

        let _web3 = new Web3(web3Provider);
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        setModal(!modal);
        _marketPlaceContract.methods.withdraw(tradeid).send({
            from: wallet.account
        }).on('receipt', function (receipt) {
            setModal(modal);
            init();
        }).on('error', function (receipt) {
            setModal(modal);

        })

    }


    async function buyNft() {

        let _web3 = new Web3(web3Provider);
        const _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE);

        setModal(!modal);
        _marketPlaceContract.methods.buyNft(tradeid).send({
            from: wallet.account
        }).on('receipt', function (receipt) {
            setModal(modal);
            init();
        }).on('error', function (receipt) {
            setModal(modal);

        })

    }

    async function approveToken() {
        let _web3 = new Web3(web3Provider);

        setModal(!modal);

        const _tokenContract = new _web3.eth.Contract(TOKEN_ABI, tokenAddress);
        const _amount = _web3.utils.toWei('10000000000000000000000');
        _tokenContract.methods.approve(MARKETPLACE, _amount).send({ from: wallet.account }).on('receipt', function (receipt) {
            init();
            setModal(modal);

        })

            .on('error', function (error, receipt) {
                setModal(modal);

            });

    }


    return (
        <div>

            <div class="main-bg">
                <div class="container">
                    <section id="product-sec" class="">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="product-contents mt-4">
                                            {
                                                media != null &&
                                                <div class="main-product-img_single" style={{ backgroundImage: 'url(' + media + ')' }}>
                                                    {/* <img src={media} /> */}
                                                    {/* {window.location.href} */}

                                                </div>
                                            }
                                            
                                            {/* <div class="heart-wrp">
                        <div class="heart-child1">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="heart-child1 mart-h">
                            <i class="fas fa-expand-arrows-alt"></i>
                        </div>
                        </div> */}
                                            {/* <p>we use <img src={gamecontroller1} /><a href="#"> Learn more</a></p> */}
                                        </div>
                                         <div class="col-lg-12 product-right-wrp">
                            <div class="product-right-content">
                            <div className="data-table01">
                            <h3>Artist:</h3>
                             <h3 className="data-text02">{artist ? artist : 'Not Available'}</h3>
                            </div>
                            <div className="data-table01">
                            <h3>Public profile link:</h3>
                            
                             <h3 className="data-text02"><a href="#" target="_blank">{public_profile_link ? public_profile_link.substring(0, 10)+"...."+public_profile_link.substring(public_profile_link.length - 10) : "Not Available"}</a></h3>
                            
                            </div>
                            <div className="data-table01">
                            <h3>Height:</h3>
                             <h3 className="data-text02">{height ? height : 'Not Available'}</h3>
                            </div>
                            <div className="data-table01">
                            <h3>Breadth:</h3>
                             <h3 className="data-text02">{breadth ? breadth : 'Not Available'}</h3>
                            </div>
                            <div className="data-table01">
                            <h3>Length:</h3>
                             <h3 className="data-text02">{length ? length : 'Not Available'}</h3>
                            </div>
                            <div className="data-table01">
                            <h3>Weight:</h3>
                             <h3 className="data-text02">{weight ? weight : 'Not Available'}</h3>
                            </div>
                            <div className="data-table01">
                            <h3>Tags:</h3>
                             <h3 className="data-text02">{tags ? tags : 'Not Available'}</h3>
                            </div>
                            
                            </div>
                        </div>

                                    </div>
                                    <div class="col-lg-6">
                                        <div class="product-right-content">
                                            <h1 className="text-white">{name}  <span className="p-1">
                                                {
                                                    liked ?
                                                        <i className="fa fa-heart liked clickable" onClick={unLikeTrade} ></i>
                                                        :
                                                        <i className="fa fa-heart clickable" onClick={likeTrade} ></i>
                                                }
                                                {likes}
                                            </span></h1>
                                            <p className="text-white" id="bidding">{description}</p>
                                            {
                                                buyer == lister ?
                                                    <p className="text-white" id="bidding">Cancelled</p>
                                                    :
                                                    bidStatus == 4 ?
                                                        <p className="text-white" id="bidding">Buy Now</p>
                                                        :
                                                        <p className="text-white" id="bidding">Bidding {bidStatusName[bidStatus]}</p>

                                            }
                                            {
                                                !wallet.account &&
                                                <span className="text-white" id="connect">Please connect Metamask to buy item.</span>
                                            }
                                            <div className="d-flex mt-2 justify-content-between socialcontainer">
                                                <FacebookShareButton url={window.location.href} quote={name} >
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>
                                                <TwitterShareButton url={window.location.href} title={name} >
                                                    <TwitterIcon size={32} round />
                                                </TwitterShareButton >
                                                <TelegramShareButton url={window.location.href} title={name} >
                                                    <TelegramIcon size={32} round />
                                                </TelegramShareButton >
                                                <WhatsappShareButton url={window.location.href} title={name} separator=":: " >
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton >
                                            </div>
                                            <div className="holders">
                                                <h3></h3>
                                            </div>
                                            {
                                                bidStatus == 1 &&
                                                <span>Ends in {endTime}</span>
                                            }
                                            {/* <div class="icons-p-wrp">
                          <a href="#">
                          <div class="circle-icon2">
                          <i class="fas fa-ellipsis-h"></i>
                      </div>
                      </a>
                      <a href="#" class="mrt-l">
                          <div class="circle-icon2">
                         <i class="fas fa-cloud-upload-alt"></i>
                      </div>
                      </a>
                      </div>
                      <p v-if="product.forsale == 1">For sale <span>1 of 1</span></p>
                      <p v-else>Not for sale <span>1 of 1</span></p>
                       <div class="games-contents">
                          <a href="#"><img src="../assets/images/paint.png" /> Art</a>
                           <a href="#" class="mart-g"><img src="../assets/images/game_controller1.png" /> Games</a>
                      </div> 
                      <div class="product-paragraph">
                          <p>
                         <a href="#">Read more</a>
                        </p>
                      </div> */}
                                            <div className=" mt-2 mb-2">
                                                {/* <input type="radio" name="tab-btn" id="tab-btn-1" value="" checked /> */}
                                                {/* <label for="tab-btn-1">Info</label> */}
                                                {/* <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
                        <label for="tab-btn-2">Owners</label>
                        <input type="radio" name="tab-btn" id="tab-btn-3" value="" />
                        <label for="tab-btn-3">History</label>
                        <input type="radio" name="tab-btn" id="tab-btn-4" value="" />
                        <label for="tab-btn-4">Details</label>
                        <input type="radio" name="tab-btn" id="tab-btn-5" value="" />
                        <label for="tab-btn-5">Bids</label> */}

                                                <div id="content-1" >
                                                    <div class="products-list-wrp">
                                                        <ul class="products-list">
                                                            <li>
                                                                <div class="p-list-content-wrp">
                                                                    <div class="p-list-content-c">
                                                                        <div class="p-l-img">
                                                                            <img src="../assets/images/avatar.png" />
                                                                            <img />
                                                                        </div>
                                                                        <div class="check-img2" >
                                                                            <img src={check} />
                                                                        </div>
                                                                    </div>
                                                                    <div class="p-list-content-c2">
                                                                        <div class="x-font-normal-blue">Owner</div>
                                                                        <div class="x-font-normal-white text-white" ><a className="text-white" href={"/profile/view/" + lister}>{lister}</a></div>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div class="p-list-content-wrp">
                                                                    <div class="p-list-content-c">
                                                                        <div class="p-l-img">
                                                                            <img src="../assets/images/avatar.png" />
                                                                            <img />
                                                                        </div>
                                                                        <div class="check-img2" >
                                                                            <img src={check} />
                                                                        </div>
                                                                    </div>
                                                                    <div class="p-list-content-c2">
                                                                        <div class="x-font-normal-blue">NFT Address</div>
                                                                        <div class="x-font-normal-white"><a href={"/nft/collection/"+nftAddress} >{nftAddress}</a></div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {
                                                                buyer && buyer != lister &&
                                                                <li>
                                                                    <div class="p-list-content-wrp">
                                                                        <div class="p-list-content-c">
                                                                            <div class="p-l-img">
                                                                                <img src={check} />
                                                                            </div>
                                                                        </div>
                                                                        <div class="p-list-content-c2">
                                                                            <div class="x-font-normal-blue">Buyer</div>
                                                                            <div class="x-font-normal-white"><a className="text-white" href={"/profile/view/" + buyer}>{buyer}</a></div>

                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            }
                                                            {
                                                                !buyer && (bidStatus == 1 || !canClaim) && bidStatus != 4 &&
                                                                <li>
                                                                    <div class="p-list-content-wrp">
                                                                        <div class="p-list-content-c">
                                                                            <div class="p-l-img">
                                                                                <img src={check} />
                                                                            </div>
                                                                        </div>
                                                                        <div class="p-list-content-c2">
                                                                            <div class="x-font-normal-blue">Highest Bid</div>
                                                                            <div class="x-font-normal-white">{highestBid} {symbol}</div>

                                                                        </div>
                                                                        <div class="p-list-content-c2">
                                                                            <div class="x-font-normal-blue">Your Bid</div>
                                                                            <div class="x-font-normal-white">{userbid} {symbol}</div>

                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            }

                                                            {
                                                                bidStatus == 4 &&
                                                                <li>
                                                                    <div class="p-list-content-wrp">
                                                                        <div class="p-list-content-c">
                                                                            <div class="p-l-img">
                                                                                <img src={check} />
                                                                            </div>
                                                                        </div>
                                                                        <div class="p-list-content-c2">
                                                                            <div class="x-font-normal-blue">Price</div>
                                                                            <div class="x-font-normal-white">{buyPrice} {symbol}</div>

                                                                        </div>

                                                                    </div>
                                                                </li>
                                                            }



                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* <div id="content-2">
                        <div class="products-list-wrp">
                                <ul class="products-list">
                                   <li>
                                        <div class="p-list-content-wrp">
                                            <div class="p-list-content-c">
                                                <div class="p-l-img">
                                                    <img src="../assets/images/avatar.png" />
                                                </div>
                                            </div>
                                            <div class="p-list-content-c2">
                                                <div class="x-font-normal-blue">owner</div>
                                                <div class="x-font-normal-white">velvet</div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div> */}
                                                {/* <div id="content-3">
                        <div class="products-list-wrp">
                                <ul class="products-list">
                                    <li>
                                        <div class="p-list-content-wrp">
                                            <div class="p-list-content-c">
                                                <div class="p-l-img">
                                                    <img src="../assets/images/avatar.png" />
                                                </div>
                                            </div>
                                            <div class="p-list-content-c2">
                                                <div class="x-font-normal-blue">owner</div>
                                                <div class="x-font-normal-white">velvet</div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div> */}
                                                {/* <div id="content-4">
                       <div class="products-list-wrp">
                                <ul class="products-list">
                                   <li>
                                        <div class="p-list-content-wrp">
                                            <div class="p-list-content-c">
                                                <div class="p-l-img">
                                                    <img src="../assets/images/avatar.png" />
                                                </div>
                                            </div>
                                            <div class="p-list-content-c2">
                                                <div class="x-font-normal-blue">owner</div>
                                                <div class="x-font-normal-white">velvet</div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div> */}
                                                {/* <div id="content-5">
                        <div class="products-list-wrp">
                                <ul class="products-list">
                                   <li>
                                        <div class="p-list-content-wrp">
                                            <div class="p-list-content-c">
                                                <div class="p-l-img">
                                                    <img src="../assets/images/avatar.png" />
                                                </div>
                                            </div>
                                            <div class="p-list-content-c2">
                                                <div class="x-font-normal-blue">owner</div>
                                                <div class="x-font-normal-white">velvet</div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div> */}
                                            </div>
                                            {wallet.account && bidStatus == 1 && buyer != lister &&
                                                <button class="x-product-place-bid-button" onClick={bidToggle} >Place Bid</button>
                                            }
                                            {wallet.account && bidStatus == 4 && approval > 0 && buyer != lister &&
                                                <button class="x-product-place-bid-button" onClick={buyNft} >Buy Now</button>
                                            }
                                            {wallet.account && bidStatus == 4 && approval == 0 && buyer != lister &&
                                                <button class="x-product-place-bid-button" onClick={approveToken} >Approve Now</button>
                                            }
                                            {!wallet.account &&
                                                <div className="mt-3 text-center"  >
                                                    <ConnectButton />
                                                </div>
                                            }
                                            {wallet.account && !canClaim && bidStatus == 3 && highestBidder == wallet.account && wallet.account != lister && buyer == null &&
                                                <button class="x-product-place-bid-button" onClick={claimBid} >Claim</button>

                                            }
                                            {wallet.account && !canClaim && userbid > 0 && bidStatus == 3 && highestBidder != wallet.account &&
                                                <button class="x-product-place-bid-button" onClick={claimBid} >Withdraw</button>

                                            }
                                            {wallet.account && buyer == null && bidStatus == 4  && lister == wallet.account &&
                                                <>
                                                    <button class="x-product-place-bid-button" onClick={cancelSale} >Cancel Sale</button>
                                                    <button class="x-product-place-bid-button" onClick={renewSaleToggle} >Renew Sale</button>

                                                </>
                                            }
                                            {
                                                wallet.account && (bidStatus == 3 || bidStatus == 0) && lister == wallet.account && buyer == null &&
                                                <>
                                                    <button class="x-product-place-bid-button" onClick={cancelAuction} >Cancel Auction</button>
                                                    <button class="x-product-place-bid-button" onClick={renewAuctionToggle} >Renew Auction</button>
                                                </>

                                            }


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    
                    </section>
                </div>
            </div>


            <Modal isOpen={modal} toggle={toggle} centered={true}>


                <ModalBody>
                    <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

                </ModalBody>
                <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>

            </Modal>

            <Modal isOpen={bidModal} toggle={bidToggle} centered={true}>


                <ModalBody>

                    <div className="moveRight">

                        <span>
                            Your Balance<br />
                            {balance} {symbol}
                        </span>
                    </div>
                    <label><br />Enter Deposit Amount <span className="maxButton ml-2 p-2" onClick={setMaxDeposit}>Max</span></label>
                    <input className="form-control" onChange={handleDepositChange} type="text" value={damount} />
                    {
                        parseFloat(damount) > userbid &&
                        <h5 className="info font-size-large" >Your Deduction: {damount - userbid}</h5>
                    }
                    {
                        depositError &&
                        <span className="error">{depositError}</span>
                    }




                </ModalBody>
                <ModalFooter>
                    {
                        (approval == 0 || approval < damount * decimals) &&
                        <Button className="depositButton mr-3" onClick={approveToken}>Approve</Button>
                    }
                    {
                        (approval > 0 && approval >= damount * decimals) &&
                        <Button className="depositButton mr-3" onClick={placeBid}>Bid Now</Button>

                    }
                    <Button className="depositButton" onClick={bidToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={renewSaleModal} toggle={renewSaleToggle} centered={true}>


                <ModalBody className="popup">

                    <label><br />Enter New Price Amount  </label>
                    <input className="form-control popup" onChange={handleNewPriceChange} type="text" value={newPrice} />

                </ModalBody>
                <ModalFooter>

                    <Button className="depositButton mr-3" onClick={renewSale}>Renew Sale</Button>


                    <Button className="depositButton" onClick={renewSaleToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={renewAuctionModal} toggle={renewAuctionToggle} className="popupModal" centered={true}>


                <ModalBody >

                    <label><br />Enter New Price Amount  </label>
                    <input className="form-control popupModal" onChange={handleNewPriceChange} type="text" value={newPrice} />
                    <label><br />Choose New Start Date & Time  </label>
                    <input className="form-control popupModal" onChange={handleStartTimeChange} type="datetime-local" value={newStartTime} />
                    <label><br />Choose New End Date & Time  </label>
                    <input className="form-control popupModal" onChange={handleNewEndTimeChange} type="datetime-local" value={newEndTime} />
                </ModalBody>
                <ModalFooter>

                    <Button className="depositButton mr-3" onClick={renewAuction}>Renew Auction</Button>


                    <Button className="depositButton" onClick={renewAuctionToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


        </div>
    );


}
export default Product;