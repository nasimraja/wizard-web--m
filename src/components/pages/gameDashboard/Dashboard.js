import React, { Component, useEffect, useState } from 'react';
import $ from "jquery";
import { API_URL,GAME_COIN } from '../../../Config';
import GAME_COIN_ABI from '../../../Config/GAME_COIN_ABI.json';
import TOKEN_ABI from '../../../Config/TOKEN_ABI.json';
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";
 
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Web3 from 'web3';
import ConnectButton from '../ConnectButton';
 

 


const Dashboard = () => {

	const wallet = useWallet() ;
	let web3Provider  = window.ethereum ; 

    const [userData,setUserData] = useState({});
    const [balance,setBalance] = useState(0);
    const [authPoints,setAuthPoints] = useState(0);
    
    const [symbol,setSymbol] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);
    const [damount, setdAmount] = useState(0);
    const [stakefee ,setstakefee] =useState(0);
    const [depositError, setDepositError] = useState('');
    const [feeToken, setFeeToken] = useState(null);
    const [approval, setApproval] = useState(0);
    const [pointsClaim, setPointsClaim] = useState(0);
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

	const [successModal, setSuccessModal] = useState(false);
    const successToggle = () => setSuccessModal(!successModal);

    const [depositmodal, setDepositmodal] = useState(false);
    const depositToggle = () => setDepositmodal(!depositmodal);

    const [claimModal, setClaimModal] = useState(false);
    const claimToggle = () => setClaimModal(!claimModal);

    useEffect(() => {
        getData()
    },[wallet.account])
    const userId = localStorage.getItem('game_user_id')
    const getData = async () => {
        const response = await fetch(API_URL+'/getUser/'+userId)

        const data = await response.json();
        console.log(data);
        setUserData(data);
        let _web3 = new Web3(web3Provider);
	  
		let _gameContract = new _web3.eth.Contract(GAME_COIN_ABI,GAME_COIN);

        let _feeToken = await _gameContract.methods.token().call() ;
        setFeeToken(_feeToken)
        
        const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,_feeToken);
       
        let _symbol = await _tokenContract.methods.symbol().call() ;
        setSymbol(_symbol);
        
        let _decimals = await _tokenContract.methods.decimals().call() ;
        
        let _stakingFee = await _gameContract.methods.tokensPerCoin().call() ;  
        setstakefee(_stakingFee/1e1**_decimals);    
        

        if(wallet.account){
            let _coinBalance = await _gameContract.methods.balances(wallet.account).call() ;
            setAuthPoints(_coinBalance/1e1**_decimals)
       
         let _approval = await _tokenContract.methods.allowance(wallet.account,GAME_COIN).call() ;
            _approval = parseFloat(_approval/1e1 ** _decimals).toFixed(2) ;
    
            setApproval(_approval);
            let _balance = await _tokenContract.methods.balanceOf(wallet.account).call() ;
            _balance = parseFloat(_balance/1e1 ** _decimals).toFixed(2) ;
            // alert(_balance);
            setBalance(_balance);
        }
    }

    useEffect(() => {
		if(window.ethereum){
			web3Provider  = window.ethereum;
		  }
		  else{
			web3Provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')
		   
		  }
		   
	},[])

  

    const handleDepositChange = (e) => {
        setdAmount(e.target.value)
        setDepositAmount(e.target.value)
    
    }
    
    
    const handleClaimChange = (e) => {
        setPointsClaim(e.target.value)
 
    
    }
    
    
async function approveToken(){
    let _web3 = new Web3(web3Provider);

 
    const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,feeToken);

    setModal(!modal);


    // document.getElementById("exampleModalCenter").modal('show')
    
    const _amount = _web3.utils.toWei('10000000000000000000000000000') ;
    _tokenContract.methods.approve(GAME_COIN,_amount).send({from: wallet.account}).on('receipt', function(receipt){
        getData(); 
         setModal(modal);

    })
  
    .on('error', function(error, receipt) {
    setModal(modal);
        
    });
       
}



async function claim(){
  
    setModal(!modal);
 
 
    
    let _web3 = new Web3(web3Provider);
    const _gameContract = new _web3.eth.Contract(GAME_COIN_ABI,GAME_COIN);
    
    _gameContract.methods.claimGPoints().send({
        from: wallet.account
    }).on('receipt', function(receipt){
        setModal(modal);
        getData() ;
        successToggle();
       

       
       
    }).on('error', function(receipt){
        setModal(modal);

    })
    
}

async function authorize(){
    setDepositError(false);
    // let _amount = parseInt(depositAmount) ;
  
    if(userData.data.points < pointsClaim ){
        setDepositError('Insufficient Points to Claim.');
        return false;
    }
    setModal(!modal);
 
    let _web3 = new Web3(web3Provider);
    const _gameContract = new _web3.eth.Contract(GAME_COIN_ABI,GAME_COIN);
    let _str = "AhmadYasir" + new Date().getTime(); 

    _gameContract.methods.authGPoints(pointsClaim,_str).send({
        from: wallet.account
    }).on('receipt', function(receipt){
        updateData(userId,pointsClaim,"minus");
    }).on('error', function(receipt){
        setModal(modal);
    })

}



async function depositToken(){
    setDepositError(false);
    // let _amount = parseInt(depositAmount) ;
  
    if(balance < stakefee*damount ){
        setDepositError('Insufficient Balance for fee. Please fund your wallet with some '+symbol+' Token and try again.');
        return false;
    }

    setModal(!modal);
 
    
    let _web3 = new Web3(web3Provider);
    const _gameContract = new _web3.eth.Contract(GAME_COIN_ABI,GAME_COIN);
 
    _gameContract.methods.purchasePoints(damount).send({
        from: wallet.account
    }).on('receipt', function(receipt){
        depositToggle() ;
        updateData(userId,damount,"plus") ;

       
       
    }).on('error', function(receipt){
        setModal(modal);

    })
    
}

const updateData = async (id,points,action) => {
    let secret = "randomKeytoAuthenticate" ;
    const response = await fetch(API_URL+'/updatePoints', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            points,
            action,
            secret
        }),
    })
    setModal(modal);
    getData() ;
    successToggle();
}

const logout = () => {
    localStorage.clear();
    window.location.href = "/game/login"
}
	 return (
		 <div>
             {
                 userData.data &&
    
            <div className='dashboard-main-rwap'>
                <div className='container'>
                    <div className='dashboard-wrap'>
                       <div className='dashboard'>
                       <div className='dashbord-input mr-4'>
                           <input type='text'placeholder='Name' value={userData.data.name}></input>
                           <input type='text'placeholder='Email' value={userData.data.email}></input>
                       </div>
                       <div className='dashboard-cont-cntr'>
                           <h3>{balance}</h3>
                           <p>Your {symbol} Balance</p>
                       </div>
                       <div className='dashboard-cont-right'>
                       <h3>{userData.data.points}</h3>
                           <p>Game Coin Balance</p>
                           <h3 className='mt-2'>{authPoints}</h3>
                           <p>Authorized {symbol} Reward</p>
                           
                       </div>
                       </div>
                       <div className='dashboard-but mt-2'>
                       <div className='purchase-but'>
                           <a onClick={logout}>Log Out</a>
                           </div>
                           {
                               wallet.account ?
                               <>
                               <div className='purchase-but'>
                             <a onClick={depositToggle}>Purchase</a>
                            </div>
                            {
                                userData.data.points > 0 &&
                            <div className='purchase-but'>
                             <a onClick={claimToggle}>Authorize</a>
                            </div>
}   
                            {
                                authPoints > 0 &&
                                <div className='claim-but ml-2'>
                                <a onClick={claim}>Claim</a>
                               </div>
                            }
                           
                           
                            
                               </>
                               :
                               <ConnectButton />
                           }
                           
                       
                         
                         
                       </div>
                    </div>
                    {/* <div className='history-heading'>
                        <h3>History</h3>
                    </div>
                    <div className='history-wrap'>
                        <ul className='history'>
                            <li>
                                <div className='hist-list'>
                                <h3>Date</h3>
                                <h3>Type</h3>
                                <h3>Discription</h3>
                                <h3>Amount</h3>
                                <h3>State</h3>
                                <h3>Process</h3>
                                </div>
                                <div className='hist-line'></div>
                            </li>
                            <li>
                                <div className='hist-list'>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                </div>
                                <div className='hist-line2'></div>
                            </li>
                            <li>
                                <div className='hist-list'>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                <p>lorem Ipsum</p>
                                </div>
                               
                            </li>
                        </ul>
                    </div> */}
{/* 
                    <div className='history-wrap-mob'>
                        <ul className='history-mob'>
                            <li>
                                <div className='hist-list-mob'>
                                
                                <h3>Date</h3>
                                <div className='hist-line-mob'></div>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                </div>
                                
                            </li>
                            <li>
                                <div className='hist-list-mob'>
                               
                                <h3>Type</h3>
                                <div className='hist-line-mob'></div>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                </div>
                           
                            </li>
                            <li>
                                <div className='hist-list-mob'>
                                
                                <h3>Discription</h3>
                                <div className='hist-line-mob'></div>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                </div>
                               
                            </li>
                            <li>
                                <div className='hist-list-mob'>
                                
                                <h3>Amount</h3>
                                <div className='hist-line-mob'></div>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                </div>
                                
                            </li>
                            <li>
                                <div className='hist-list-mob'>
                                
                                <h3>State</h3>
                                <div className='hist-line-mob'></div>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                </div>
                              
                            </li>
                            <li>
                                <div className='hist-list-mob'>
                                
                                <h3>Process</h3>
                                <div className='hist-line-mob'></div>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                </div>
                                
                            </li>
                             
                        </ul>
                    </div> */}

                </div>
            </div>
                     }

 <Modal isOpen={depositmodal} toggle={depositToggle}   centered={true}>

 
   <ModalBody>
           
      <div className="moveRight">
          
          <span> 
             Your {symbol} Balance<br />
             {balance} {symbol}
          </span>
      </div>
     <label><br />Enter Points to purchase
     {/* <span className="depositButton ml-2 p-2" onClick={setMaxDeposit}>Max</span> */}
     </label>
    <input className="form-control" onChange={handleDepositChange} type="number" step="1" min="1" value={damount} />
     <span className="mt-5 text-info" >Fee: {(stakefee*damount) } {symbol}  </span><br />                                        <div>
     {
         depositError &&
         <span className="error text-danger">{depositError}</span>
     }
   
       </div>
    
   </ModalBody>
   <ModalFooter>
       {
           (approval > 0 && approval > stakefee*damount) &&
           <Button className="depositButton mr-3" onClick={depositToken}>Deposit</Button>
       }
       {
           (approval == 0 || approval < stakefee) &&
           <Button className="depositButton mr-3" onClick={approveToken}>Approve {symbol}</Button> 
       }
     <Button className="depositButton" onClick={depositToggle}>Cancel</Button>
   </ModalFooter>
 </Modal>
 {
               userData.data &&
 <Modal isOpen={claimModal} toggle={claimToggle}   centered={true}>


   <ModalBody>
          
      <div className="moveRight">
          
          <span> 
             Your Points Balance<br />
             {userData.data.points}  
          </span>
      </div>
     <label><br />Enter Points to Authorize (to claim)
     {/* <span className="depositButton ml-2 p-2" onClick={setMaxDeposit}>Max</span> */}
     </label>
    <input className="form-control" onChange={handleClaimChange} type="number" step="1" min="1" value={pointsClaim} />
             <div>
     {
         depositError &&
         <span className="error text-danger">{depositError}</span>
     }
   
       </div>
    
    
   </ModalBody>
     
   <ModalFooter>
       {
           (userData.data.points > 0 && userData.data.points >= pointsClaim) &&
           <Button className="depositButton mr-3" onClick={authorize}>Authorize</Button>
       }
          
     <Button className="depositButton" onClick={claimToggle}>Cancel</Button>
   </ModalFooter>
 </Modal>
}
<Modal isOpen={modal} toggle={toggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4" >Transaction is Processing... Please do not close window.</div>      

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

export default Dashboard;