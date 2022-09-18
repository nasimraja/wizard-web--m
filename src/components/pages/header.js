import React, { Component, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import ConnectButton from './ConnectButton';

import '../css/dt-global_style.css'
import '../css/datatables.css'
import '../css/style.css'
import '../css/style2.css'
import '../css/responsive.css'
import '../css/responsive1.css'
// import '../css/navbar.css'
import $ from "jquery";
import {Link, Router} from 'react-router-dom';
import logo from '../images/logo.png';
import logo2 from '../images/logo2.png';
import burger from '../images/burger.png';
import crosss from '../images/crosss.png';
import brand1 from '../images/brand1.png';
import brand2 from '../images/brand2.png';
import brand3 from '../images/brand3.png';
import brand4 from '../images/brand4.png';
 


const Header = () => {
   

  useEffect(() =>{
    
    changePickupStoreMenu();

    function changePickupStoreMenu(){
     
        var body = $('body'),
            mask = $('<div class="mask"></div>'),
            toggleSlideRight = document.querySelector( ".toggle-slide-right" ),
            slideMenuRight = document.querySelector( ".slide-menu-right" ),
            activeNav = '';
        ;
        $('body').append(mask);
     
        /* slide menu right */
        toggleSlideRight.addEventListener( "click", function(){
            $('body').addClass("smr-open");
            $('.mask').fadeIn();
            activeNav = "smr-open";
        } );
     
        /* hide active menu if close menu button is clicked */
        $(document).on('click', ".close-menu", function(el,i){
            $('body').removeClass(activeNav);
            activeNav = "";
            $('.mask').fadeOut();
        });
     
    } 
  })

 

		return(
      <div>
        <div className="top-header-bg">
        <div className="container">
            <div className="wrp-top-header">
              <div className="topheaderchild1">
                <a href="/"><img src={logo2} /></a>
              </div>
              <div className="topheaderchild2">
                <ul className="top-headerlist">
                  {/* <li><a href="https://pancakeswap.finance/swap#/swap?outputCurrency=0x5066C68cAe3B9BdaCD6A1A37c90F2d1723559D18" target="_blank">PANCAKESWAP</a></li>
                  <li><a href="https://swap.wault.finance/bsc/#/swap?outputCurrency=0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" target="_blank">WAULT FINANCE</a></li>
                  <li><a href="https://exchange.babyswap.finance/#/swap?outputCurrency=0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" target="_blank">BABYSWAP</a></li>
                  <li><a href="https://dex.cafeswap.finance/#/swap?outputCurrency=0x5066C68cAe3B9BdaCD6A1A37c90F2d1723559D18" target="_blank">CAFESWAP</a></li> */}
                  <li>
                    <ConnectButton />
                    </li>  
                </ul>
              </div>
            </div>
        </div>
        </div>
        <div className="border-b">
        <div className="container">
          <div className="header-box">
            <div className="header-c1">
              <div className="logo-box">
                <a href="/">
                  <img src={logo2} />
                </a>
              </div>
            </div>
            <div className="header-c3">
              <ul className="menu-list-d">
                    <li><a href="/" className="mrl">Home</a></li>
                    <li><a href="/marketplace">Marketplace</a></li>
                    <li><a href="/choose">NFT ECOSYSTEM</a></li>
                    <li><a href="/games">Games</a></li>
                   {/*  <li><a href="/#partner-sec">Partners</a></li> */}
                    <li><a href="/iwo/list">Launchpad</a></li>
                    <li><a href="https://app.knightswap.financial" target="_blank">Knight</a></li>
                    <li>
                    <div class="dropdown2">
                    <a href="#"><button class="dropbtn">Spell Inventory</button></a>
                      <div class="dropdown-content">
                        <a href="/pools">Mana pools</a>
                        <a href="/farm">Gold farms</a>
                        <a href="https://wizard.financial/wp-content/uploads/2021/07/Wizard-White-Paper.pdf" target="_blank">WIZ Paper</a>
                        <a href="#">Pitch</a>
                        <a href="/faq" className="close-menu">FAQ</a>
                        <a href="/partners" className="close-menu">Partners</a>
                        <a href="https://forms.gle/q5stJeET1StSNe979" target="_blank"  className="close-menu">Partnership Application</a>
                        <a href="#">Our team</a>
                        <a href="https://wizard.financial/wp-content/uploads/2021/07/WIZARD-Full-Smart-Contract-Security-Audit.pdf" target="_blank">Audit</a>
                      
                      </div>
                    </div>
                    </li>
                   
                </ul>
                
            </div>
            <div className="header-c2">
             
            <div className="burger-area">
               <a href="#" className="burgers toggle-slide-right"> <img src={burger} /></a>
              </div>
            </div>
            
          </div>
              
              <div className="menu slide-menu-right menu-list-wrp">
                  <button class="close-menu"><img src={crosss} className="img-close" /></button>
                <ul className="menu-list2">
                  <li><a href="/" className="close-menu">Home</a></li>
                    <li><a href="/marketplace" className="close-menu">Marketplace</a></li>
                    <li><a href="/choose" className="close-menu">NFT ECOSYSTEM</a></li>
                     <li><a href="/games" className="close-menu">Games</a></li>
                   {/* <li><a href="/#partner-sec" className="close-menu">Partners</a></li> */}
                    <li><a href="/iwo/list" className="close-menu">Launchpad</a></li>
                    <li><a href="https://app.knightswap.financial/" target="_blank" className="close-menu">Knight</a></li>
                    <li>
                    <div class="dropdown2">
                      <a href="#">
                      <button class="dropbtn">Spell Inventory</button>
                      </a>
                      <div class="dropdown-content">
                        <a href="/pools" className="close-menu">Mana pools</a>
                        <a href="/farm" className="close-menu">Gold farms</a>
                        <a href="https://wizard.financial/wp-content/uploads/2021/07/Wizard-White-Paper.pdf" target="_blank" className="close-menu">WIZ Paper</a>
                        <a href="#" className="close-menu">Pitch</a>
                        <a href="/faq" className="close-menu">FAQ</a>
                        {/* <a href="/partners" className="close-menu">Partners</a> */}
                        <a href="/partners" className="close-menu">Partners</a>
                        <a href="https://forms.gle/q5stJeET1StSNe979" target="_blank" className="close-menu">Partnership Application</a>
                        <a href="#" className="close-menu">Our team</a>
                        <a href="https://wizard.financial/wp-content/uploads/2021/07/WIZARD-Full-Smart-Contract-Security-Audit.pdf" target="_blank" className="close-menu">Audit</a>
                      
                      </div>
                    </div>
                    </li>
                    <li className="mt-3 close-menu">
                    <ConnectButton />
                    </li>
                    
                </ul>
              </div>
          
        </div>
      </div>
      </div>
		);
 
}


export default Header;

