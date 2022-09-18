import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import $ from "jquery";

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';

import { PRIVATE_SALE } from '../../../Config/index.js';
import  PRIVATE_SALE_ABI from '../../../Config/PRIVATE_SALE_ABI.json';
import  TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Web3 from 'web3';

const Createpresale =  () => { 
	const wallet = useWallet() ;
	let web3Provider  = window.ethereum ; 
 
	const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

	const [successModal, setSuccessModal] = useState(false);
    const successToggle = () => setSuccessModal(!successModal);

	const [completeModal, setCompleteModal] = useState(false);
    const completeToggle = () => setCompleteModal(!completeModal);


	const [name,setName] = useState(null);
	const [website,setWebsite] = useState(null);
	const [twitter,setTwitter] = useState(null);
	const [telegram,setTelegram] = useState(null);
	const [medium,setMedium] = useState(null);
	const [discord,setDiscord] = useState(null);
	const [slug,setSlug] = useState(null);
	const [slugAvailable,setSlugAvailable] = useState(true);
	const [token,setToken] = useState(null);
	const [tokenSymbol,setTokenSymbol] = useState(null);
	const [tokenDecimals,setTokenDecimals] = useState(0);
	
	const [raiseToken,setRaiseToken] = useState("0x0000000000000000000000000000000000000000");
	const [raiseTokenSymbol,setRaiseTokenSymbol] = useState("BNB");
	const [raiseTokenDecimals,setRaiseTokenDecimals] = useState(0);

	const [saleToken,setSaleToken] = useState("0x0000000000000000000000000000000000000000");
	const [saleTokenSymbol,setSaleTokenSymbol] = useState(null);
	const [saleTokenDecimals,setSaleTokenDecimals] = useState(0);

	const [publicSale,setPublicSale] = useState(false);
	// const [privateSale,setPrivateSale] = useState(true);
	const [tokenTax,setTokenTax] = useState(false);
	const [tokenTaxAmount,setTokenTaxAmount] = useState(0);
	
	const [tokenAllowance,setTokenAllowance] = useState(0);
	const [tokenBalance,setTokenBalance] = useState(0);
	const [tokenAmount,setTokenAmount] = useState(null);
	const [tokenAmountTax,setTokenAmountTax] = useState(0);
	const [softCap,setSoftCap] = useState(null);
	const [hardCap,setHardCap] = useState(null);
	const [saleRate,setSaleRate] = useState(null);
	const [listRate,setListRate] = useState(null);
	const [maxAllocation,setMaxAllocation] = useState(null);
	const [liquidityLock,setLiquidityLock] = useState(null);
	const [saleStart,setSaleStart] = useState(null);
	const [saleEnd,setSaleEnd] = useState(null);
	const [burnUnsold,setBurnUnsold] = useState(false);
	
	const [liquidityPercentage,setLiquidityPercentage] = useState(null);
	const [vesting,setVesitng] = useState(null);
	const [vestingSchedule,setVestingSchedule] = useState(0);
	const [vetsingPercentage,setVetsingPercentage] = useState(0);
	const [initialVetsingPercentage,setInitialVetsingPercentage] = useState(0);
	
	const [whitelist,setWhitelist] = useState(false);
	const [whitelistUsers,setWhitelistUsers] = useState(null);

	const [onlyTokenHolders,setOnlyTokenHolders] = useState(false);
	const [minimumToken,setMinimumToken] = useState(0);

 

	useEffect(() => {
		if(window.ethereum){
			web3Provider  = window.ethereum;
		  }
		  else{
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
		   
		  }
		 
	},[])

	useEffect(() => {
		if(token){
			getApproval(token);
			getBalance(token,tokenDecimals);
		}
	},[wallet.account])

	const getToken = async (e) => {
		let _web3 = new Web3(web3Provider);
		let _privateSaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
		let _v = e.target.value ; 
		setToken(_v);
		console.log(wallet.account);
		try{
			let _details = await _privateSaleContract.methods.getTokenInfo(_v).call()  ;
			setTokenSymbol(_details[1]); 
			setTokenDecimals(_details[2]); 
			
			if(wallet.account){
				getBalance(_v,_details[2]);
			}
		}
		catch(e){
			console.log(e)
		}

		

	}

	const getBalance = async (_t,_d) => {
		let _web3 = new Web3(web3Provider);
		let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_t);
		let _balance = await _tokenContract.methods.balanceOf(wallet.account).call() ;
		_balance = parseFloat(_balance/1e1**_d).toFixed(2) ; 
		console.log(_balance);
		setTokenBalance(_balance);
		getApproval(_t);
	}

	const getApproval = async (_t) => {
		let _web3 = new Web3(web3Provider);
		let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_t);
		let _allowance = await _tokenContract.methods.allowance(wallet.account,PRIVATE_SALE).call() ;		
		setTokenAllowance(_allowance)
	}

	const approveToken = () => {
		let _web3 = new Web3(web3Provider);
		let _tokenContract = new _web3.eth.Contract(TOKEN_ABI,token);
		let _amt = _web3.utils.toWei("10000000000000000000000000000000")
		setModal(!modal);
		_tokenContract.methods.approve(PRIVATE_SALE ,_amt).send({
			from: wallet.account
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			getApproval(token);
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}

	const createPrivatePresale = () => {
		let _web3 = new Web3(web3Provider);

		let _tokenO = token ;

		if(_tokenO == "0x3e9d6430144485873248251fCB92bD856E95D1CD" || _tokenO == "0x3e9d6430144485873248251fcb92bd856e95d1cd"){
			alert("You are not allowed");
			return false ; 
		}
		let _token = [_tokenO,saleToken,raiseToken];
		let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
		 
		let _details = {};
		_details['name'] = name ;
		_details['website'] = website ;
		_details['twitter'] = twitter ;
		_details['telegram'] = telegram ;
		_details['discord'] = discord ;
		_details['medium'] = medium ;
		_details['slug'] = slug ;
		_details = JSON.stringify(_details) ; 
		// _details = _details.replace(/"/g, "'");
		let _slug = slug;

		let _startTime = new Date(saleStart).getTime() / 1e3 ;
		// _startTime = _web3.utils.toBN(_startTime);
		let _endTime = new Date(saleEnd).getTime() / 1e3 ;
		// _endTime = _web3.utils.toBN(_endTime);

		// let _creator = wallet.account;
		let _softcap = parseFloat(softCap).toFixed();  
		_softcap = _web3.utils.toBN(_softcap).mul(_web3.utils.toBN(1e1 ** raiseTokenDecimals));
		let _hardCap = parseFloat(hardCap).toFixed(); 
		_hardCap = _web3.utils.toBN(_hardCap).mul(_web3.utils.toBN(1e1 ** raiseTokenDecimals));
		let _sRate = parseFloat(saleRate).toFixed() ; 
		let _saleRate = [_web3.utils.toBN(_sRate).mul(_web3.utils.toBN(1e1 ** tokenDecimals)) , _web3.utils.toBN(parseFloat(tokenTaxAmount*100).toFixed())] ;
		// _saleRate = _web3.utils.toBN(_saleRate);

		let _vestingScheduled = vestingSchedule;
		let _saleTokenLimit = 0 
		if(onlyTokenHolders){
			_saleTokenLimit = parseFloat(minimumToken).toFixed(); 
			_saleTokenLimit = _web3.utils.toBN(_saleTokenLimit).mul(_web3.utils.toBN(1e1 ** saleTokenDecimals));

		}
		let _vetsingPercentage = [initialVetsingPercentage*100,vetsingPercentage*100] ;
		let _whitelist = whitelist ; 
		let _publicSale = publicSale ; 
		let _time = [_startTime,_endTime] ; 
		let _cap = [_softcap,_hardCap] ; 
		let _burnUnsold = burnUnsold ; 
		let _max = parseFloat(maxAllocation).toFixed() ;  
		_max = _web3.utils.toBN(_max).mul(_web3.utils.toBN(1e1 ** raiseTokenDecimals));

		let _maxAllocation = [_saleTokenLimit,_max];
		console.log(_details,_slug,_token,_time,_cap,_saleRate,_maxAllocation,_vestingScheduled,_vetsingPercentage,_whitelist,_publicSale,_burnUnsold);
		setModal(!modal);
		_privatePresaleContract.methods.createPresale(_details,_slug,_token,_time,_cap,_saleRate,_maxAllocation,_vestingScheduled,_vetsingPercentage,_whitelist,_publicSale,_burnUnsold).send({
			from: wallet.account
		}).on('receipt', function(receipt){
			setModal(modal);
			
			if(_publicSale){
				completeToggle() ;
				reset();
			}
			else{
				successToggle() ;
				reset();
			}
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}

	const reset = () => {
		setToken(null);
		setTokenSymbol(null);
		setTokenBalance(0);
		// setPrivateSale(true);
		setPublicSale(false);

		setTokenAmount(0);
		setTokenAmountTax(0)
		setSoftCap(0);
		setHardCap(0);
		setSaleRate(0);
		setMaxAllocation(0);
		setSaleStart(null);
		setSaleEnd(null);
		setName(null);
		setWebsite(null);
		setTwitter(null);
		setTelegram(null);
		setMedium(null);
		setDiscord(null);
		setTokenAllowance(0);
		setWhitelist(false)
		setOnlyTokenHolders(false)
		setMinimumToken(0)
	}

	
	const handleTaxType = (e) => {
		if(e.target.value == 0){
			setTokenTax(false);
		 
		}
		else{
			setTokenTax(true);

		}
	}

	const handleTokenTaxAmount = (e) => {
 
			setTokenTaxAmount(e.target.value);
			let _tax = parseFloat((tokenAmount*e.target.value)/100) ; 
			_tax = parseFloat(_tax + parseFloat(tokenAmount)).toFixed(2) ;
			setTokenAmountTax(_tax)
		 
	}
	

	const handleSaleType = (e) => {
		if(e.target.value == 1){
			setPublicSale(false);
			// setPrivateSale(true);
		}
		else{
			setPublicSale(true);
			// setPrivateSale(false);
		}
	}

	
	const handleTokenAmount = (e) => {
		setTokenAmount(e.target.value);
		if(e.target.value > 0 && saleRate > 0 ){
			let _hardCap = parseFloat(e.target.value/saleRate).toFixed(2);
			setHardCap(_hardCap) ;
			
		}
		let _tax = parseFloat((tokenTaxAmount*e.target.value)/100) ; 
			_tax = parseFloat(_tax + parseFloat(e.target.value)).toFixed(2) ;
			setTokenAmountTax(_tax)
	}

	const handleSoftCap = (e) => {
		setSoftCap(e.target.value);
	}

	const handleHardCap = (e) => {
		setHardCap(e.target.value);
	}

	const handleSaleRate = (e) => {
		setSaleRate(e.target.value);
		if(e.target.value > 0 && tokenAmount > 0 ){
			let _hardCap = parseFloat(tokenAmount/e.target.value).toFixed(2);
			setHardCap(_hardCap) 
		}
	}

	const handleMaxAllocation = (e) => {
		setMaxAllocation(e.target.value);
	}

	const handleStartDate = (e) => {
		setSaleStart(e.target.value);
	}

	const handleEndDate = (e) => {
		setSaleEnd(e.target.value);
	}

	
	const handleUnsoldToken = (e) => {
		if(e.target.value == 1){
			setBurnUnsold(true) ;
		} 
		else {
			setBurnUnsold(false) ;
	 

		}
	}
	const handleTokenHolders = (e) => {
		if(e.target.value == 1){
			setOnlyTokenHolders(true) ;
		} 
		else {
		setOnlyTokenHolders(false) ;
		setMinimumToken(0);

		}
	}

	const handleMinimumToken = (e) => {
		setMinimumToken(e.target.value) ;
	}

	const handleName = (e) => {
		setName(e.target.value);
	}

	const handleWebsite = (e) => {
		setWebsite(e.target.value);
	}

	const handleTwitter = (e) => {
		setTwitter(e.target.value);
	}
	
	const handleTelegram = (e) => {
		setTelegram(e.target.value);
	}
	
	const handleMedium = (e) => {
		setMedium(e.target.value);
	}
	
	const handleDiscord = (e) => {
		setDiscord(e.target.value);
	}

	const handleSlug = async(e) => {
		let _slug  = e.target.value.replace(/ /g,"_") ; 
		setSlug(_slug); 
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
		let _slugAvail = await _privatePresaleContract.methods.presaleListSlugExist(_slug).call() ;
		console.log(_slugAvail)
		setSlugAvailable(!_slugAvail);
	}

	

	const handleSaleToken =  async (e) => {
		let _web3 = new Web3(web3Provider);
		let _privateSaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
		if(e.target.value == ""){
			setSaleToken('0x0000000000000000000000000000000000000000')
		}
		try{
			let _details = await _privateSaleContract.methods.getTokenInfo(e.target.value).call()  ;
			setSaleTokenSymbol(_details[1]); 
			setSaleTokenDecimals(_details[2]); 
			setSaleToken(e.target.value)
		 
		}
		catch(e){
			setSaleToken('0x0000000000000000000000000000000000000000')
			console.log(e)
		}

		
	}
	const handleRaiseToken =  async (e) => {
		let _web3 = new Web3(web3Provider);
		let _privateSaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI,PRIVATE_SALE);
		if(e.target.value == ""){
			setRaiseToken('0x0000000000000000000000000000000000000000')
		}
		try{
			let _details = await _privateSaleContract.methods.getTokenInfo(e.target.value).call()  ;
			setRaiseTokenSymbol(_details[1]); 
			setRaiseTokenDecimals(_details[2]); 
			setRaiseToken(e.target.value)
		 
		}
		catch(e){
			setRaiseToken('0x0000000000000000000000000000000000000000')
			console.log(e);
		}

		
	}
	

	const handleLockTime = (e) => {
		setLiquidityLock(e.target.value);
	}

	const handleLiquidityPercentage = (e) => {
		setLiquidityPercentage(e.target.value);
	}

	const handleVestingSchedule = (e) => {
		let _vestingScheduled = parseFloat(e.target.value*86400).toFixed() ; 
		setVestingSchedule(_vestingScheduled);
	}

	const handleVestingPercentage = (e) => {
		setVetsingPercentage(e.target.value);
	}

	
	const handleInitialVestingPercentage = (e) => {
		setInitialVetsingPercentage(e.target.value);
	}
	const handleWhitelist = (e) => {
		if(e.target.value == 0){
			setWhitelist(false);
		}
		else{
			setWhitelist(true);
		}
	 
	}
	
		return(
			<div>
				{/* <Header /> */}
				<div id="createpresalebg">
				
					<div className="container">
					<div className="presale-page">
					<div className="content">
                        <div className="presale-head">
                            <h3>Create Your Presale</h3>
                        </div>	
						<div className="verify-box2">
						<div className="token-input" id="presale">
									<div className="wrp-verify-box">
									<div className="verify-left-box ">	
									<div className="softcap-content">
									<div className="liquidity-c-box">
												<h3>Paste Token Address</h3>
												<div className="wrp-softcap">
												 
														<input placeholder="Token address" value={token} onChange={getToken} />

													</div>
													 
												</div>
												
											</div>
									 
									</div>
									<div className="verify-right-box">
											<div className="liquidity-c-box">
												<h3>Sale Type</h3>
												<select class="form-control12" onChange={handleSaleType} id="exampleFormControlSelect1">
													<option value="1" selected>Private</option>
													<option value="2" >Public</option>
												 
												</select>
											</div>
										</div>
								</div>
								</div>
								
								{
									tokenSymbol &&
									<>
									{/* <div className="wrp-verify-box">
									<div className="verify-left-box ">
									<div className="liquidity-c-box">
												<h3>Does your token has taxes ?</h3>
												<select class="form-control12" onChange={handleTaxType} id="exampleFormControlSelect1">
													<option value="0" selected>No</option>
													<option value="1">Yes</option>
												 
												</select>
											</div>	
								
									 
									</div>
									{
										tokenTax &&
								<div className="verify-right-box">
									<div className="softcap-content">
									<div className="liquidity-c-box">
												<h3>How much tax % does your token has ?</h3>
												<div className="wrp-softcap">
												 
														<input placeholder="Token address" value={tokenTaxAmount} onChange={handleTokenTaxAmount} />

													</div>
													 
												</div>
												
											</div>
										</div>
									} 
									
								</div>*/}
								<div className="unknow-presale-content">
								
								<div className="tbg-box">
									<div className="wrpknow">
										<div className="input-know">
										<h3>How many token are up for presale?</h3>
											<input onChange={handleTokenAmount} placeholder="0.0" />
									{/* <p className="text-white" >Deduction: {tokenAmountTax} {tokenSymbol}</p> */}
									<p className="" >Note: If your token has taxes please whitelist our Presale Contract {PRIVATE_SALE}</p>

										</div>
										<div className="know-content">
										<p>Balance: {tokenBalance}</p>
											<p>{tokenSymbol	}</p>
										</div>
									</div>
								</div>
								
								
							</div>
							<ul className="presale-list">
								
							<li>
									<div className="wrp-verify-box">
										<div className="verify-left-box">
										<div className="presalerate-box">
											<h5>Paste Raise Token Address (Leave Empty to raise in BNB) </h5>
											<div className="wrp-softcap">
												<div className="softcap-left">
											<input placeholder="0x000.."  onChange={handleRaiseToken} />
											</div>
										</div>
										</div>
										</div>
										 
										
									</div>
								</li>
							<li>
									<div className="wrp-verify-box">
										<div className="verify-left-box">
										<div className="presalerate-box">
											<h5>Presale rate </h5>
											<h3>1 {raiseTokenSymbol} = <input placeholder="00"  onChange={handleSaleRate} /></h3>
										</div>
										</div>
										<div className="verify-right-box">
											<div className="softcap-content mrt-location">
											<h3>Max allocation per user <span>(Must be above 0)</span></h3>
											<div className="wrp-softcap">
												<div className="softcap-left">
													<input placeholder="0.0"  onChange={handleMaxAllocation} />
												</div>
												<div className="softcap-right">
													<p>{raiseTokenSymbol}</p>
												</div>
											</div>
											
											</div>
										</div>
										
									</div>
								</li>
								<li>
									<div className="wrp-verify-box">
										<div className="verify-left-box">
											<div className="softcap-content">
												
												<div className="wrp-softcap">
													<div className="softcap-left">
														<span>Softcap</span>
														<input onChange={handleSoftCap} placeholder="0.0" />
													</div>
													<div className="softcap-right">
														<p>{raiseTokenSymbol}</p>
													</div>
												</div>
												
											</div>
										</div>
										<div className="verify-right-box">
											<div className="softcap-content">
												<div className="wrp-softcap">
													<div className="softcap-left">
														<span>Hardcap</span>
														<input onChange={handleHardCap} value={hardCap} placeholder="0.0" />
													</div>
													<div className="softcap-right">
														<p>{raiseTokenSymbol}</p>
													</div>
												</div>
												
											</div>
										</div>
									</div>
								</li>
							
								<li className="mt-3">
									<div className="wrp-verify-box">
										<div className="verify-left-box">
										<div className="wrp-verify-box">
										<div className="verify-left-box">
											<div className="date-content-box">
												<h3 className="start-d">Start Date</h3>
												<div className="date-box">
													<div className="date-box-left">
														<div className="datetime-input"><input type="datetime-local" id="birthdaytime" name="text"  onChange={handleStartDate} /></div>
														
													</div>
													
												</div>
											</div>
										</div>
										<div className="verify-right-box">
											<div className="date-content-box">
													<h3>End Date</h3>
													<div className="date-box">
														<div className="date-box-left">
															<div className="datetime-input"><input type="datetime-local" id="birthdaytime"  onChange={handleEndDate} name="text" /> </div>
															
														</div>
														
													</div>
												</div>
										</div>
									</div>
									</div>
									<div className="verify-right-box">
									<div className="date-content-box">
												<h3 className="start-d">What to do with unsold tokens ?</h3>
												<select class="form-control12" onChange={handleUnsoldToken} id="exampleFormControlSelect1">
													<option value="0" selected>Refund</option>
													<option value="1">Burn</option>												 
												</select>
											</div>
									</div>

									</div>
								</li>
								 
								<li className="mt-3">
									<div className="wrp-verify-box">
										<div className="verify-left-box">
											<div className="date-content-box">
												<h3 className="start-d">Only for Single Token Holders ?</h3>
												<select class="form-control12" onChange={handleTokenHolders} id="exampleFormControlSelect1">
													<option value="0" selected>No</option>
													<option value="1">Yes</option>												 
												</select>
											</div>
										</div>
										{
											onlyTokenHolders &&
											<>
											<div className="verify-right-box">
											<div className="date-content-box">
												<h3 className="start-d">Paste Token Adress</h3>
												<div className="date-box">
														<div className="date-box-left">
															<div className="datetime-input"><input type="text" placeholder='0x0...'  onChange={handleSaleToken} name="text" /> </div>
															
														</div>
														
													</div>
												
											</div>
										</div>
										<div className="verify-right-box">
										<div className="date-content-box">
											<h3 className="start-d">Minimum Token to Hold for Participation ?</h3>
											<div className="date-box">
													<div className="date-box-left">
														<div className="datetime-input"><input type="text" value={minimumToken}  onChange={handleMinimumToken} name="text" /> </div>
														
													</div>
													
												</div>
											
										</div>
									</div>
									</>
										}
										
									</div>

								</li>
								<li className="mt-3">
									<div className="wrp-verify-box">
										<div className="verify-left-box">
											<div className="date-content-box">
												<h3 className="start-d">Only for Whitelisted ?</h3>
												<select class="form-control12" onChange={handleWhitelist} id="exampleFormControlSelect1">
													<option value="0" selected>No</option>
													<option value="1">Yes</option>												 
												</select>
											</div>
										</div>
										<div className="verify-right-box">
											<div className="date-content-box">
												<h3 className="start-d">Vesting ?</h3>
												<select class="form-control12" onChange={handleVestingSchedule} id="exampleFormControlSelect1">
													<option value="0" selected>No</option>
													<option value="1">Daily</option>
													<option value="7">Weekly</option>
													<option value="30">Monthly</option>
													<option value="365">Yearly</option>
												 
												</select>
											</div>
										</div>
									</div>

								</li>
								<li className="mt-3">
									<div className="wrp-verify-box">
										
										{
											vestingSchedule > 0 &&
											<>
										<div className="verify-left-box">
											<div className="date-content-box">
													<h3>Initial Vesting Percentage</h3>
													<div className="date-box">
														<div className="date-box-left">
															<div className="datetime-input"><input type="text" id="birthdaytime"  onChange={handleInitialVestingPercentage} name="text" /> </div>
															
														</div>
														
													</div>
												</div>
										</div>
											<div className="verify-right-box">
											<div className="date-content-box">
													<h3>Regular Vesting Percentage</h3>
													<div className="date-box">
														<div className="date-box-left">
															<div className="datetime-input"><input type="text" id="birthdaytime"  onChange={handleVestingPercentage} name="text" /> </div>
															
														</div>
														
													</div>
												</div>
										</div>
										</>
											}
									</div>
								</li>
								
								<li className="mt-3">
									<div className="wrp-verify-box">
										<div className="verify-left-box">
											<div className="date-content-box">
												<h3 className="start-d">Project Name</h3>
												<div className="date-box">
													<div className="date-box-left">
														<div className="datetime-input"><input type="text" onChange={handleName}  /></div>
														
													</div>
													
												</div>
											</div>
										</div>
										<div className="verify-right-box">
											<div className="date-content-box">
													<h3>Project Website</h3>
													<div className="date-box">
														<div className="date-box-left">
															<div className="datetime-input"><input type="text" onChange={handleWebsite} /> </div>
															
														</div>
														
													</div>
												</div>
										</div>
									</div>
								</li>
								<li className="mt-3">
									<div className="wrp-verify-box">
										<div className="verify-left-box">
											<div className="date-content-box">
												<h3 className="start-d">Twitter</h3>
												<div className="date-box">
													<div className="date-box-left">
														<div className="datetime-input"><input type="text" onChange={handleTwitter} /></div>
														
													</div>
													
												</div>
											</div>
										</div>
										<div className="verify-right-box">
											<div className="date-content-box">
													<h3>Telegram</h3>
													<div className="date-box">
														<div className="date-box-left">
															<div className="datetime-input"><input type="text" onChange={handleTelegram} /> </div>
															
														</div>
														
													</div>
												</div>
										</div>
									</div>
								</li>
								<li className="mt-3">
									<div className="wrp-verify-box">
										<div className="verify-left-box">
											<div className="date-content-box">
												<h3 className="start-d">Medium</h3>
												<div className="date-box">
													<div className="date-box-left">
														<div className="datetime-input"><input type="text" onChange={handleMedium} /></div>
														
													</div>
													
												</div>
											</div>
										</div>
										<div className="verify-right-box">
											<div className="date-content-box">
													<h3>Discord</h3>
													<div className="date-box">
														<div className="date-box-left">
															<div className="datetime-input"><input type="text" onChange={handleDiscord} /> </div>
															
														</div>
														
													</div>
												</div>
										</div>
									</div>
								</li>
								
								<li className="mt-3">
									<div className="wrp-verify-box">
										<div className="verify-left-box">
											<div className="date-content-box">
												<h3 className="start-d">Project Sale Slug</h3>
												<div className="date-box">
													<div className="date-box-left">
														<div className="datetime-input"><input type="text" onChange={handleSlug} value={slug} /></div>
														
													</div>
													{
														slug  ? 
														slugAvailable ? 
														<span>Slug is Available</span>
														: 
														<span>Slug is not Available</span>
														:
														<span></span>
													}
												</div>
											</div>
										</div>
										 
									</div>
								</li>
								
							</ul>
							<div className="approve-text">
								<h5 className="mt-3 font-size-large">Note: You will be able to manage whitelisted users only after pre-sale is created. </h5> 
								{
									tokenAllowance == 0 ?
									<button className="approve-btns" onClick={approveToken} >Approve {tokenSymbol}</button>
									:
									<button className="approve-btns" onClick={createPrivatePresale} >Create Presale</button>
								}
							</div>
							</>
								}
						</div>
	 
 
					</div>
					</div>
					</div>
			</div>
				
			<Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
 </Modal>
 
 <Modal isOpen={completeModal} toggle={completeToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Successfull. Since you have opted for pulic sale, please configure the LP tokens and Team token Lock settings.</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={() => window.location.replace('/complete/'+slug)}>Proceed</Button>
    
 </Modal>
 <Modal isOpen={successModal} toggle={successToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Successfull...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={successToggle}>Close</Button>
    
 </Modal>
			</div>
		);
 

}
export default Createpresale;