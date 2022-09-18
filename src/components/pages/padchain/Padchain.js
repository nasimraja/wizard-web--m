import React, { Component, useEffect , useState } from 'react';

import $ from "jquery";

import Header from '../header.js';
import Footer from '../footer.js';
import date from '../../images/date.png';
import clock from '../../images/clock.png';
import live from '../../images/live.png';
import success2 from '../../images/success2.png';
import failing from '../../images/failing.png';

import { OLD_PRIVATE_SALE, PRIVATE_SALE } from '../../../Config/index.js';
import  PRIVATE_SALE_ABI from '../../../Config/PRIVATE_SALE_ABI.json';
import  TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Web3 from 'web3';
import PadCard from './PadCard.js';
import OldPadCard from './OldPadCard.js';

const Padchain = () => { 
 
	const wallet = useWallet() ;
	let web3Provider  = window.ethereum ; 
	const [upcomingArray,setUpcomingArray] = useState([]);
	const [liveArray,setLiveArray] = useState([]);
	const [successArray,setSuccessArray] = useState([]);
	const [failArray,setFailArray] = useState([]);
 

	
	useEffect(() => {
		if(window.ethereum){
			web3Provider  = window.ethereum;
		  }
		  else{
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
		   
		  }
		  init()
	},[])


	useEffect(() =>{

		$('.tabs').on('click','a',function(e){
			e.preventDefault();
			var tabId = $(this).attr('data-tab');
			$(this).closest('.tabs').find('a').removeClass('active');
			$(this).addClass('active');
			$('.tab-panel').removeClass('active');
			$('#'+tabId).addClass('active');
		  });
		
	  })

	  const init = async () => {
		let _web3 = new Web3(web3Provider);
		let _privateSaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
		let _arrayLength = await _privateSaleContract.methods.getPresaleCount().call()  ;
		console.log(_arrayLength);

		let _upcomingArray = [] ; 
		let _liveArray = [] ; 
		let _successArray = [] ; 
		let _failArray = [] ; 

        let getData = await fetch("https://address-marketplace.herokuapp.com/api/allData");
        getData = await getData.json();
		console.log(getData.resObj._live)
		setUpcomingArray(getData.resObj._upcoming == " " ? [] : getData.resObj._upcoming.split(",") )
		setLiveArray(getData.resObj._live ==  " " ? [] : getData.resObj._live.split(",") )
		setSuccessArray(getData.resObj._success == " " ? [] : getData.resObj._success.split(",") )
		setFailArray(getData.resObj._fail == "" ? [] : getData.resObj._fail.split(",") )
	  

		

		// for(let i = 0 ; i < _arrayLength ; i++){

		// let _presale = await _privateSaleContract.methods.getPresale(i).call()  ;

		// if(_presale.status == 1 && _presale.startTime > new Date().getTime()/1e3 ){
		// 	_upcomingArray.push({
		// 		count: i 
		// 	});
		// }
		// else if(_presale.status == 1 && _presale.startTime < new Date().getTime()/1e3 ){
		// 	_liveArray.push({
		// 		count: i 
		// 	});
		// }
		// else if(_presale.status == 2  || _presale.status == 4 || _presale.status == 5 || _presale.status == 6 ){
		// 	_successArray.push({
		// 		count: i 
		// 	});
		// }
		// else if(_presale.status == 3  && _presale.raisedAmount > 0 ){
		// 	_failArray.push({
		// 		count: i 
		// 	});
		// }
			


		// 	if(i == (_arrayLength  -1)){

		// 		setUpcomingArray(_upcomingArray.reverse());
		// 		setLiveArray(_liveArray.reverse());
		// 		setSuccessArray(_successArray.reverse());
		// 		setFailArray(_failArray.reverse());

		// 	}
		// }
	  }
 
		return(
			<div>
			 
			<div id="createpresalebg">
				
				<div className="container">
					<div className="content-wrapper">
					<div className="content">
						{/* <Trending /> */}
						
						<div className="">
						<div className="padchain-box">
							{/* <div className="wrp-presale">
								
								<div className="presale-child2">
									<div className="wrp-search">
										<div className="search-box">
											<input placeholder="Enter token name or token symbol" />
										</div>
										<div className="search-icon">
											<img src={search1} />
										</div>
									</div>
								</div>
				
							</div> */}
							<ul class="tabs">
							<li class="tab-button">
								
								<a href="#" class="tab-link active" data-tab="tab1">
									<div className="tab-img">
										<img src={clock} className="lock" />
									</div>	
								Upcoming
								</a>
							</li>
							<li class="tab-button mrt-left">
								<a href="#" class="tab-link " data-tab="tab2">
									<div className="tab-img">
										<img src={live} />
									</div>
									Live
								</a>
							</li>
						
							<li class="tab-button mrt-left">
								<a href="#" class="tab-link" data-tab="tab3">
									<div className="tab-img">
										<img src={success2} />
									</div>
									Success
								</a>
							</li>
							<li class="tab-button mrt-left">
								<a href="#" class="tab-link" data-tab="tab4">
									<div className="tab-img">
										<img src={failing} />
									</div>
									Cancelled
								</a>
							</li>
							</ul>
							
						</div>
						</div>
						<div className="">
							<div class="tab-pane pdb-tab">
							<div class="tab-panel active" id="tab1">
								<div className="wrp-list-box">
								
								{
                                         upcomingArray.length > 0 && upcomingArray.map((v,i) => {
											if(v != ""){

                                             return (
                                                 <PadCard index={v} public={false} old={false}  />
                                             )
											 }
                                         })
                                     }

									 {
										 upcomingArray.length == 0 && 
										 <div className="text-center w-100 darkBg text-dark emptyCard d-flex align-items-center justify-content-center"><h4>No Presale Available to Show</h4></div>

									 }			
								</div>
								
							</div>
							<div class="tab-panel" id="tab2">
								
							<div className="wrp-list-box">
							{
                                         liveArray.length > 0 && liveArray.map((v,i) => {
											if(v != ""){

                                             return (
                                                 <PadCard index={v} public={false} old={false}  />
                                             )
											 }
                                         })
                                     }

									 {
										 liveArray.length == 0 && 
										 <div className="text-center w-100 darkBg text-dark emptyCard d-flex align-items-center justify-content-center"><h4>No Presale Available to Show</h4></div>

									 }	
							
								</div>
							
							</div>
							<div class="tab-panel" id="tab3">
									
							<div className="wrp-list-box">
							
								 
							{/* <OldPadCard   public={false}  index={0}  /> */}
							{
                                         successArray.length > 0 && successArray.map((v,i) => {
											if(v != ""){

                                             return (
                                                 <PadCard index={v} public={false} old={false}  />
                                             )
											 }
                                         })
                                     }

									 {
										 successArray.length == 0 && 
										 <div className="text-center w-100 darkBg text-dark emptyCard d-flex align-items-center justify-content-center"><h4>No Presale Available to Show</h4></div>

									 }
							 
									
								</div>
							</div>
							<div class="tab-panel" id="tab4">
							<div className="wrp-list-box">
									
							{
                                         failArray.length > 0 && failArray.map((v,i) => {
											if(v != ""){
                                             return (
                                                 <PadCard index={v} public={false} old={false}  />
                                             )
											}
                                         })
                                     }

									 {
										 failArray.length == 0 && 
										 <div className="text-center w-100 darkBg text-dark emptyCard d-flex align-items-center justify-content-center"><h4>No Presale Available to Show</h4></div>

									 }	

								 
									
								</div>
							</div>
						</div>
					</div>
					</div>
					</div>
				</div>
			</div>
			</div>
		);
 

}
export default Padchain;