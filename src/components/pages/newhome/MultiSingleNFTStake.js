import React, { useState } from "react";
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";
import $ from "jquery";
import hero from '../../images/hero.png';
import Header from '../header.js';
import Footer from '../footer.js';
import search from '../../images/search.png';
import big from '../../images/big.png';
import play from '../../images/play.png';
import NFT_STAKE_ABI from  "../../../Config/NFT_STAKE_ABI.json"
import TOKEN_ABI from  "../../../Config/TOKEN_ABI.json"
import Config, {NFT, NFT_STAKE} from  "../../../Config"
import Web3 from "web3"
import { useEffect } from 'react';
import {useWallet} from '@binance-chain/bsc-use-wallet'
import ConnectButton from '../../services/ConnectButton'
import add from '../../images/add.gif';
import StakeCard from "./StakeCard";
import WIZARD from '../../images/add.gif';
import ORDINARY from '../../images/Ordinary.gif';
import EPIC from '../../images/Epic.gif';
import RARE from '../../images/Rare.gif';
import { func } from "prop-types";
import AUTOSHARK from '../../images/AUTOSHARK.gif';
import DMTNT from '../../images/DMTNT.gif';
import BabyNFT from '../../images/BabyNFT.gif';
import NFB from '../../images/BananaWIZARDs.gif';
import MCS from '../../images/MoonCafeSloth.gif';
 
import ROUTER_ABI from  "../../../Config/ROUTER_ABI.json"
import NFWolfPup from '../../images/NFWolfPup.gif';
import BK from '../../images/BananaKing.gif';
  

import BBQG from '../../images/BarbecueNFT.gif';
import SQ from '../../images/SquirrelNFT.gif';
import OWL from '../../images/OwlNFTFARM.gif';
import SING from '../../images/SingularfarmNFT.gif';
import MDF from '../../images/MDFNFT.gif';
import CL from '../../images/Lovesswap.gif';
import GT from '../../images/GT.gif';
import PEAR from '../../images/PEAR.gif';
import MPS from '../../images/MPS.gif';
import BTCG from '../../images/BTCG.gif';
import PMDB from '../../images/PMDB.gif';
import DSG from '../../images/DSG.gif';
import SG from '../../images/SG.gif';
import MultiSingleStakeCard from "./MultiSingleStakeCard";

import WizardBattlePass from '../../images/Wizard Battle Pass.gif';
import Silver_Guard from '../../images/Silver_Guard.gif';
import Golden_Guard from '../../images/Golden_Guard.gif';
import OctoNft from '../../images/OctoNft.gif' ;
import MultiSingleNFTStakeCard from "./MultiSingleNFTStakeCard";


const STAKE_CONTRACT = 
[ 
  {address: '0xCeb05424c79Bd009e72Cb7107BD00A5D090a2Fa5', nft: '0xf9548aefa7b23E7B9EdAc6bc2075099b12A25b06' , image : OctoNft, status: 1, fee: 1 ,feedecimal: 100 , ape: 2, lp: 0 , pair: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'},
  ];

const MultiSingleNFTStake = () => {
//   alert(STAKE_CONTRACT.length);
  let web3Provider  = window.ethereum ; 
//   const [tvl,setTVL] = useState(0) ;
  

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
 

// async function getTVL(){
//     let tvl = 0 
//     let _web3 = new Web3(web3Provider);     

//     STAKE_CONTRACT.length > 0 && STAKE_CONTRACT.map(async (value, index) => {
//         let _stakeContract = new _web3.eth.Contract(NFT_STAKE_ABI,value.address);
//         let _staketoken = await _stakeContract.methods.staketoken().call() ; 
//         let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_staketoken);

//         let sprice = await getPrice(_staketoken,0);
//         let _totalStaked = await _tokenContract.methods.balanceOf(value.address).call() ;  
//         let _decimals= await _tokenContract.methods.decimals().call() ; 
//         _totalStaked = parseFloat(_totalStaked/1e1 ** _decimals).toFixed(2);
//         tvl = tvl + parseFloat(sprice*_totalStaked);
//         if(index == (STAKE_CONTRACT.length - 1) ){
//             tvl = parseFloat(tvl).toFixed(2);
//             setTVL(tvl);
//         }

//     })

// }

 
useEffect(() => {
  $(document).ready(function() {
    $(".faqs-container .faq-singular:first-child").addClass("active").children(".faq-answer").slideDown();//Remove this line if you dont want the first item to be opened automatically.
    $(".faq-question").on("click", function(){
      if( $(this).parent().hasClass("active") ){
        $(this).next().slideUp();
        $(this).parent().removeClass("active");
      }
      else{
        $(".faq-answer").slideUp();
        $(".faq-singular").removeClass("active");
        $(this).parent().addClass("active");
        $(this).next().slideDown();
      }
    });
  });
$('.tabs3').on('click','a',function(e){
e.preventDefault();
var tabId = $(this).attr('data-tab');
$(this).closest('.tabs3').find('a').removeClass('active');
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
    //   getTVL() ;
},[])
      

// console.log(STAKE_CONTRACT);

 

		return(
			
			
            <div className="bg-stake">
		 
				
				<section id="choose-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                         
                                <div className="mainwrp">
                               
                               <div className="stake-head">
                                   <h3>Earn Token</h3>
                                   <p>Stake NFTs to Earn Token</p>
                               </div>

                               <div className="inactive-box mb-3">
									<ul class="tabs3 mb-3">
									<li class="tab-button"><a href="#" class="active" data-tab="active">Active</a></li>
									<li class="tab-button"><a href="#" class="" data-tab="inactive">Inactive</a></li>	
                                    </ul>
                                    {/* <h4 className="ml-3 pt-1 pb-1 pr-3 align-self-center bg-white pl-3 d-inline-flex rounded ">
                                        Total Value Locked: ${tvl}
                                    </h4> */}
								</div>
                            	<div class="tab-pane">
								<div class="tab-panel active" id="active">
                            	{STAKE_CONTRACT.length > 0 && STAKE_CONTRACT.map((value, index) => {
                                    if(value.status == 1){
                                   return   <MultiSingleNFTStakeCard data={STAKE_CONTRACT[index]} />
                                }

                                })
                                }
                            </div>
                            <div class="tab-panel" id="inactive">
                            {STAKE_CONTRACT.length > 0 && STAKE_CONTRACT.map((value, index) => {
                                    if(value.status == 0){
                                   return   <MultiSingleNFTStakeCard data={STAKE_CONTRACT[index]} />
                                }

                                })
                                }
                            </div>


                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
					 
            </div>
			
		);
 

}
export default MultiSingleNFTStake;