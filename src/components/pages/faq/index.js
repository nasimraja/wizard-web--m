import React, { Component } from 'react';
import $ from "jquery";
import q1  from '../../images/q1.png';
import q2  from '../../images/q2.png';
import q3  from '../../images/q3.png';
import q4  from '../../images/q4.png';
import q5  from '../../images/q5.png';
import p1  from '../../images/p1.png';
import p2  from '../../images/p2.png';
import p3  from '../../images/p3.png';
import p4  from '../../images/p4.png';
import p5  from '../../images/p5.png';
import p6  from '../../images/p6.png';
import p7  from '../../images/p7.png';
import p8  from '../../images/p8.png';
import p9  from '../../images/p9.png';
import p10  from '../../images/p10.png';
import p11  from '../../images/p11.png';
import p12  from '../../images/p12.png';
class Faq extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	
	  }
	  componentDidMount = () =>{
            // faq open js

		$(document).ready(function() {
			$('.block__title').click(function(event) {
				if($('.block').hasClass('one')){
					$('.block__title').not($(this)).removeClass('active');
					$('.block__text').not($(this).next()).slideUp(300);
				}
				$(this).toggleClass('active').next().slideToggle(300);
			});
		
		});

		// closed faq js
	  }
	  
  render() {
	 return (
		 <div>
			<section id="faq-section">
		<div className="container">
			<div className="head-faq">
				<h3>FAQ</h3>
			</div>
			<div className="wrp-faq">
				<div className="row">
					<div className="col-lg-11">
					<div class="wrapper">
						<div class="block one">
							<div class="block__item">
								<div class="block__title">Q: What is a wizard financial?</div>
								<div class="block__text">
								Ans Wizard is a fantasy-based ecosystem that is solely made to revolutionize 
								the P2E and NFTs use case on the blockchain. Wizard gives unique NFT based solutions 
								for all sorts of DEFI processes, Which include NFT farms, NFT pools, NFT Armory, NFT 
								swap, and much more. While WIzard is definitely unique with its approach for NFTs it 
								is also aiming to change and dominate 
								the P2E gaming on the blockchain, We have Bridge
								 steam games, Wizard wars, Quidditch, and much more.
								</div>
							</div>
							<div class="block__item">
								<div class="block__title">Q: What are the benefits of holding WIZARD?</div>
								<div class="block__text">
									Holding WIZARD comes with the following benefits:
									<p>1) Access to P2E</p>
									<p>2) Cheaper Access to NFT marketplace</p>
									<p>3) Access to utility NFT farms</p>
									<p>4) Access to IWO</p>
									<p>5) Access to NFT armory</p>
								</div>
							</div>
							<div class="block__item">
								<div class="block__title">Q: What is IWO?</div>
								<div class="block__text">
								And IWO stands for Initial Wizard Offering is a launchpad by wizard financial 
								but with use-case of NFTS you can buy guaranteed allocation by achieving certain 
								NFTs you can trade those NFTs on our marketplace too. For the rest of the allocation, 
								people will be able to participate by holding WIZARD in their wallets.
								</div>
							</div>
							<div class="block__item">
								<div class="block__title">Q: What is KNIGHT and how it is related to WIZARD?</div>
								<div class="block__text">
									Ans A fierce and brave warrior a protector of human realm more details will be revealed shortly
								</div>
							</div>
							<div class="block__item">
								<div class="block__title">Q: What is so unique about the WIZARD NFT marketplace?</div>
								<div class="block__text">
								Ans WIZARD NFT marketplace is made to trade all sorts of erc721 whether it a game weapon,
								 other projects NFT, your personally minted NFT on any other platform. Motivation behind 
								 WIZARD marketplace is the ability to trade the weapons, tools and characters that are used 
								 in other P2E ecosystem.

									
								</div>
							</div>
							
							
					
						</div>
					</div>
					</div>
					<div className="col-lg-1">
						<ul className="dm-list">
							<li><img src={q1} /></li>
							<li><img src={q2} /></li>
							<li><img src={q3} /></li>
							<li><img src={q4} /></li>
							<li ><img src={q5} /></li>
					
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
    
		 </div>

    );
  }
}

export default Faq;