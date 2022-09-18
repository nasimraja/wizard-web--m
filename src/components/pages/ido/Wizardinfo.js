import React, {useState, useEffect} from 'react'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import un1 from '../../images/un1.png';

import {useParams } from 'react-router-dom';

import {useWallet} from '@binance-chain/bsc-use-wallet'

import TOKEN_ABI from "../../../Config/TOKEN_ABI.json"

import STAKING_ABI from  "../../../Config/IDO_STAKING_ABI.json"
import ICO_ABI from  "../../../Config/IDO_ABI.json"
import Web3 from "web3"
import moment from "moment";

import { SampleData } from '../../../Config/dataIdo';
 
function Wizardinfo(props){
  
    const { index } = useParams();
  
    const [icoContract, setIcoContract] = useState(null)
    const [startDate, setStartDate] = useState("-")
    const [endDate, setEndDate] = useState("-");
  
    const [vetsingP, setVestingP] = useState("-");
    const [vetsingR, setVestingR] = useState("-");
  
  
    const [moonLimit, setMoonLimit] = useState("-")
    const [tokenRate, setTokenRate] = useState("-")
    
    const [marsLimit, setMarsLimit] = useState("-")
    const [starLimit, setStarLimit] = useState("-")
    const [galaxyLimit, setGalaxyLimit] = useState("-")
  
    const [isBuyEnabled, setBuyEnabled] = useState(false)
    const [isClaimEnabled, setClaimEnabled] = useState(false)
  
    const [myBalance, setMyBalance] = useState("-")
    const [myMaxContribution, setMyMaxContribution] = useState("-")
    const [myRemainingContribution, setMyRemainingContribution] = useState("-")
    const [myContribution, setMyContribution] = useState("-")
    const [myMaxLimit, setMyMaxLimit] = useState()
    const [amountInput, setAmountInput] = useState()
    const [currentTierName, setCurrentTierName] = useState("-")
    const [outputSymbol, setOutputSymbol] = useState("-")
    
    const [icoTarget, setIcoTarget] = useState()
    const [receivedFund, setReceivedFund] = useState()
  
    const [fundRaisingProgress, setFundRaisingProgress] = useState(0)
  
    const [participants,setParticipant] = useState();
  
    const [busdBalance,setBUSDBalance] = useState("-");
    const [BUSDSymbol,setBUSDSymbol] = useState("-");
    
  
  
    const [claimAmount, setClaimAmount] = useState("-")
  
    const [busdContract,setBusdContract] = useState("-");
    const [busdAllowance,setBUSDAllowance] = useState("-");
    const [expireTime, setExpireTime] = useState();
  
  
    const [remainingTime, setRemainingTime] = useState();
  
    useEffect(() => {
      if(!expireTime){
        return
      }
  
      var deadline = new Date(expireTime*1000).getTime();
      if(isClaimEnabled){
        setRemainingTime("Claim Tokens")
  
      }else{
        initTimer(deadline)
  
      }
    }, [expireTime])
  
    const initTimer=(deadline)=>{
      var interval = setInterval(function () {
        var now = new Date().getTime();
        var t = deadline - now;
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        setRemainingTime(days + "d "
        + hours + "h " + minutes + "m " + seconds + "s ");
        if (t < 0) {
          clearInterval(interval);
          setRemainingTime("Finished")
        }
      }, 1000);
    }
  
  
    const wallet = useWallet();
  
     
  
    const initContracts = async () => {
      let _web3 = new Web3(window.ethereum);
      const _icoContract = new _web3.eth.Contract(ICO_ABI, SampleData[index].contract)
      let _sDate = ''
      let _eDate = ''
      let _input = await _icoContract.methods.inputtoken().call();
      let _outputtoken = await _icoContract.methods.outputtoken().call();
      let _tokenrate = await _icoContract.methods.tokenPrice().call();
      const _outputTokenContract = new _web3.eth.Contract(TOKEN_ABI, _outputtoken);
      let _oSymbol = await _outputTokenContract.methods.symbol().call();
      let _odecimals = await _outputTokenContract.methods.decimals().call();

      setOutputSymbol(_oSymbol)
      setTokenRate(_tokenrate)
      const busdBalance = new _web3.eth.Contract(TOKEN_ABI, _input);
      let _decimals = await busdBalance.methods.decimals().call();

      let stakingDetails = await _icoContract.methods.ico(wallet.account).call();
  
      let _vestingP = await _icoContract.methods.vestingperc().call();
      let _vestingR = await _icoContract.methods.vestingTime().call();
      setVestingP(_vestingP);
      setVestingR(_vestingR);
  
      let myMaxLimit = await _icoContract.methods.maximumContribution(wallet.account).call();
      setMyMaxLimit((myMaxLimit / 1e1**_decimals))
      let remainingContri = await _icoContract.methods.remainigContribution(wallet.account).call();
      setMyRemainingContribution((remainingContri / 1e1**_decimals).toFixed(4));
  
     
      setMyContribution((stakingDetails.investedamount / 1e1**_decimals).toFixed(4));
  
      let  myMaxContribution= await _icoContract.methods.maximumContribution(wallet.account).call();
      setMyMaxContribution((myMaxContribution / 1e1**_decimals).toFixed(4));
  
      // let _tokenPrice = await _icoContract.methods.tokenPrice().call();
      let _claimAmount = (stakingDetails.remainingClaim / 1e18);
      setClaimAmount(_claimAmount);
  
      let _moonLimit = await _icoContract.methods.getTier1Maxlimit().call();
      let _marsLimit = await _icoContract.methods.getTier2Maxlimit().call();
      let _starLimit = await _icoContract.methods.getTier3Maxlimit().call();
      let _galaxyLimit = await _icoContract.methods.getTier4Maxlimit().call();
  
      let icoStatus = await _icoContract.methods.icoStatus().call();
  

  
      if(icoStatus === true){
        setBuyEnabled(true)
      }
  
  
      let _claimEnabled = await _icoContract.methods.claimenabled().call();
  
      setClaimEnabled(_claimEnabled)
  
  
  
     setExpireTime(_eDate)
  

  
      let _icoTarget = await _icoContract.methods.icoTarget().call();
      if(_icoTarget > 0){
      setIcoTarget((_icoTarget/1e1**_decimals).toFixed(0));
  
  
      let _receivedFund = await _icoContract.methods.receivedFund().call();

      setReceivedFund((_receivedFund/1e1**_decimals).toFixed(0));
  
  
      let progressPercent = (_receivedFund/_icoTarget)*100
      if(progressPercent<20){
        progressPercent = 20
      }
      setFundRaisingProgress(progressPercent)
    }
  
      initializeParticipantCount(_web3)
  
  
  
  
      _moonLimit  = (_moonLimit/1e18).toFixed(0)
      _marsLimit  = (_marsLimit/1e18).toFixed(0)
      _starLimit  = (_starLimit/1e18).toFixed(0)
      _galaxyLimit  = (_galaxyLimit/1e18).toFixed(0)
  
  
  
      let _currentTier = await _icoContract.methods.checkyourTier(wallet.account).call();
      if(_currentTier == 1){
        setCurrentTierName("Moon")
      }else  if(_currentTier == 2){
        setCurrentTierName("Mars")
      }else  if(_currentTier == 3){
        setCurrentTierName("Start")
      }if(_currentTier ==4){
        setCurrentTierName("Galaxy")
      }
  
  
  
  
      setMoonLimit(_moonLimit);
      setMarsLimit(_marsLimit);
      setStarLimit(_starLimit);
      setGalaxyLimit(_galaxyLimit);
  
  
  
  
      _sDate = moment(_sDate * 1000).format("MMM DD YYYY | hh:mm:ss");
      _eDate = moment(_eDate * 1000).format("MMM DD YYYY |  hh:mm:ss");
  
      setIcoContract(_icoContract);
      setStartDate(_sDate);
      setEndDate(_eDate);
  
  
  
  
  
  
      
      await initBUSDBalance(_web3,_input)
  
  
    }
  
  
  
    const initBUSDBalance= async(web3,_input)=>{
      const busdBalance = new web3.eth.Contract(TOKEN_ABI, _input);
      let _balance = await busdBalance.methods.balanceOf(wallet.account).call();
      let _allowance = await busdBalance.methods.allowance(wallet.account,SampleData[index].contract).call();
      let _decimals = await busdBalance.methods.decimals().call();
      let _symbol = await busdBalance.methods.symbol().call();
      console.log(_balance);
      setBUSDBalance((_balance/1e1**_decimals).toFixed(3))
      setBUSDSymbol(_symbol)
  
      setBUSDAllowance(_allowance);
      setBusdContract(busdBalance)
      
    }
  
  
    const initializeParticipantCount = async(web3)=>{
      const participantsContracts = new web3.eth.Contract(STAKING_ABI, SampleData[index].staking);
      let participantCounts = await participantsContracts.methods.countStakers().call();
  
      setParticipant(participantCounts)
    }
  
  
    useEffect(() => {
      if (wallet.status === 'connected') {
        setInterval(() => {
        initContracts();
          
        }, 3000);
      }
    }, [wallet]);
  
  
    const handleBuy=async()=>{
  
  
  
      if(!isBuyEnabled){
  
        alert("BUSD staking is not live ")
        return
      }
  
  
      if(!amountInput){
        alert("Please Enter A Valid Amount");
        return
      }
      // let amount = Web3.utils.toWei(amountInput.toString());
      let amount = amountInput * 1000000;
  
      console.log("amounttt",busdAllowance,amount)
      if(amount > busdAllowance){
        await busdContract.methods.approve(SampleData[index].contract, "1000000000000000000000000000000000000")
        .send({ from: wallet.account }).then(async(re)=>{
    
          await icoContract.methods.Investing(amount)
          .send({ from: wallet.account });
        });
      }else{
        await icoContract.methods.Investing(amount).send({from:wallet.account});
  
      }
  
    }
  
    const handleClaim=async ()=>{
      if(!isClaimEnabled){
        alert("Claim is not enabled yet ")
        return
      }
      await icoContract.methods.claimTokens().send({from:wallet.account}).then(()=>{
        setClaimAmount(0)
      });
  
    }
  
  
    function truncateToDecimals(num, dec = 2) {
      const calcDec = Math.pow(10, dec);
      return Math.trunc(num * calcDec) / calcDec;
    }
  



    return(
      <div className="wizardinfobg">
        <div className="container">
            <div className="wrp-token-ticket mb-3">
                <div className="wrp-t-child1">
                  <img style={{width: "150px"}} src={SampleData[index].image} />
                </div>
                <div className="wrp-t-child2 ml-5" >
                  <div className="undead-head-wrp">
                    <div className="undead-head-child1">
                        <h3>{SampleData[index].name}</h3>
                    </div>
                    <div className="undead-head-child1">
                      <p>TOKEN TICKER <span>{outputSymbol}</span></p>
                    </div>
                  </div>
                  <div className="wrp-p-c">
                      <p>{SampleData[index].description}</p>
                  </div>
                </div>
            </div>
            <div className="info-stoke"></div>
            <div className="row">
              <div className="col-lg-5">
                <div className="vesting-main">
                  {
                    !isClaimEnabled && isBuyEnabled && remainingTime &&
                <div className="sale-price-box">
                      <p>Time to Finish</p>
                      <h4>{remainingTime}</h4>
                  </div>
                  }
                      
                  <div className="vesting-wrp">
                    <div className="vesting-child1">
                      <p>Vesting Percentage</p>
                      <h4>{vetsingP}%</h4>
                    </div>
                    <div className="vesting-child1">
                      <p>Vesting release</p>
                      <h4>{new Date(vetsingR*1e3).toLocaleString()}</h4>
                    </div>
                  </div>
                  {/* <div className="vesting-wrp">
                    <div className="vesting-child1">
                      <p>Vesting Percentage</p>
                      <h4>60%</h4>
                    </div>
                    <div className="vesting-child1">
                      <p>Vesting release</p>
                      <h4>80%</h4>
                    </div>
                  </div> */}
                  <div className="sale-price-box">
                      <p>Sale Price</p>
                      <h4>1 {BUSDSymbol} = {tokenRate} {outputSymbol}</h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="main-balance-box">
                  <div className="wrp-balancs">
                    <div className="balances-child1 margin-r-b">
                      <p>Your Balance</p>
                      <p><span>{busdBalance}</span> {BUSDSymbol}</p>
                    </div>
                 
                 
                    <div className="balances-child2">
                      <a href="#">{isBuyEnabled ? "Open" : isClaimEnabled ? "Closed and Claim Open" : "Not Started Yet" }</a>
                    </div>
                  </div>
                  <div className="progress-info-c">
                    <div className="info-c1">
                      <p>Progress</p>
                    </div>
                    <div className="info-c2">
                      <p>{fundRaisingProgress}%</p>
                    </div>
                  </div>
                    <div className="wrp-progressbar">
                      <div class="progressbar-container">
                          <div class="progressbar" style={{width: fundRaisingProgress+"%"}}></div>
                      </div>
                    </div>
                    <div className="wrp-contribute">
                      <div className="contribute-child1">
                        <p>Your Contribution</p>
                        <p><span>{myContribution}</span> {BUSDSymbol}</p>
                      </div>
                      <div className="contribute-child1 contribut-right">
                        <p>Remaining Contribution</p>
                        <p><span>{myRemainingContribution}</span> {BUSDSymbol}</p>
                      </div>
                    </div>
                    <div className="wrp-maxusd">
                      <div className="maxusd-child1">
                        <input  placeholder="Enter Amount" value={amountInput} onChange={(e)=>{
                setAmountInput(e.target.value)
              }} />
                        <span onClick={()=>{
                setAmountInput(truncateToDecimals(myMaxLimit,2)) }}>MAX</span>
                      </div>
                      <div className="maxusd-child2">
                        <button onClick={()=>{
                handleBuy();
              }}>Buy</button>
                      </div>
                    </div>
                    <div className="wrp-maxusd">
                      <div className="maxusd-child1">
                        <input  placeholder="Claim amount:" value={`Claim Amount:${claimAmount}`} disabled/>
                        
                      </div>
                      <div className="maxusd-child2">
                        <button onClick={()=>{
              handleClaim()
            }}>Claim</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="head-limit">
              <h3>ALLOCATION LIMIT</h3>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div className="limit-box">
                  <div className="limit-c">
                    <p>Archer</p>
                    <h3>{moonLimit} - {outputSymbol}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="limit-box limit-box2">
                  <div className="limit-c">
                    <p>Barbarian</p>
                    <h3>{marsLimit} - {outputSymbol}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="limit-box limit-box3">
                  <div className="limit-c">
                    <p>Knight</p>
                    <h3>{starLimit} - {outputSymbol}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="limit-box limit-box4">
                  <div className="limit-c">
                    <p>WIZARD</p>
                    <h3>{galaxyLimit} - {outputSymbol}</h3>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
}


export default Wizardinfo;