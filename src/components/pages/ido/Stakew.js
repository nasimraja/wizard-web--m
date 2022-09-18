import React, {useState, useEffect} from 'react'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logoimg from '../../images/logoimg.png';
import tires from '../../images/tire.png';
import star from '../../images/star.png';
import star2 from '../../images/star2.png';

import {useParams } from 'react-router-dom';

import {useWallet} from '@binance-chain/bsc-use-wallet'

import TOKEN_ABI from "../../../Config/TOKEN_ABI.json"

import STAKING_ABI from  "../../../Config/IDO_STAKING_ABI.json"
import Web3 from "web3"
import ConnectButton from '../ConnectButton';
import Config from '../../../Config';
import { SampleData } from '../../../Config/dataIdo';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
function Stakew(props){

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    

   
    const { index } = useParams();
    const [nautAllowance, setNautAllowance] = useState("-");
    const [nautBalance, setNautBalance] = useState("-");
    const [nautSymbol, setNautSymbol] = useState("-");
  const [stakingBalance, setStakingBalance] = useState("-");
  const [tier,setTier] = useState(0);
  const [isIcoOver, setICOOver] = useState();
    const [selectedPage, setSelectedPage] = useState("Deposit");
    const [isICOOver, setIsICOOver] = useState(true);
    const [expireTime, setExpireTime] = useState()
    const [nautContract, setNautContact] = useState(null)
    const [stakingContract, setStakingContact] = useState()
    const [web3, setWeb3] = useState()
    const [walletAddress, setWalletAddress] = useState("");
  
    const [tickerText, setTickerText] = useState();
    const [tickerTimer, setTickerTimer] = useState();
  
    const [isDepositEnabled, setDepositEnabled] = useState(false);
  
    const [depositBtnMode, setDepositBtnMode] = useState(0);
  
    const [tier1Amount,setTier1Amount] = useState();
    const [tier2Amount,setTier2Amount] = useState();
    const [tier3Amount,setTier3Amount] = useState();
    const [tier4Amount,setTier4Amount] = useState();
  
    const [stakingStatus,setStakingStatus] = useState()

  
  
    const wallet = useWallet();
  
    const initContracts = async () => {
      let _web3 = new Web3(window.ethereum);
      const _stakingContract = new _web3.eth.Contract(STAKING_ABI, SampleData[index].staking);
      console.log(_stakingContract);
      let _nautToken = await _stakingContract.methods.wizardToken().call() ; 
      const _nautContract = new _web3.eth.Contract(TOKEN_ABI, _nautToken)
      let _nautSymbol = await _nautContract.methods.symbol().call() ; 

      setWeb3(_web3)
      setNautContact(_nautContract);
      setNautSymbol(_nautSymbol);
      setStakingContact(_stakingContract)
      let _balance = await _nautContract.methods.balanceOf(wallet.account).call();
      let _allowance = await _nautContract.methods.allowance(wallet.account, SampleData[index].staking).call();
  
  
      let _tier1Amount =  await _stakingContract.methods.Tier1().call();
    let _tier2Amount =  await _stakingContract.methods.Tier2().call();
    let _tier3Amount =  await _stakingContract.methods.Tier3().call();
    let _tier4Amount =  await _stakingContract.methods.Tier4().call();

    setTier1Amount(_tier1Amount/1e18);
    setTier2Amount(_tier2Amount/1e18);
    setTier3Amount(_tier3Amount/1e18);
    setTier4Amount(_tier4Amount/1e18);
  
      setNautAllowance(_allowance / 10 ** 18)
        _balance = _balance / 10 ** 18;
        _balance = _balance.toFixed(4)
  
        console.log("_blanace", _balance)
        setNautBalance(_balance);
  
        if (_allowance > 0) {
          setDepositBtnMode(2)
  
        } else {
          setDepositBtnMode(1)
  
        }
  
        let _stakerData = await _stakingContract.methods.getStaker(wallet.account).call();

        let _isICOOver =  await _stakingContract.methods.ICOover().call();
    
        setICOOver(_isICOOver)
        let _stakingAmount =  _stakerData.amount/10**18;
        let _tier = _stakerData.tier;
        setTier(_tier)
    
      
        
        setStakingBalance(_stakingAmount);

    }
  
    useEffect(() => {
      
      if (wallet.status === 'connected') {
        setWalletAddress(wallet.account)
        initContracts()
        
      }
  
    }, [wallet.status,wallet.account,index])

    
 

    const handleAllowance = async (amount) => {

      console.log("sdssdssdsds",nautContract)
    await nautContract.methods.approve(SampleData[index].staking, "9000000000000000000000000000000000")
    .send({ from: wallet.account }).then(async(re)=>{

      await stakingContract.methods.stakeTokens(amount)
      .send({ from: wallet.account });
    });

  }

  

  const handleWithdraw = async () => {

    if(isIcoOver == false){

      alert("ICO is not over yet!")
      return
    }
    await stakingContract.methods.unStakeTokens()
    .send({ from: wallet.account });

  }
 
    const handleDeposit = async (amount) => {
      console.log("stakingStatus",stakingStatus)
      if(stakingStatus === false){
        alert("Staking is not available")
        return
      }
      
      if(!isDepositEnabled){
        alert("Staking Not Available!")
        return
      }
  
      if(nautAllowance >= amount && stakingStatus === true){
  
        let amnt = Web3.utils.toWei(amount.toString(), "ether");
        await stakingContract.methods.stakeTokens(amnt)
        .send({ from: props.account });
      }else{
        let amnt = Web3.utils.toWei(amount.toString(), "ether");
        handleAllowance(amnt);
      }
  
    }


    return(
       <div className="pools2bg">
           <div className="container">
               <div className="row">
                   <div className="col-lg-8">
                       <div className="pools2-content">
                            <h3>Stake</h3>
                       </div>
                   </div>
                   <div className="col-lg-4">
                        <div className="text-rights">
                          <div className="tabs-ppols2 tabs-ppols3">
                          <Box sx={{ width: '100%' }}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tabs-p-wrp">
                              <Tab label="Deposit" {...a11yProps(0)} />
                              <Tab label="Withdraw" {...a11yProps(1)} /> 
                              </Tabs>
                          </Box>
                          
                          
                          </Box>
                          </div>
                        </div>
                   </div>
               </div>
              <TabPanel value={value} index={0}>
                <div className="deposits-head">
                  <h3>Deposit {nautSymbol} Tokens To Get Whitelisted</h3>
                </div>
                <div className="stakew-stoke"></div>
                <div className="row">
                  <div className="col-lg-5">
                    <div className="your-balance-box">
                      <span>Your Balance</span>
                      <p><span>{nautBalance}</span> {nautSymbol}</p>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="knight-box-wrp">
                        <div className="knight-box" onClick={() => handleDeposit(tier1Amount)}  >
                          <h3>Archer</h3>
                        </div>
                        <div className="knight-box" onClick={() => handleDeposit(tier2Amount)}>
                          <h3>Barbarian</h3>
                        </div>
                    </div>
                    <div className="knight-box-wrp mrt-r">
                        <div className="knight-box"  onClick={() => handleDeposit(tier3Amount)}>
                          <h3>Knight</h3>
                        </div>
                        <div className="knight-box"onClick={() => handleDeposit(tier4Amount)}>
                          <h3>Wizard</h3>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="head-tires-b">
                  <p>Tiers</p>
                </div>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="tires-b">
                      <h3>Archer</h3>
                      <p>Requirements</p>
                      <p>{tier1Amount}</p>
                    
                    
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="tires-b">
                      <h3>Barbarian</h3>
                      <p>Requirements</p>
                      <p>{tier2Amount}</p>
                      
                      
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="tires-b">
                      <h3>Knight</h3>
                      <p>Requirements</p>
                      <p>{tier3Amount}</p>
                
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="tires-b">
                      <h3>WIZARD</h3>
                      <p>Requirements</p>
                      <p>{tier4Amount}</p>
                     
                     
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
              <div className="deposits-head">
                  
                </div>
                <div className="stakew-stoke"></div>
                <div className="row">
                  <div className="col-lg-5">
                    <div className="your-balance-box">
                      <span>Your Staked Balance</span>
                      <p><span>{stakingBalance}</span> {nautSymbol}</p>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="knight-box-wrp">
                      {
                        tier == 1 ?
                        <div className="knight-box" onClick={() => handleDeposit(tier1Amount)}  >
                        <h3>Tier: Archer</h3>
                      </div>
                      :
                      tier == 2 ?
<div className="knight-box"  >
                          <h3>Tier: Barbarian</h3>
                        </div>
                         :
                         tier == 3 ?
                         <div className="knight-box"   >
                         <h3>Tier: Knight</h3>
                       </div>
                        :
                        tier == 4 ?
                        <div className="knight-box" >
                        <h3>Tier: Wizard</h3>
                      </div>
                      :
                      <div className="knight-box" >
                        <h3>Not Staked</h3>
                      </div>
                      }
                       
                       {
                        tier != 0 &&
                        <div className="knight-box" onClick={() => handleWithdraw()}>
                        <h3>Withdraw</h3>
                      </div>
                       }
                        
                   
                  </div>
                </div>
                </div>
                <div className="head-tires-b">
                  <p>Tiers</p>
                </div>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="tires-b">
                      <h3>Archer</h3>
                      <p>Requirements</p>
                      <p>{tier1Amount}</p>
                    
                    
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="tires-b">
                      <h3>Barbarian</h3>
                      <p>Requirements</p>
                      <p>{tier2Amount}</p>
                      
                      
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="tires-b">
                      <h3>Knight</h3>
                      <p>Requirements</p>
                      <p>{tier3Amount}</p>
                
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="tires-b">
                      <h3>WIZARD</h3>
                      <p>Requirements</p>
                      <p>{tier4Amount}</p>
                     
                     
                    </div>
                  </div>
                </div>
               
              </TabPanel>
             
           </div>
       </div> 
    )
}


export default Stakew;