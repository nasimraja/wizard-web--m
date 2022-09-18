import React, { Component } from 'react';

import $ from "jquery";

import Header from '../header.js';
import Footer from '../footer.js';
import sc1  from '../../images/sc1.png';
import sc2  from '../../images/sc2.png';
import sc3  from '../../images/sc3.png';
import sc4  from '../../images/sc4.png';
import ftm  from '../../images/ftm.png';
import character  from '../../images/character.png';
import acharactor  from '../../images/acharactor.png';
import RMape  from '../../images/RMape.png';
import tokens  from '../../images/tokens.png';
import scroll  from '../../images/scroll.png';
import web  from '../../images/web.png';
import md  from '../../images/md.png';
 


class NFTMarketplace extends Component{ 
	constructor(props) {
	  super(props);
	  this.state = {
	  };
  
	}
	
	componentDidMount = () =>{

	
		
				
	  }

	render(){
		return(
			<div>
			<div className="nftmarketplace">
		 
			 <div className='nft-marketplace-main-wrap'>
                 <div className='container-fluid'>
                 <div className='nft-marketplace-heading'>
                     <h3>INO</h3>
                 </div>
                 <div className='nft-marketplace-wrap'>
                     <div className='nft-m-left'>
                       <div className='nft-m-but'>
                       <h3>Wizard Battle Pass INO</h3>
                         <a href='/ino/0xe5a325f9cc94c5e04040014f3d3754b2f8304a2d'>Buy</a>
                       </div>
                     </div>
                     <div className='nft-m-right'>
                     <div className='nft-m-but'>
                       <h3>The S3V3 is the LAST collection of the S300 NFTs.</h3>
                         <a href='/ino/0x42c4D8341B4B9F2fCCc3C46e37a08F6EDA0501F3'>Buy</a>
                       </div> 
                     </div>
                 </div>
                 </div>
             </div>
			{/* <Footer />	 */}
			</div>
			
			</div>
		);
	}

}
export default NFTMarketplace;