import React, {useState, useEffect} from 'react'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import un1 from '../../images/un1.png';
import slist1 from '../../images/slist1.png';
import slist2 from '../../images/slist2.png';
import slist3 from '../../images/slist3.png';
import slist4 from '../../images/slist4.png';
import {useParams } from 'react-router-dom';

import {useWallet} from '@binance-chain/bsc-use-wallet'

import TOKEN_ABI from "../../../Config/TOKEN_ABI.json"

import STAKING_ABI from  "../../../Config/IDO_STAKING_ABI.json"
import ICO_ABI from  "../../../Config/IDO_ABI.json"
import Web3 from "web3"
import moment from "moment";

import { SampleData } from '../../../Config/dataIdo';
 
function IdoCard(props){
  
    const { index } = props;
  
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
  
    function goTo(_url){
      window.location.href = _url
    }


    return(
      <div className="col-lg-6 mb-3">
      <div className="undead-box">
        <div className="undead-content-wrp">
              <div className="undead-c-child1">
                <div className="un-img-box">
                   <img style={{width: "100px",marginTop : '10px'}} src={SampleData[index].image} />
                </div>
              </div>
              <div className="undead-c-child2">
                <h3>{outputSymbol} TOKEN</h3>
                <p><a href="#">Open</a> {BUSDSymbol}</p>
                <div className="undead-list">
                  <li>
                    <div className="wrp-list-undead">
                      <div className="list-undead1">
                        <p>{BUSDSymbol}/{outputSymbol}</p>
                        <p>1 {BUSDSymbol} = {tokenRate} ${outputSymbol}</p>
                      </div>
                      <div className="list-undead1">
                        <p>CAP</p>
                        <p>{SampleData[index].cap}</p>
                      </div>
                    </div>
                  </li>
                </div>
              </div>

        </div>
        <div className="stoke-un"></div>
        <div className="progress-wrp">
          <div className="progress-content">
            <p>IDO Progress</p>
          </div>
          <div className="progress-content">
            <p>{fundRaisingProgress}%</p>
          </div>
        </div>
          <div class="progressbar-container">
            <div class="progressbar" style={{width: fundRaisingProgress+"%"}}></div>
          </div>
          <div className="social-p-wrp">
              <div className="social-p1">
                <p>Total Participant: <span>{participants}</span></p>
              </div>
              <div className="social-p1">
                  <ul className="social-listp">
                    {
                      SampleData[index].website &&
                      <li><a target="_blank" href={SampleData[index].website}><img src={slist1} /></a></li>
                    }
                     {
                      SampleData[index].twitterLink &&
                      <li><a target="_blank" href={SampleData[index].twitterLink}><img src={slist2} /></a></li>
                    }
                     {
                      SampleData[index].telegramLink &&
                      <li><a target="_blank"  href={SampleData[index].telegramLink}><img src={slist3} /></a></li>
                    }
                     {
                      SampleData[index].discordLink &&
                      <li><a target="_blank"  href={SampleData[index].discordLink}><img src={slist4} /></a></li>
                     }
                  </ul>
              </div>
          </div>
          <div className="stake-btns">
             
              <button onClick={() => goTo('/iwo/stake/'+index)} >Go to STAKE</button>
             
            {
              (isBuyEnabled || isClaimEnabled) &&
              <button onClick={() => goTo('/iwo/participate/'+index)}>Go to IWO</button>
            }
                                </div>
      </div>
  </div>
    )
}


export default IdoCard;