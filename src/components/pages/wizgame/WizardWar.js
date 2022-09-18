import React, { Component } from 'react';
import DESKTOP  from '../../images/desktop.png';
import wiz2  from '../../images/dash.png';
import web  from '../../images/web.png';
import mob  from '../../images/mob.png';
import wizwar  from '../../images/WizardWars.png';
import mobweb from '../../images/mobweb.png'

class WizardWar extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}; 
	
	  }
	  componentDidMount = () =>{

	  }
	  
  render() {
	 return (
		 <div>
			 <section id="wingame-sec">
		<div className="container">
			<div className="game-head">
				<h3>Wizard Wars</h3>
			</div>
			
			<div className="row">
				<div className="col-lg-12">
					<div className="wrp-wizgame">
						<div className="wizgame-w">
						<div className="row">
							<div className="col-lg-6">
								<a href="https://s3.amazonaws.com/wizard.nft.media/WizardWarDesktop.zip" target="_blank">
									<div className="flat-box bag-500">
										<h3>DESKTOP</h3>
										<div className="img-falt">
                                        <img src={DESKTOP} className="kit img-fluid"/>
                                        </div>
									</div>
								</a>
							</div>
							<div className="col-lg-6">
							<a href="https://s3.amazonaws.com/wizard.nft.media/WizardWarsAndroid.apk" target="_blank">
								<div className="flat-box">
									<h3>Mobile</h3>
									<div className="img-falt">
                                    <img src={mob} className="mob img-fluid"/>
                                    </div>
								</div>
								</a>
								
							</div>
							 
						</div>
						<div className="row">
							<div className='col-lg-6'>
							<a href="https://game.wizard.financial/" target="_blank">
								<div className="flat-box">
									<h3>WEB</h3>
									<div className="img-falt">
                                    <img src={web} className='img-fluid'/>
                                    </div>
								</div>
								</a>
							</div>
						<div className="col-lg-6">
						<a href="https://mobile.wizard.financial/" >
									<div className="flat-box">
										<h3>Mobile Web</h3>
										<div className="img-falt">
                                        <img src={mobweb} className='img-fluid' />
                                        </div>
									</div>
								</a>
							</div>
						
							 
						</div>
						<div className='row'>
						<div className="col-lg-6 mb-5">
								<a href="/game/login" >
									<div className="flat-box">
										<h3>DASHBOARD</h3>
										<div className="img-falt">
                                        <img src={wiz2} className='img-fluid' />
                                        </div>
									</div>
								</a>
							</div>
							<div className="col-lg-6 mb-5">
								 
							</div>
						</div>
				
			
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

export default WizardWar;