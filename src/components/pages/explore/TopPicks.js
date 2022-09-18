import React, { Component } from 'react';
import $ from "jquery";
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
const TopPicks = () => {
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
    const [dlimit,setdlimit] = useState(20) ;
    const [dloading,setdLoading] = useState(false) ;

    let _acounter = 0 ;
    let _bcounter = 0 ;
    let _ccounter = 0 ;
    let _dcounter = 0 ;

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
 
      $('.btn').on('click', function() {
        var $this = $(this);
      $this.button('loading');
        setTimeout(function() {
           $this.button('reset');
       }, 8000);
    });

    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
       
      }
 
      init() ;
      // getCollection() ;
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
         let _likesArrays =  await _marketPlaceContract.methods.getAllLikes().call() ;

         console.log(_likesArrays);
     
           
         var _likesArray = _likesArrays[1] ;
         var _tradeArray = _likesArrays[0] ;

         var list = [];
        for (var j = 0; j < _likesArray.length; j++) 
            list.push({'like': parseInt(_likesArray[j]), 'trade': _tradeArray[j]});

        //2) sort:
        list.sort(function(a, b) {
          return ((a.like > b.like) ? -1 : ((a.like == b.like) ? 0 : 1));
          //Sort could be modified to, for example, sort on the age 
          // if the name is the same.
        });
        console.log(list)
// //3) separate them back out:
// for (var k = 0; k < list.length; k++) {
//     names[k] = list[k].name;
//     ages[k] = list[k].age;
// }


        //  var temp = [] ;
        //  var tempLikes = [] ;
        //  for (let j = 0; j < _likesArray.length; j++) {
        //   let _temp = [] ;
        //   _temp.push(_tradeArray[j]);
        //   _temp.push(_likesArray[j]);
        //    temp.push(_temp);
        //    tempLikes.push(_likesArray[j]);
        //  }
         
       
        //  console.log(temp);
        // // var arr = [ "0", "2" ] ;
        // tempLikes.sort(function(a, b){return b-a});
        //  console.log(tempLikes);

        // // let newarray =  _likesArray.sort(function(a, b){return b-a});
        //  temp.sort(function(a, b){  
        //   return tempLikes.indexOf(a) - tempLikes.indexOf(b);
        // });

        // // temp.reverse();

        //  console.log(temp);
        //  console.log(_count);
        //   let rows = [];
        //  for (let i = 0; i < _count; i++) {
        //   rows.push({count : 1}) ;
        //  }
        // //  alert(rows);
        // list.reverse();
         setCounter(list); 

  

         if(wallet.account){
           let _userBids = await _marketPlaceContract.methods.getAuctionsOfUser(wallet.account).call() ;
           setUserBids(_userBids);           
         }

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
    //  let rows = [];

    //  for (let i = 0; i < _count; i++) {
    //   rows.push({count : 1}) ;
    //  }
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
    //       sold.push(i);
    //     }
    //     // console.log(i);
        
    //   }
    //   else if(_statusF[6] == '0x0000000000000000000000000000000000000000' ){
    //     console.log(_statusF[6]);
    //     instant.push(i);
    //   }
    //   if(i == (rows.length-1)){
    //     console.log(instant);
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
    

    const dloadmore = () => {
      setdLoading(true);
        setdlimit(dlimit+20)
        setTimeout(() => {
      setdLoading(false);
          
        }, 3000);
    }
    

    return(
 
              <div className="col-lg-12">
                <section id="">
                  
                  <div className="row">
         {/* {counter[1][0]}  */}
        {/* {counter.length}  */}
        {/* {instantArray.length}  */}
        {/* {$.inArray(parseInt(counter[0][1]),saleArray)} */}
        {/* {$.inArray(2,saleArray)}
        {$.inArray(2,instantArray)} */}
                  {
                    counter.length > 0 && saleArray.length > 0 && counter.map((v,i) => {
                      // console.log(v[0])
                      if(_acounter < olimit && ($.inArray(v.trade,saleArray)  >= 0 || $.inArray(v.trade,instantArray)  >= 0)){
                        _acounter++ ;
                        return (
                          <ExploreSingle tradeid={v.trade}   />
                        ) 
                          }
                          else{
                            if(saleArray.length == 0  && _acounter == 0 && (i == counter.length - 1))
                            return (
                              <div className="text-center w-100 m-3 p-5  card cards2">
                                  <h3>No Auction Available</h3>
                                </div>
                            )
                          }
                  })}


{
                    saleArray.length == 0 &&
                
                    <div className="text-center w-100 m-3 p-5  card  cards2" >
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
               
                  
                  
                </section>
              </div>
          
    );
 

}
export default TopPicks;