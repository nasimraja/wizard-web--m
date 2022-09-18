import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import bannericon  from '../../images/bannericon.png';
import wizard  from '../../images/wizard.png';
import wizaartimg  from '../../images/wizaart-img.gif';
import tokent1  from '../../images/tokent.png';
import tokent2  from '../../images/tokent2.png';
import roadmap1  from '../../images/roadmap1.png';
import roadmap2  from '../../images/roadmap2.png';
import roadmap3  from '../../images/roadmap3.png';
import roadmapl  from '../../images/roadmapl.png';
import dm  from '../../images/dm.png';
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
import wiz  from '../../images/wiz.png';
import wiz2  from '../../images/wiz2.png';
import wiz3  from '../../images/wiz3.png';
import wiz4  from '../../images/wiz4.png';
import wiz5  from '../../images/wiz5.png';
import wiz6  from '../../images/wiz6.png';
import wiz7  from '../../images/wiz7.png';
import q1  from '../../images/q1.png';
import q2  from '../../images/q2.png';
import q3  from '../../images/q3.png';
import q4  from '../../images/q4.png';
import q5  from '../../images/q5.png';
import q6  from '../../images/q6.png';
import f1  from '../../images/f1.png';
import f2  from '../../images/f2.png';
import f3  from '../../images/f3.png';
import f4  from '../../images/f4.png';
import f5  from '../../images/f5.png';
import f6  from '../../images/f6.png';
import f8  from '../../images/f8.png';
import f9  from '../../images/f9.png';
import f10  from '../../images/f10.png';
import knightswap  from '../../images/KnightSwap.png';
import Explore from '../explore/Explore'
import Stake from '../newhome/Stake'
import { CHAIN_ID } from '../../../Config/index.js';
import ExploreNew from '../explore/ExploreNew.js';

function Home() {
  
	

  useEffect(() => {

	let copyText = document.querySelector(".copy-text");
copyText.querySelector("button").addEventListener("click", function () {
	let input = copyText.querySelector("input.text");
	input.select();
	document.execCommand("copy");
	copyText.classList.add("active");
	window.getSelection().removeAllRanges();
	setTimeout(function () {
		copyText.classList.remove("active");
	}, 2500);
});
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
  });

  return (
	<div>
 
	<div className="bannermain-bg">
		<section id="banner-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-7">
						<div className="banner-content">
							
							<h3>WHERE THE MAGIC HAPPENS</h3>
							<p>Welcome to WIZARD, a world of unique experience and magic never before available on the blockchain. Mint or Yield exclusive NFT’s, Play to Earn Crypto, or Explore Our Spell Inventory. 
							</p>
							<p>...You’re a WIZARD now; the possibilities are endless.</p>
							
							<div className="bnr-btn">
								<a href="https://dex.knightswap.financial/#/swap?outputCurrency=0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" target="_blank">Buy WIZARD</a>
								<a href="/marketplace" className="play-btn" target="_blank">Buy NFT</a>
							</div>
							<div className="copy-text contract-adr">
								<h3>Contract Address</h3>
								<input className="text" type="text" value="0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" />
									<button class="btn" type="button" data-clipboard-demo="" data-clipboard-target="#foo">
										COPY
									</button>
							</div>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="bnr-img">
							<img src={wizaartimg} />
						</div>
					</div>
				</div>
			</div>
		</section>
		{/* <section id="tokenomic-sec">
			<div className="container">
				<div className="wrp-tokenhead">
					<div className="tokenhead1">
						<img src={wizard} />
					</div>
					<div className="tokenhead2">
						<h3>Tokenomics</h3>
					</div>
					<div className="tokenhead3">
					<img src={wizard} />
					</div>
				</div>
				<div className="responsives">
				<div className="wrp-token-box">
					<div className="tokenboxc">
						<h3>Area</h3>
						<ul className="list-token">
							<li>Game funding</li>
							<li>Presale (oxbull)</li>
							<li>Presale (Seedify)</li>
							<li>Liquidity</li>
							<li>Team and advisor <br></br>token (locked)</li>
							<li>Ecosystem and <br></br>marketing</li>
						</ul>
					</div>
					<div className="tokenboxc tokenboxc-color">
						<h3>Percentage</h3>
						<ul className="list-token">
							<li>5%</li>
							<li>25%</li>
							<li>10%</li>
							<li>35%</li>
							<li>10%</li>
							<li>15%</li>
						</ul>
					</div>
					<div className="tokenboxc">
						<h3>WIZARD</h3>
						<ul className="list-token">
							<li>100000</li>
							<li>500000</li>
							<li>200000</li>
							<li>700000</li>
							<li>200000</li>
							<li>300000</li>
						</ul>
					</div>
					<div className="tokenboxc tokenboxc-color">
						<h3>Vesting Period</h3>
						<ul className="list-token">
							<li>10% at TGE rest 1</li>
							<li>year</li>
							<li>60% at TGE</li>
							<li>20% TGE Within first <br></br>6 months of launch</li>
							<li>10% release after <br></br>every 3 months</li>
							<li>20% at TGE rest over <br></br>5 months</li>
						</ul>
					</div>
					<div className="tokenboxc">
						<h3>Amount at TGE</h3>
						<ul className="list-token">
							<li>10000</li>
							<li>300000</li>
							<li>120000</li>
							<li>140000</li>
							<li></li>
							<li>60000</li>
						</ul>
					</div>
				</div>
				<div className="ido-wrp">
					<div className="ido-box">
						<h3>Ido price 0.5</h3>
					</div>
					<div className="ido-box idobox-color">
						<h3>Listing price 0.55</h3>
					</div>
					<div className="ido-box">
						<h3>Market cap at launch</h3>
					</div>
					<div className="ido-box idobox-color">
						<h3>280k</h3>
					</div>
				</div>
				</div>
				
			 <div className="amount-box">
					<p>Amount to raise 350k <br></br>
						TGE (Token Generation Event)</p>
				</div> 
			</div>
		</section>
		 */}

	<section id="roadmap">
			<div className="container">
				<div className="head-roadmap">
					<h3>KNIGHT SWAP</h3>
				</div>
				<a href="https://app.knightswap.financial/" target="_blank" >
				<img src={knightswap} style={{maxWidth: "100%"}} />
				</a>
				{/* <div className="main-roadmapbox pb-3" style={{backgroundColor: "transparent" ,  backgroundImage : "url(../images/knightswap.png)" ,backgroundRepeat: "no-repeat" ,  backgroundSize: "contain" ,height: "67vh" }} > */}
					 
					{/* <div className="automated-wrp">
						<h3>AUTOMATED LP</h3>
						<p>1% of tokens that incur slippage are added into the LP, to ensure that wizards’ magic never falters.</p>
						<h3>How it Works?</h3>
						<p>$WIZARD has 4% slippage on all transactions to prevent price manipulation from muggles and encourage wizards to hold.</p>

						<div className="wrp-tokengrt-list">
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets burned</li>
									<li>1% Goes towards Charity and Community</li>
								</ul>
							</div>
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets redistributed amongst all wizards</li>
									<li>1% Automated Market Making</li>
								</ul>
							</div>
						</div>
					</div> */}
				{/* </div> */}
			</div>
		</section>
	</div>
	
	<section id="roadmap" className="pt-5">
			<div className="container">
				<div className="head-roadmap">
					<h3>Road Map</h3>
				</div>
				<div className="main-roadmapbox">
					<div className="wrp-roadmap-content">
						<div className="roadmap-c1">
							<div className="roadmapimg1">
								<img src={roadmap1} />
							</div>
						</div>
						<div className="roadmap-c1">
							<div className="roadmap2">
								<img src={roadmap2} />
							</div>
							<div className="roadmapl">
								<img src={roadmapl} />
							</div>
						</div>
						<div className="roadmap-c1">
							<div className="roadmap2">
								<img src={roadmap3} />
							</div>
						</div>
					</div>
					{/* <div className="automated-wrp">
						<h3>AUTOMATED LP</h3>
						<p>1% of tokens that incur slippage are added into the LP, to ensure that wizards’ magic never falters.</p>
						<h3>How it Works?</h3>
						<p>$WIZARD has 4% slippage on all transactions to prevent price manipulation from muggles and encourage wizards to hold.</p>

						<div className="wrp-tokengrt-list">
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets burned</li>
									<li>1% Goes towards Charity and Community</li>
								</ul>
							</div>
							<div className="tokengetlist1">
								<ul className="tokengetlist">
									<li>1% Gets redistributed amongst all wizards</li>
									<li>1% Automated Market Making</li>
								</ul>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</section>
	
	<div className="mainbg  pb-5">
	<div className="marketplace-head">
                  <h3>marketplace</h3>
                </div>
	<div className="scrollable mb-3">
		<ExploreNew />
	</div>
	{
		CHAIN_ID == 56 && 
	<>
	<div className="marketplace-head">
                  <h3>stake nft</h3>
                </div>
	<div className="scrollable">
		<Stake />
	</div>
	</>
	}

	</div>
 
</div>
  );
}
export default Home;