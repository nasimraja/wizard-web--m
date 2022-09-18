import React, { Component } from "react";

import $ from "jquery";

import Header from "../../pages/header.js";
import Footer from "../../pages/footer.js";
import sc1 from "../../images/sc1.png";
import sc2 from "../../images/sc2.png";
import sc3 from "../../images/sc3.png";
import sc4 from "../../images/sc4.png";
import ftm from "../../images/ftm.png";
import character from "../../images/character.png";
import acharactor from "../../images/acharactor.png";
import RMape from "../../images/RMape.png";
import tokens from "../../images/tokens.png";
import scroll from "../../images/scroll.png";
import web from "../../images/web.png";
import md from "../../images/md.png";
// import Vedio from '../../images/Guarddog.mp4'

// var sectionStyle = {

//   backgroundImage: "url(" + { Vedio } + ")"
// };
class NFTMarketplace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <div>
        <div className="nftmarketplace">
          <div className="nft-marketplace-main-wrap ">
            <div className="container">
              
                <div className="nft-marketplace-heading">
                  <h3>INO</h3>
                </div>
                {/* <div className="row"> */}
                <div className="nft-marketplace-wrap row justify-content-between">
              
                <div className="col-lg-6 nft-m-left bag-y">
                    <div className="nft-m-but ">
                      <h3>Predictcoin Squad is Predictcoin's 3D PRED Reward NFTs</h3>
                      <a href="/ino/0x0Da8972bC0B2ED6E6451Dd08D76c17a413C42305">
                        Buy
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-6 nft-m-right bag-2">
                    <div className="nft-m-but  ">
                      <h3>Loki God of Mischief INO.</h3>
                      <a href="/ino/0x2f56db956b80eb69427aa2f2266a033809675d5d">
                        Buy
                      </a>
                    </div>
                  </div>
      </div>
      <div className="nft-marketplace-wrap row">

                  <div className="col-lg-6  nft-m-left">
                    <div className="nft-m-but">
                      <h3>Wizard Battle Pass INO</h3>
                      <a href="/ino/0xe5a325f9cc94c5e04040014f3d3754b2f8304a2d">
                        Buy
                      </a>
                    </div>
                  </div>
                  
                  <div className="col-lg-6 nft-m-right bag-3">
                    <div className="nft-m-but">
                      <h3>The S3V3 is the LAST collection of the S300 NFTs.</h3>
                      <a href="/ino/0x273e820b1b6421dc79d65b54bea682e698c2d987">
                        Buy
                      </a>
                    </div>
                  </div>
</div>
<div className="nft-marketplace-wrap row">

                  {/* Adding */}
                  <div className="col-lg-6 nft-m-right bag-1">
                    <div className="nft-m-but">
                      <h3>The Guard Dogs INO.</h3>
                      <a href="/ino/0x046012d45abd55e73d23bc08e8d9b6cc74c8739c">
                        Buy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer />	 */}
        </div>
      // </div>
    );
  }
}
export default NFTMarketplace;
