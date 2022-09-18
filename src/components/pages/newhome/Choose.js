import React, { Component } from 'react';
import hero from '../../images/hero.png';
import Header from '../header.js';
import Footer from '../footer.js';
import search from '../../images/search.png';
import add from '../../images/add.gif';
import choose from '../../images/NFTFARM.jpg';
import choose2 from '../../images/NFTSALE.jpg';
import choose3 from '../../images/NFTFORGE.png';
import choose4 from '../../images/voting.png';
import NFTStake from '../../images/NFTStake.jpg'



class Choose extends Component{
    constructor(props) {
      super(props);
      this.state = {
      };
  
    }
  
  componentDidMount = () =>{

   
  }
  render(){
		return(
			
			
        <div className="bg-choose">
		 
          <div className="bannermain-bg">
          <section id="partner-sec" className="sec1">
		<div className="container">
      
			<div className="partner-head">
				<h3>NFT</h3>
			</div>
			<div className="row">
				<div className="col-lg-12">
					<div className="wrp-partner-bgimg">
						<div className="wrp-autobox1">
              <div className="row">
                <div className="col-lg-12">
                  {/* <div className="btn-center">
                    <a href="">
                      <img src={button}/>
                    </a>
                  </div> */}
              </div>
              </div>
              <div className='nftstake'>
              <div className="row">
                <div className="col-md-6">
                  <div className="btn-center1">
                  <a href="/nftpool">                
                    <img src={NFTStake} height="440px"/>
                  </a>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* <div className="btn-center2">
                    <a href="/choose/ino">
                      <img src={choose2} height="440px"/>
                    </a>
                  </div> */}
                </div>
              </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="btn-center1">
                  <a href="/stake">                
                    <img src={choose} height="440px"/>
                  </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="btn-center2">
                    <a href="/choose/ino">
                      <img src={choose2} height="440px"/>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row mt-3 pb-4" >
               
                <div className="col-md-6">
                  <div className="btn-center2">
                    <a href="/multistake/single">
                      <img src={choose3} height="440px"/>
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="btn-center2">
                    <a href="/events">
                      <img src={choose4} height="440px" className="igmB"/>
                    </a>
                  </div>
                </div>
               
              </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
  </div>
				  
           
					
            </div>
			
		);
  }

}
export default Choose;