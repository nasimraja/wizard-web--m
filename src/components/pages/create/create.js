import React, { Component } from 'react';
import $ from "jquery";

import Header from '../header.js';
import Footer from '../footer.js';
import single  from '../../images/single2.png';
import multiple  from '../../images/multiple.png';


class Create extends Component{
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
		 
                <section id="create-sec">
                <div class="create-head">
                <h4>Create Collectible</h4>
                </div>
            <div class="container">
            <div class="craete-content">
                <p>Choose "Single" if you want your collectible to be one of a kind or "Multiple" if you want to sell one collectible multiple times</p>
                <div class="row">
                <div class="col-lg-6">
                    <div class="craete-c-img">
                    <a href="/single">
                        <img src={single} />
                    </a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="craete-c-img">
                    <a href="/multiple">
                        <img src={multiple} />
                    </a>
                    </div>
                </div>
                </div>
                <p>We do not own your private keys and cannot access your funds without your confirmation</p>
            </div>
            </div>
            </section>
			</div>
		);
	}

}
export default Create;