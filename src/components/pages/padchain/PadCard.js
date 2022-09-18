import React, { Component, useEffect, useState } from 'react';

import $ from "jquery";


import user from '../../images/user.png';
import piechart from '../../images/piechart.png';

import cancel from '../../images/Cancel.png';
import lightlogo from '../../images/WizardFlying.gif';
import success2 from '../../images/success2.png';
import failing from '../../images/failing.png';

import { PRIVATE_SALE } from '../../../Config/index.js';
import PRIVATE_SALE_ABI from '../../../Config/PRIVATE_SALE_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Web3 from 'web3';


const PadCard = (props) => {

	const wallet = useWallet();
	let web3Provider = window.ethereum;
	const [array, setArray] = useState(null);
	const [presale, setPresale] = useState({});
	const [presaleDetails, setPresaleDetails] = useState({});
	const [progress, setProgress] = useState(0);
	const [logo, setLogo] = useState(lightlogo);
	const [raiseSymbol, setRaiseSymbol] = useState("BNB");
	
	const [participants, setParticipants] = useState(0);
	const [publicSale, setPublicSale] = useState(false);
	const [lockPerc, setLockPerc] = useState(0);
	var check = null;

	useEffect(() => {
		if (window.ethereum) {
			web3Provider = window.ethereum;
		}
		else {
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')

		}
		setInterval(() => {
			init()
		}, 3000);
	}, [])


	useEffect(() => {

		$('.tabs').on('click', 'a', function (e) {
			e.preventDefault();
			var tabId = $(this).attr('data-tab');
			$(this).closest('.tabs').find('a').removeClass('active');
			$(this).addClass('active');
			$('.tab-panel').removeClass('active');
			$('#' + tabId).addClass('active');
		});

	})

	const init = async () => {
		let _web3 = new Web3(web3Provider);
		let _privateSaleContract = new _web3.eth.Contract(PRIVATE_SALE_ABI, PRIVATE_SALE);
		let _presale = await _privateSaleContract.methods.getPresale(props.index).call();
		let _participants = await _privateSaleContract.methods.getParticipants(props.index).call();

		let _tokenContract = new _web3.eth.Contract(TOKEN_ABI, _presale.token);
		try{
			let _tokenRaiseContract = new _web3.eth.Contract(TOKEN_ABI, _presale.raiseToken);
			let _rSymbol = await _tokenRaiseContract.methods.symbol().call();
			setRaiseSymbol(_rSymbol);
	
		}
		catch {

		}
		let _tSupply = await _tokenContract.methods.totalSupply().call();
		// let _decimals = await _tokenContract.methods.decimals().call() ;
		let _lockPerc = (_presale.teamLockTokenAmount / _tSupply) * 100;
		setLockPerc(_lockPerc);


		setParticipants(_participants)
		setPresale(_presale);
		setPublicSale(_presale.publicSale);
		let _presaleDetails = JSON.parse(_presale.details);
		setPresaleDetails(_presaleDetails);
		let _progress = parseFloat((_presale.raisedAmount / _presale.hardCap) * 100).toFixed(2);
		setProgress(_progress);
		let url = _presaleDetails.website.replace(/\/$/, "") + "/logo.png";
		console.log(url);
		// let url = "https://mprogame.com/logo.png" ;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			// console.log(this.status);
			if (this.readyState == 4 && this.status == 200) {
				setLogo(url)
			}
		}
		xhttp.open("HEAD", url, true);
		xhttp.send();
	}

	return (
		<div className="list-box-l">
			<a href={"/iwo/details/" + presaleDetails.slug} >
				<div className="wrp-bitrides">
					<div className="bitrides-img">
					</div>
					<div className="bitrides-content">
						<div className="d-flex justify-content-between">
							<div className="date-n">
								<h3 className="font-weight-bold" >{presaleDetails.name} </h3>
								<p>{new Date(presale.startTime * 1e3).toLocaleString()}</p>
							</div>
							<div>
								<img width="80px" src={logo} />

							</div>
						</div>
						{/* <div className="d-flex justify-content-between mt-3" >

							<span className="blue-99 blue-100">Mint Function <img src={(presale.mintable ? check : cancel)} className="charts" /></span>
							<span className="blue-99 blue-100"> Audit <img src={(presale.audit ? check : cancel)} className="charts" /></span>
							<span className="blue-99 blue-100"> KYC <img src={(presale.kyc ? check : cancel)} className="charts" /></span>
							<span className="blue-99 blue-100"> Insured <img src={(presale.insured ? check : cancel)} className="charts" /></span>

						</div> */}
						<div>
							<h5 className="font-weight-bold mt-2" > {presale.whitelisted ? "Whitlisted Users Only" : ""} </h5>
							<div className="progressbar-container">
								<div className="progressbar" style={{ width: progress + "%" }}></div>
								{/* change */}
								<div className="row">
									<div className="col-md-6">
										<div className="progressbar-left"><b>{parseFloat(presale.raisedAmount / 1e18).toFixed(2)}/{presale.hardCap / 1e18}  {raiseSymbol}</b></div>
									</div>
									<div className="col-md-6">
										<div className="progressbar-right"><b>{parseFloat(presale.raisedAmount / 1e18).toFixed(2)} {raiseSymbol}</b></div>
									</div>
								</div>
								{/* change */}
							</div>
							{/* change */}

							<div className="wrp-circle-area">
								{
									publicSale &&
									<div className="c-progressbar1">
										<div class="progress-circle2 over50 p70">
											<span><img src={piechart} className="locks2" /></span>
											<div class="left-half-clipper2">
												<div class="first50-bar2"></div>
												<div class="value-bar2"></div>
											</div>
										</div>
										<div className="caption-p2">
											<h3>{parseFloat(presale.liquidtyPercentage / 100).toFixed(2)}%</h3>
											<p>Liquidity Lockup</p>
										</div>
									</div>
								}

								<div className="c-progressbar1">
									<div class="progress-circle2 over50 p100">
										<span><img src={user} className="locks2" /></span>
										<div class="left-half-clipper2">
											<div class="first50-bar2"></div>
											<div class="value-bar2"></div>
										</div>
									</div>
									<div className="caption-p2">
										<h3>{participants}</h3>
										<p>Participants</p>
									</div>
								</div>
								{
									publicSale &&
									<div className="c-progressbar1">
										<div class="progress-circle2 over50 p89">
											<span><img src={piechart} className="locks2" /></span>
											<div class="left-half-clipper2">
												<div class="first50-bar2"></div>
												<div class="value-bar2"></div>
											</div>
										</div>
										<div className="caption-p2">
											<h3>{lockPerc}%</h3>
											<p>Token Locked</p>
										</div>
									</div>
								}

							</div>

							{/* changes */}
						</div>
					</div>
				</div>
			</a>

		</div>
	);


}
export default PadCard;