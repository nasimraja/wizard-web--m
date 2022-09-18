import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from "jquery";
import footerlogo  from '../images/footerlogo.png';
import socials1  from '../images/social1.png';
import socials2  from '../images/social2.png';
import socials3  from '../images/social3.png';
import socials4  from '../images/social4.png';
import socials5  from '../images/social5.png';

class Footer extends Component {
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
			 <div className="bg-footer">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<ul className="socila-list">
								<li><a href="https://twitter.com/WIZARD_BSC" target="_blank"><img src={socials1} /></a></li>
								<li><a href="https://t.me/wizard_financial" target="_blank"><img src={socials2} /></a></li>
								<li><a href="https://medium.com/@wizardtokenofficial" target="_blank"><img src={socials3} /></a></li>
								<li><a href="https://discord.com/invite/dfKrgACzHx" target="_blank"><img src={socials4} /></a></li>
								<li><a href="https://bscscan.com/token/0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18" target="_blank"><img src={socials5} /></a></li>
							</ul>
						</div>
					</div>
				</div>
			 </div>
		 </div>

    );
  }
}

export default Footer;