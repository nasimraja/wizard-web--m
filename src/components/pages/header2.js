import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import { ToastContainer } from 'react-toastify';
import '../css/style.css'
import '../css/responsive.css'
// import '../css/navbar.css'
import $ from "jquery";
import {Link, Router} from 'react-router-dom';
import logo from '../images/logo.png';
import burger from '../images/burger.png';
import global from '../images/global.png';
import btn from '../images/btn.png';
import circle from '../images/circle.png';


class header2 extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentDidMount = () =>{
   
    

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
       
            
  }

	render(){
		return(
      <div className="border-b">
        <div className="container-fluid">
          <div className="header-box">
            <div className="header-c1">
              <div className="logo-box">
                <a href="/">
                  <img src={logo} />
                </a>
              </div>
            </div>
            <div className="header-c2">
             
            <div className="burger-area">
                <ul className="list-header">
                    <li><p><img src={global} /> $1765</p></li>
                    
                    <li><div className="buy-gemix-btn"><a href="#">Buy GAMIX</a></div></li>
                    <li>
                        <div className="gemix-d">
                            <a href="#" className="gamix325">325.68 GAMIX</a>
                            <a href="#" className="b994">OxOEef...b994 <img src={circle} className="circle-img" /></a>
                        </div>
                    </li>
                   
               </ul>
               <ul className="list-header2">
                  <li><a href="#" className="burgers toggle-slide-right"> <img src={burger} /></a></li>
               </ul>
               
              </div>
            </div>
            
          </div>
          <ul className="list-header mobile-header">
                    <li><p><img src={global} /> $1765</p></li>
                    
                    <li><div className="buy-gemix-btn"><a href="#">Buy GAMIX</a></div></li>
                    <li>
                        <div className="gemix-d">
                            <a href="#" className="gamix325">325.68 GAMIX</a>
                            <a href="#" className="b994">OxOEef...b994 <img src={circle} className="circle-img" /></a>
                        </div>
                    </li>
                   
               </ul>
              
              <div className="menu slide-menu-right menu-list-wrp">
                  <button class="close-menu">Close &rarr;</button>
                <ul className="menu-list2">
                  <li><a href="/">Home</a></li>
                  <li><a href="/deposit">Deposit</a></li>
                  
                </ul>
              </div>
          
        </div>
      </div>
		);
	}
}


export default header2;

