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
import mobula from '../../images/mobula.png'
class Partners extends Component {
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
		
    <section id="partner-sec">
		<div className="container">
			<div className="partner-head">
				<h3>Partners</h3>
			</div>
			<div className="row">
				<div className="col-lg-12">
					<div className="wrp-partner-bgimg">
						<div className="wrp-autobox">
							<a href="https://apeswap.finance/" target="_blank">
								<div className="auto-box">
									<div className="auto-content-box">
										<h3>APESWAP</h3>
									</div>
									<div className="autocircle-box">
										<img src={p1} />
									</div>
								</div>
							</a>
							<a href="https://babyswap.io/"  target="_blank">
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>Baby swap</h3>
								</div>
								<div className="autocircle-box">
									<img src={p2} />
								</div>
							</div>
							</a>
							<a href="(https://honeyfarm.finance/" target="_blank">
								<div className="auto-box">
									<div className="auto-content-box">
										<h3>Honey farm</h3>
									</div>
									<div className="autocircle-box">
										<img src={p3} />
									</div>
								</div>
							</a>
							<a href="https://www.oxbull.tech/" target="_blank">
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>Oxbull</h3>
								</div>
								<div className="autocircle-box">
									<img src={p4} />
								</div>
							</div>
							</a>
							<a href="(http://seedify.fund/" target="_blank">
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>Seedify</h3>
								</div>
								<div className="autocircle-box">
									<img src={p5} />
								</div>
							</div>
							</a>
							<a href="https://www.wolfdencrypto.com/" target="_blank">
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>Wolfden</h3>
								</div>
								<div className="autocircle-box">
									<img src={p6} />
								</div>
							</div>
							</a>
							<a href="https://cafeswap.finance/" target="_blank">
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>Cafeswap</h3>
								</div>
								<div className="autocircle-box">
									<img src={p7} />
								</div>
							</div>
							</a>
							<a href="https://autoshark.finance/" target="_blank">
								<div className="auto-box">
									<div className="auto-content-box">
										<h3>Autoshark</h3>
									</div>
									<div className="autocircle-box">
										<img src={p8} />
									</div>
								</div>
							</a>
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>koala defi</h3>
								</div>
								<div className="autocircle-box">
									<img src={p9} />
								</div>
							</div>
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>ditto</h3>
								</div>
								<div className="autocircle-box">
									<img src={p10} />
								</div>
							</div>
							<a href="https://treasurekey.bet/" target="_blank">
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>treasure key</h3>
								</div>
								<div className="autocircle-box">
									<img src={p11} />
								</div>
							</div>
							</a>
							<a href="https://wault.finance/" target="_blank">
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>wault</h3>
								</div>
								<div className="autocircle-box">
									<img src={p12} />
								</div>
							</div>
							</a>
							<a href="https://mobula.fi/asset/wizard?utm_source=listing&utm_medium=wizard&utm_campaign=website" target="_blank">
							<div className="auto-box">
								<div className="auto-content-box">
									<h3>Mobula</h3>
								</div>
								<div className="autocircle-box">
									<img src={mobula} />
								</div>
							</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
		 </div>

    );
  }
}

export default Partners;