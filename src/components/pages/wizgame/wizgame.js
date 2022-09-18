import React, { Component } from 'react';
import wiz  from '../../images/wiz.png';
import wiz2  from '../../images/wiz2.png';
import wiz3  from '../../images/wiz3.png';
import wizwar  from '../../images/WizardWars.png';
import {Link} from "react-router-dom"
class Wizgame extends Component {
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
				<h3>Wiz Game</h3>
			</div>
			
			<div className="row">
				<div className="col-lg-12">
					<div className="wrp-wizgame">
						<div className="wizgame-w">
						<div className="row">
						
							<div className="col-lg-4">
								<a href="https://wizard.financial/platformer/" target="_blank">
									<div className="flat-box">
										<h3>Heros vs Demon lords</h3>
										<img src={wiz} />
									</div>
								</a>
							</div>
							<div className="col-lg-4">
								<a href="https://wizard.financial/fluppy-wuz/" target="_blank">
								<div className="flat-box">
									<h3>Fluppy wuz</h3>
									<img src={wiz2} />
								</div>
								</a>
							</div>
							<div className="col-lg-4">
								<a href="https://dragonsden.wizard.financial/" target="_blank">
								<div className="flat-box">
									<h3>dragon's den</h3>
									<img src={wiz3} />
								</div>
								</a>
							</div>
						</div>
						<div className="row">
						<div className="col-lg-4">
							</div>
						<div className="col-lg-4">
								<Link to="/game/wizardwar" >
									<div className="flat-box">
										<h3>Wizard Wars</h3>
										<img src={wizwar} />
									</div>
								</Link>
							</div>
							<div className="col-lg-4">
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

export default Wizgame;