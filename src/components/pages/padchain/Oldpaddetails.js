import React, { Component, useEffect , useState } from 'react';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";


import Header from '../header.js';
import Footer from '../footer.js';

import search1 from '../../images/search1.png';
import upcoming from '../../images/upcoming.png';
import date from '../../images/date.png';
import clock from '../../images/clock.png';
import live from '../../images/live.png';
import success from '../../images/success.png';
import close from '../../images/close.png';
import chart from '../../images/chart.png';
import locks from '../../images/locks.png';
import user from '../../images/user.png';
import piechart from '../../images/piechart.png';
import calendar from '../../images/calendar.png';

import lightlogo from '../../images/light_logo.png';
import cancel from '../../images/Cancel.png';

import { OLD_PRIVATE_SALE } from '../../../Config/index.js';
import  OLD_PRIVATE_SALE_ABI from '../../../Config/OLD_PRIVATE_SALE_ABI.json';

import  TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Web3 from 'web3';
import ConnectButton from '../ConnectButton.js';



const Oldpaddetails = (props) => { 
    const {slug} = props.match.params ; 
    const wallet = useWallet() ;
	let web3Provider  = window.ethereum ; 
	const [array,setArray] = useState(null);
	const [presale,setPresale] = useState({});
	const [presaleDetails,setPresaleDetails] = useState({});
	const [tokenDetails,setTokenDetails] = useState({});
	const [teamNextClaimTime,setTeamNextClaimTime] = useState(0);
    
    
	const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

	const [successModal, setSuccessModal] = useState(false);
    const successToggle = () => setSuccessModal(!successModal);
    
	const [tokenDue,setTokenDue] = useState(0);
	const [tokenPurchased,setTokenPurchased] = useState(0);
    
	const [nextClaim,setNextClaim] = useState(0);
    
	const [tokenDueNow,setTokenDueNow] = useState(0);
	const [teamTokenDueNow,setTeamTokenDueNow] = useState(0);
    
	const [status,setStatus] = useState(0);
	const [progress,setProgress] = useState(0);
	const [logo,setLogo] = useState(lightlogo);
	const [participants,setParticipants] = useState(0);
	const [participantFetching,setParticipantFetching] = useState(false);
	const [publicSale,setPublicSale] = useState(false);
    
    const [bnbBalance,setbnbBalance] = useState(0);
    const [depositAmount,setDepositAmount] = useState(0);
    const [presaleId,setPresaleId] = useState(null);
    const [day,setDay] = useState(null);
    const [hour,setHour] = useState(null);
    const [minute,setMinute] = useState(null);
    const [second,setSecond] = useState(null);
    const [whitlistuser,setwhitlistusers] = useState(null);
    const [checkwhitlistuser,setcheckwhitlistusers] = useState(null);
    const [whitelistedtrue,setWhitelistedtrue] = useState(null);
    var check = null;
    

	
	useEffect(() => {
		if(window.ethereum){
			web3Provider  = window.ethereum;
		  }
		  else{
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
		   
		  }
		  init()
	},[wallet.account])

 
	

	// useEffect(() =>{
    //     const countdown = () => {
    //         const countDate = new Date('December 2, 2021 00:00:00').getTime();
    //         const now = new Date().getTime();
    //         const gap = countDate - now;
          
    //         const second = 1000,
    //           minute = second * 60,
    //           hour = minute * 60,
    //           day = hour * 24;
          
    //         const textDay = Math.floor(gap / day),
    //           textHour = Math.floor((gap % day) / hour),
    //           textMinute = Math.floor((gap % hour) / minute),
    //           textSecond = Math.floor((gap % minute) / second);
          
    //         document.querySelector('.day').innerText = textDay;
    //         document.querySelector('.hour').innerText = textHour;
    //         document.querySelector('.minute').innerText = textMinute;
    //         document.querySelector('.second').innerText = textSecond;
    //       };
          
    //       setInterval(countdown, 1000);
          

	// 	$('.tabs').on('click','a',function(e){
	// 		e.preventDefault();
	// 		var tabId = $(this).attr('data-tab');
	// 		$(this).closest('.tabs').find('a').removeClass('active');
	// 		$(this).addClass('active');
	// 		$('.tab-panel').removeClass('active');
	// 		$('#'+tabId).addClass('active');
	// 	  });



    //     //   pie chart js
    //     var options = {
    //         chart: {
    //             type: "donut",
    //             // zorgt dat de donut groter wordt en de legenda weg is.
    //             sparkline: {
    //                 enabled: true
    //             },
    //             dropShadow: {
    //                 enabled: false,
    //             },
    //         },
    //         // deze staan vast
    //         series: [44, 56],
    //         labels: ["Presale", "Liquidity"],
    //         // voegt % toe aan de labels en toont waarden in de donut
    //         dataLabels: {
    //             enabled: true,
    //              style: {
    //                 fontSize: '14px',
    //                 colors: ['#fff','#222'],
    //              },
    //             formatter: function(val) {
    //                 return val + "%";
    //             }
    //         },
            
    //         colors: ["#e9dc00", "#8897aa"],
            
    //         // zorgt voor standaard tooltip en correct weergave van de waarde
    //         tooltip: {
    //             enabled: true,
    //             fillSeriesColor: false,
    //             y: {
    //                 formatter: function(val) {
    //                     return val + "%";
    //                 }
    //             }
    //         },
            
    //         // zorgt ervoor dat de hovercolor gelijk is aan de standaard kleur
    //         states: {
    //             hover: {
    //                 filter: {
    //                     type: "none"
    //                 }
    //             }
    //         },
            
            
    //         plotOptions: {
    //             pie: {
    //                 // mag aan of uit (animatie)
    //                 expandOnClick: true,
    //                 // Weergave in het midden van de donut
    //                 donut: {
    //                     labels: {
    //                         show: true,
    //                         name: {
    //                             color: '#262c37',
    //                             fontSize: "18px",
    //                             lineHeight: "20px",
    //                         },
    //                         value: {
    //                             fontSize: "18px",
    //                             formatter: function(val) {
    //                                 return val + "%";
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     };
        
    //     var chart = new ApexCharts(document.querySelector("#chart"), options);
        
    //     chart.render();
		
	//   })

      const init = async () => {
		let _web3 = new Web3(web3Provider);
		let _privateSaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
		let _presaleFromSlug = await _privateSaleContract.methods.presaleListSlug(slug).call() ;
        setPresaleId(_presaleFromSlug);
		let _presale = await _privateSaleContract.methods.getPresale(_presaleFromSlug).call() ;
		let _tokenDetails = await _privateSaleContract.methods.getTokenInfo(_presale.token).call()  ;
        if(wallet.account){
            console.log("here");
            _web3.eth.getBalance(wallet.account).then(function(_balance){
                setbnbBalance(_web3.utils.fromWei(_balance));

            }) 
            try{
                
            let _tokenDue = await _privateSaleContract.methods.getTokenDue(_presaleFromSlug,wallet.account).call()  ;
            console.log(_tokenDue);
            
            setTokenPurchased( parseFloat(_tokenDue[0]/1e1 ** _tokenDetails[2]).toFixed(2));
            setTokenDue( parseFloat(_tokenDue[1]/1e1 ** _tokenDetails[2]).toFixed(2));
            setTokenDueNow( parseFloat(_tokenDue[2]/1e1 ** _tokenDetails[2]).toFixed(2));
       
        }
        catch(e){
            console.log(e);
        }
        try{
            let _teamTokenDue = await _privateSaleContract.methods.getTeamTokenDue(_presaleFromSlug).call()  ;
            console.log(_presaleFromSlug);
            console.log(_teamTokenDue);
            setTeamTokenDueNow(_teamTokenDue);
            
            let _nextClaim = await _privateSaleContract.methods.getNextClaim(_presaleFromSlug,wallet.account).call()  ;
            setNextClaim(_nextClaim)
        }
        catch(e){
            console.log(e);

        }

 
        }
        console.log(_presale);
        try{
        let _lastTeamClaim = await _privateSaleContract.methods.teamTokenClaimTime(_presaleFromSlug).call()  ;
        if(_lastTeamClaim == 0 ){
             
            setTeamNextClaimTime(_presale.teamLockTokenTime*1000);
        }
        else{
            let _nextClaimTime = (parseInt(_lastTeamClaim)+parseInt(_presale.teamUnlockTokenInterval))*1e3;
        console.log(_nextClaimTime);
        console.log(_lastTeamClaim);
        console.log(_presale.teamUnlockTokenInterval);

            setTeamNextClaimTime(_nextClaimTime);
        }

    }
    catch(e){
        console.log(e);
    }

        setTokenDetails(_tokenDetails);
      
        setPresale(_presale);
        setPublicSale(_presale.publicSale)
        let _presaleDetails = JSON.parse(_presale.details) ;
        setPresaleDetails(_presaleDetails) ;
        let _progress = parseFloat((_presale.raisedAmount/_presale.hardCap ) *100).toFixed(2);
         
        setProgress(_progress);
        console.log(_presale.status);
        console.log(_presale.active);
        getTimer(_presale.startTime,_presale.endTime);
        let url = _presaleDetails.website.replace(/\/$/, "")+"/logo.png" ;
        // let url = "https://mprogame.com/logo.png" ;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log(this.status);
            if (this.readyState == 4 && this.status == 200) {
                    setLogo(url)
            }
        }
        xhttp.open("HEAD", url, true);
        xhttp.send();
         
 
        let _participants = await _privateSaleContract.methods.getParticipants(_presaleFromSlug).call() ;
        setParticipants(_participants);
        
        // if(!participantFetching){
        //     let _participants = await _privateSaleContract.methods.getParticipants(_presaleFromSlug).call() ;

        //     setParticipantFetching(true);
        //     let _users = [] ;
        //     for(let i = 0 ; i < _participants ; i++){
        //         let _user = await _privateSaleContract.methods.usersArray(_presaleFromSlug,i).call()  ;
        //         if($.inArray(_user , _users) == -1){
        //             _users.push(_user) ;
        //         }
        //         if(i == (_participants - 1)){
        //             setParticipants(_users.length);
        //         }
               
     
        //     }
        // }
	  }

      const schedule = (_t) => {
         if(_t == 86400){
             return "Daily" ; 
         }
         else if(_t == 86400*7){
            return "Weekly" ; 
        }
        else if(_t == 86400*30){
            return "Monthly" ; 
        }
        else if(_t == 86400*365){
            return "Yearly" ; 
        }
         
      }


      

      const getProgress = async () => {
        if(presaleId){
            let _web3 = new Web3(web3Provider);
            let _privateSaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
            let _participants = await _privateSaleContract.methods.getParticipants(presaleId).call() ;
            setParticipants(_participants);
		let _presale = await _privateSaleContract.methods.getPresale(presaleId).call() ;
            setPresale(_presale);
            let _progress = parseFloat((_presale.raisedAmount/_presale.hardCap ) *100).toFixed(2);
         if(_progress == 100){
             init();
         }
            setProgress(_progress);
          }

      }

      const getTimer = (_s,_t) => {
        
        let _currentTime = new Date().getTime()/1e3 ; 
        let _status ;
        let _time ;
        if(_currentTime < _s){
              _status = 0 ; 
              _time = _s ;
        }
        else if(_currentTime > _s && _currentTime < _t){
              _status = 1 ; 
              _time = _t ;

        }
        else if(_currentTime > _t){
              _status = 2 ; 
              _time = 0 ; 
        }
        setStatus(_status);

     
                const countdown = () => {
            const countDate = _time*1000;
            const now = new Date().getTime();
            const gap = countDate - now;
                if(gap < 0){
                    init() ;
                    return false
                }
            const second = 1000,
              minute = second * 60,
              hour = minute * 60,
              day = hour * 24;
          
            const textDay = Math.floor(gap / day),
              textHour = Math.floor((gap % day) / hour),
              textMinute = Math.floor((gap % hour) / minute),
              textSecond = Math.floor((gap % minute) / second);
          
            setDay(textDay+"d");
            setHour(textHour+"h");
            setMinute(textMinute+"m");
            setSecond(textSecond+"s");
                }
                if(_time > 0){
                    setInterval(countdown, 1000);
                    setInterval(getProgress, 2000);
                }
       
        

      }

      const handleDeposit = (e) => {
            setDepositAmount(e.target.value) ; 
      }

      const handleWhitelist = (e) => {
        setwhitlistusers(e.target.value) ; 
  }

  const handlecheckwhitelist = (e) => {
    setcheckwhitlistusers(e.target.value) ; 
}
  

      
const checkWhiteList = async() => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
        let _check = await _privatePresaleContract.methods.checkWhiteList(presaleId,checkwhitlistuser).call() ;
        setWhitelistedtrue(_check);

}

      const depositMax = () => {
		let _web3 = new Web3(web3Provider);
        let _maxAllocation = _web3.utils.fromWei(presale.maxAllocation)
        if(_maxAllocation > bnbBalance){
            setDepositAmount(bnbBalance)
        }
        else if(_maxAllocation < bnbBalance){
            setDepositAmount(_maxAllocation)
        }
      }

      
      
      const finalizeAdmin = () => {
        let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
		setModal(!modal);
		_privatePresaleContract.methods.finishPresaleOwner(presaleId).send({
			from: wallet.account,
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
      }


        const finalize = () => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
		setModal(!modal);
		_privatePresaleContract.methods.finishPresale(presaleId).send({
			from: wallet.account,
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}

      const whiteListUsersStatusChange = () => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
        let _array = whitlistuser.split(",") ;
		setModal(!modal);
		_privatePresaleContract.methods.whiteListUsersStatusChange(_array,true,presaleId).send({
			from: wallet.account,
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}
    
    
    

    const claimLPToken = () => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
	 
		setModal(!modal);
		_privatePresaleContract.methods.claimLPToken(presaleId).send({
			from: wallet.account,
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}

    const claimBNB = () => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
	 
		setModal(!modal);
		_privatePresaleContract.methods.claimBnB(presaleId).send({
			from: wallet.account,
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}

    const cancelPresale = () => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
	 
		setModal(!modal);
		_privatePresaleContract.methods.cancelPresale(presaleId).send({
			from: wallet.account,
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}

    const claimTeamToken = () => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
	 
		setModal(!modal);
		_privatePresaleContract.methods.claimTeamToken(presaleId).send({
			from: wallet.account,
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}


      const claimPrivatePresale = () => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
	 
		setModal(!modal);
		_privatePresaleContract.methods.claimPresale(presaleId).send({
			from: wallet.account,
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}

      const participatePrivatePresale = () => {
		let _web3 = new Web3(web3Provider);
		let _privatePresaleContract = new _web3.eth.Contract(OLD_PRIVATE_SALE_ABI,OLD_PRIVATE_SALE);
	 
	 	let _deposit = _web3.utils.toWei(depositAmount.toString());
  
		setModal(!modal);
		_privatePresaleContract.methods.buyPresale(presaleId).send({
			from: wallet.account,
            value: _deposit
		}).on('receipt', function(receipt){
			setModal(modal);
			successToggle() ;
			reset();
			init();
		}).on('error', function(receipt){
			setModal(modal);
	
		})
	}

    const reset = () => {
        setDepositAmount(0)
    }
 
		return(
			<div>
			
		 	<div className="main-bg">
				<div className="container">
					<div className="content-wrapper pdd-left">
                    <div className="content">
                    <div className="box-section">
                       <div className="padchain-box">
                    <div className="row">
                        <div className="col-lg-7">
                                    <div className="list-box-l2">
                                      <div class="wrp-social-l">
                                    		<div className="bitrides-img">
												<img src={logo} />
											</div>
											<div className="bitrides-content5 pl-2">
												
                                               
                                                <ul class="list-s-icons">
                                                    { presaleDetails.website &&
                                                <li>
                                                    <a href={presaleDetails.website} target="_blank"  title="" data-original-title="Website"><i class="fa fa-globe "></i></a>
                                                </li>
}
                                                {presaleDetails.telegram &&

                                                <li>
                                                    <a href={presaleDetails.telegram}  target="_blank" data-toggle="tooltip" title="" data-original-title="Telegram"><i class="fab fa-telegram-plane"></i></a>
                                                </li>
                                                }

                                                {
                                                    presaleDetails.twitter   &&
                                                <li>
                                                    <a href={presaleDetails.twitter}  target="_blank" class="text-muted" data-toggle="tooltip" title="" data-original-title="Twitter"><i class="fab fa-twitter"></i></a>
                                                </li>
}
                                                {
                                                    presaleDetails.discord &&
                                                    <li>
                                                    <a href={presaleDetails.discord} target="_blank" class="text-muted" data-toggle="tooltip" title="" data-original-title="Discord"><i class="fab fa-discord"></i></a>
                                                </li>
                                                }
 {
                                                    presaleDetails.medium   &&
                                                <li>
                                                    <a href={presaleDetails.medium}  target="_blank" class="text-muted" data-toggle="tooltip" title="" data-original-title="Medium"><i class="fab fa-medium"></i></a>
                                                </li>
                                                }

                    
                                            </ul>
											</div>
										</div>
                                            
										
                                        <div className="p-font">
                                            <h3>{presaleDetails.name}</h3>
                                            <p>{presaleDetails.description}</p>
                                            <div className="d-flex justify-content-between">
												 
													<span className="blue-99 mrl-99 blue-100">Mint Function <img src={(presale.mintable ? check : cancel)} className="charts" /></span>
													<span className="blue-99 blue-100"> Audit <img src={(presale.audit ? check : cancel)} className="charts" /></span>
													<span className="blue-99 blue-100"> KYC <img src={(presale.kyc ? check : cancel)} className="charts" /></span>
													<span className="blue-99 blue-100"> Insured <img src={(presale.insured ? check : cancel)} className="charts" /></span>
												 
												</div>
                                            <p>{(publicSale ? "Public" :  "Private")} {presale.whitelisted ? "- Whitlisted Users Only" : "" }</p>
                                        </div>
                                        <div className="pre-sale"><h3>{
                                            progress < 100 && status == 0 && presale.status == 1 ?
                                            "Presale Starts in"
                                            :
                                            progress < 100 && status == 1 && presale.status == 1 ?
                                            "Presale Ends in"
                                            :
                                            (progress == 100)  ?
                                            "Presale Filled"
                                            :
                                            (presale.status == 2)  ?
                                            "Presale Ended"
                                            :
                                            ""
                                            }</h3></div>
                                            {
                                               ( status == 1 || status == 0 ) && presale.status == 1 && progress < 100 &&

                                               <div className="wrp-coundown">
                                            
                                               <div className="countdown-box">
                                               <div class="countdown">
                                                   <div class="container-day mr">
                                                       <h3 class="day">{day}</h3>
                                                   
                                                   </div>
                                                   <div class="container-hour mr">
                                                       <h3 class="hour">{hour}</h3>
                                                       
                                                   </div>
   
                                                   <div class="container-minute mr">
                                                       <h3 class="minute">{minute}</h3>
                                                   
                                                   </div>
   
                                                   <div class="container-second mr">
                                                       <h3 class="second">{second}</h3>
                                                   
                                                   </div>
                                               </div>
                                               </div>
                                        
                                           </div>
                                            }
                                        {/* <div id="chart"></div> */}
                                        <div className="mt-4">
                                            <table class="table">
                                                
                                                <tr>
                                                    <td className="abcd">Token Name</td>
                                                    <td className="abcde">{tokenDetails[0]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Token Symbol</td>
                                                    <td className="abcde">{tokenDetails[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Token Decimals</td>
                                                    <td className="abcde">{tokenDetails[2]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Total Supply</td>
                                                    <td className="abcde">{parseFloat(tokenDetails[3]/1e1**tokenDetails[2]).toFixed()} {tokenDetails[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Tokens For Presale</td>
                                                    <td className="abcde">{parseFloat(presale.tokenAmount/1e1 ** tokenDetails[2]).toFixed()} {tokenDetails[1]}</td>
                                                </tr>
                                                {
                                                    publicSale &&
                                                    <>
                                                <tr>
                                                    <td className="abcd">% for Liquidity</td>
                                                    <td className="abcde">{parseFloat(presale.liquidtyPercentage/100).toFixed(2)}%</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Liquidity Unlock Time</td>
                                                    <td className="abcde">{new Date(presale.liquidityLockedDays*1000).toLocaleString()}</td>
                                                </tr>
                                                </>
                                                    }
                                                <tr>
                                                    <td className="abcd">Presale Rate</td>
                                                    <td className="abcde">1 BNB = {parseFloat(presale.saleRate/1e1 ** tokenDetails[2]).toFixed()} {tokenDetails[1]}</td>
                                                </tr>
                                                {
                                                    publicSale &&
                                                    <tr>
                                                    <td className="abcd">Listing Rate</td>
                                                    <td className="abcde">1 BNB = {parseFloat(presale.listRate/1e1 ** tokenDetails[2]).toFixed()} {tokenDetails[1]}</td>
                                                </tr>
                                                }
                                              
                                                <tr>
                                                    <td className="abcd">Soft Cap</td>
                                                    <td className="abcde">{parseFloat(presale.softcap/1e18).toFixed()} BNB</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Hard Cap</td>
                                                    <td className="abcde">{parseFloat(presale.hardCap/1e18).toFixed()} BNB</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Sale Start Time</td>
                                                    <td className="abcde">{new Date(presale.startTime*1e3).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Sale End Time</td>
                                                    <td className="abcde">{new Date(presale.endTime*1e3).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Sale Type</td>
                                                    <td className="abcde">{(presale.publicSale ? "Public"  : "Private" )}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">IDOSCAN Token Reuirement ?</td>
                                                    <td className="abcde">{(presale.saleTokenLimit > 0 ? parseFloat(presale.saleTokenLimit/1e18).toFixed()  : "None" )}</td>
                                                </tr>
                                                <tr>
                                                    <td className="abcd">Unsold Tokens</td>
                                                    <td className="abcde">{(presale.burnUnsold ? "Burn"  : "Refund" )}</td>

                                                </tr>
                                                {
                                                    publicSale &&
                                                     <tr>
                                                     <td className="abcd">Team Tokens Locked</td>
                                                     <td className="abcde">{parseFloat(presale.teamLockTokenAmount/1e1**tokenDetails[2]).toFixed(2) }</td>
 
                                                 </tr>
                                                }

                                                {
                                                    publicSale &&
                                                     <tr>
                                                     <td className="abcd">Team Token Unlock Schedule</td>
                                                     <td className="abcde">{parseFloat(presale.teamUnlockTokenPercentage/100).toFixed(2) }% released {schedule(presale.teamUnlockTokenInterval)}</td>
 
                                                 </tr>
                                                }       
                                                 {
                                                    publicSale &&
                                                     <tr>
                                                     <td className="abcd">Initial Token Unlock Date/Time</td>
                                                     <td className="abcde">{new Date(presale.teamLockTokenTime*1000).toLocaleString() }</td>
 
                                                 </tr>
                                                }                                          
                                                
                                            </table>
                                            
                                        </div>
                                        
									</div>
                        </div>
                        <div className="col-lg-5">
                            <div className="list-box-l2">
                                <div className="bnb-wrp">
                                    {
                                        status > 0  &&
                                        <>
                                    <p className=""><span> {parseFloat(presale.raisedAmount/1e18).toFixed(2)}/{parseFloat(presale.hardCap/1e18).toFixed(2)} </span> BNB</p>
                                    <div>
                                    <div className="progressbar-container">
										<div className="progressbar" style={{width: progress+"%"}}></div>
                                        <span className="progress-complete-c">{progress}% Complete</span>	
									</div>
                                    </div>
                                    </>
                                    }

                                    <div className="wrp-circle-area">
                                        {
                                            publicSale &&
                                        <div className="c-progressbar1">
                                            <div class="progress-circle over50 p100">
                                                <span><img src={piechart} className="locks" /></span>
                                            <div class="left-half-clipper">
                                                <div class="first50-bar"></div>
                                                <div class="value-bar"></div>
                                            </div>
                                            </div>
                                            <div className="caption-p2">
                                                <h3>{presale.liquidtyPercentage/100}%</h3>
                                                <p>Liquidity Lockup</p>
                                            </div>
                                        </div>
                                        }
                                        {
                                        status > 0  &&
                                        <div className="c-progressbar1">
                                            <div class="progress-circle over50 p100">
                                            <span><img src={user} className="locks" /></span>
                                            <div class="left-half-clipper">
                                                <div class="first50-bar"></div>
                                                <div class="value-bar"></div>
                                            </div>
                                            </div>
                                            <div className="caption-p2">
                                                <h3>{participants}</h3>
                                                <p>Participants</p>
                                            </div>
                                        </div>
                                        }
                                        
                                         {
                                              presale.vestingScheduled > 0 &&
                                        <div className="c-progressbar1">
                                        <div class="progress-circle over50 p89">
                                            <span><img src={calendar} className="locks" /></span>
                                            <div class="left-half-clipper">
                                                <div class="first50-bar"></div>
                                                <div class="value-bar"></div>
                                            </div>
                                            </div>
                                            <div className="caption-p2">
                                                <h3>{schedule(presale.vestingScheduled)}</h3>
                                                <p>Vesting Schedule</p>
                                            </div>
                                        </div>
                                        }
                                         {
                                           presale.vestingScheduled > 0 &&
                                        <div className="c-progressbar1">
                                        <div class="progress-circle over50 p89">
                                            <span><img src={piechart} className="locks" /></span>
                                            <div class="left-half-clipper">
                                                <div class="first50-bar"></div>
                                                <div class="value-bar"></div>
                                            </div>
                                            </div>
                                            <div className="caption-p2">
                                                {presale.vetsingPercentage &&
                                            <h3>{presale.vetsingPercentage[0]/100}% / {presale.vetsingPercentage[1]/100}%</h3>
                                        }

                                                <p>Vesting Percentage</p>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <div className="connect-wallet">
                                        {
                                            !wallet.account  &&
                                                 <ConnectButton />
                                            }
                                            {
                                            wallet.account && status == 1 && progress < 100 && presale.status == 1 &&
                                            <>
                                            <div className="input-know-part">
									        	<h5>Enter BNB do you want to invest. (Max Alloc.: {parseFloat(presale.maxAllocation/1e18).toFixed(2)} BNB) </h5>
											<input   placeholder="0.0" onChange={handleDeposit} value={depositAmount} /> <button onClick={depositMax} >Max</button> <h3><span>{bnbBalance} BNB</span><p>Balance</p></h3>
										</div>
                                                <a  onClick={participatePrivatePresale} >Participate</a>
                                                </>
                                            }
                                             {
                                            wallet.account && presale.status == 1   &&
                                            <a  onClick={cancelPresale} >Cancel Presale</a>

                                             }
                                             {
                                            wallet.account && presale.status == 3   &&
                                            <a  onClick={claimBNB} >Claim Back BNB</a>

                                             }
                                             {
                                            wallet.account  && presale.status == 2 &&
                                                    <>
                                                    <div className="showClaimtext">
                                                    <p>Total Token Purchased: {tokenPurchased} {tokenDetails[1]}</p>
                                                    <p>Total Token Due: {tokenDue} {tokenDetails[1]}</p>
                                                    <p>Total Token Due Now: {tokenDueNow} {tokenDetails[1]}</p>
                                                    {
                                                    nextClaim*1e3 > new Date().getTime() &&
                                                    <p>Next Vesting: { new Date(nextClaim*1e3).toLocaleString()}</p>
                                                    }

                                                </div>
                                                {
                                                  wallet.account &&  nextClaim*1e3 < new Date().getTime() &&
                                                    <a  onClick={claimPrivatePresale} >Claim Token Due</a>
                                                }
                                                </>

                                             }
                                             <hr />
                                                {
                                            wallet.account == presale.creator && presale.status == 2 &&
                                                    <>
                                                    <div className="showClaimtext">
                                                    <p>Total Team Token Locked: {parseFloat(presale.teamLockTokenAmount/1e1**tokenDetails[2]).toFixed()} {tokenDetails[1]}</p>
                                                    <p>Total Team Token Due: {parseFloat(presale.teamLockTokenAmount - presale.teamLockTokenClaimedAmount)/1e1**tokenDetails[2]} {tokenDetails[1]}</p>
                                                    {
                                                        teamNextClaimTime < new Date().getTime() &&
                                                        <div className="connect-wallet">
                                                    <p>Total Team Token Due Now: {teamTokenDueNow/1e1**tokenDetails[2]} {tokenDetails[1]}</p>
                                                    <a  onClick={claimTeamToken} >Claim Token Due</a>

                                                        </div>
                                                    }
                                                     {
                                                        teamNextClaimTime > new Date().getTime() &&
                                                        <div className="c">
                                                    <p>Total Team Token Due Now: 0</p>
                                                    <p>Next Unlock: { new Date(teamNextClaimTime).toLocaleString()}</p>

                                                        </div>
                                                    }
{
                                                        presale.liquidityLockedDays*1000  < new Date().getTime() &&
                                                    <div className="connect-wallet">

                                                        <a  onClick={claimLPToken} >Claim LP Token</a>

                                                        </div>
}
                                                     

                                                </div>
                                                 
                                                </>

                                             }
                                             {
                                                 presale.status != 2 &&
                                                 <>
                                             
                                              <input type="text" onChange={handlecheckwhitelist} placeholder="Enter address to verify" />
                                                       {
                                                           whitelistedtrue == true &&
                                                           <p className="text-white text-left" >Address is Whitelisted</p>
                                                       }
                                                       {
                                                           whitelistedtrue == false &&
                                                           <p className="text-white text-left">Address is not Whitelisted</p>
                                                       }
                                                 <a  onClick={checkWhiteList} >Check Whitelist</a>
                                             {
                                                 (wallet.account == "0xecd73e2581aD5B86a31F5FF77CDaddcAbcB61B18" || wallet.account == presale.creator) &&
                                                 <>
                                                  {/* <p>Creator: {presale.creator}</p> */}
                                                 <textarea onChange={handleWhitelist} placeholder="Paste Comma separated Addresses here" ></textarea>
                                                 <a   onClick={whiteListUsersStatusChange} >Add Whitelist</a>
                                                 </>
                                                                                                                                                                                                                                                                   }
                                                {presale.active}
                                                 {
                                                     !presale.active &&
                                                     <a   onClick={() => window.location.replace("/complete/"+slug)} >Complete Set Up</a>

                                                 }                                     
                                                 {
                                                     presale.status != 2 && 
                                                      
                                                        <a   onClick={finalize} >Finalize</a>
                                                    }

                                                
                                                {
                                                 wallet.account == "0xecd73e2581aD5B86a31F5FF77CDaddcAbcB61B18" && presale.status != 2     &&                                             
                                                 <a   onClick={finalizeAdmin} >Finalize Admin</a>
                                                }


                                                 </>
                                                 
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
				</div>
               
					
			</div>
			
			
			<Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={toggle}>Close</Button>
    
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
export default Oldpaddetails;