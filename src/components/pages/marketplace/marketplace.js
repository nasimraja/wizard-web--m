import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import $ from "jquery";

import Header from '../../pages/header.js';
import Footer from '../../pages/footer.js';
import wizaartimg from '../../images/wizaart-img.gif';
import check from '../../images/check.png';
import acc from '../../images/acc.png';
import CollectionBanner1 from '../../images/CollectionBanner1.jpg';
import CollectionBanner2 from '../../images/CollectionBanner2.jpg';
import BigFootBanner from '../../images/BigFootBannerS.jpg';
import BeyondtheMacrosS from '../../images/BeyondtheMacrosS.png';
import GluckS from '../../images/GluckS.png';
import NutritionS from '../../images/NutritionS.png';
import PageLadderS from '../../images/PageLadderS.png';
import ReignS from '../../images/ReignS.png';
import SabersS from '../../images/SabersS.png';
import SystemS from '../../images/SystemS.png';
// import CollectionBanner1 from '../../images/acc.png';
import Explore from '../explore/Explore.js';
import TopPicks from '../explore/TopPicks.js';
import TopSellers from '../explore/TopSellers.js';
import ExploreNew from '../explore/ExploreNew.js';
import BABA from '../../images/BabaS.png';
import Wolf from '../../images/WolfdeS.png';
import DEAP from '../../images/DEAPS.png';
import EIGHT from '../../images/EIGHTS.png';
import LNB from '../../images/LNBS.png';
import CustomHappyS from '../../images/CustomHappyS.png';

import EMCOTechnology from '../../images/EMCO Technology(800x800).png';
import OGAlchemist from '../../images/OG Alchemist ( 800x800).png';
import TheWealthSanctum from '../../images/The Wealth Sanctum(800x800).jpg';

const Marketplace = () => {


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 992 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };



    return (
        <div className="marketplace-bg">

            {/* <section className="marketplace-sec2">
                <div className="container">
                    <div className="wrp-head-marketplace">
                        <div className="head-marketchild2">
                            <h3>Top picks</h3>
                        </div>

                    </div>
                    <div className="row">
                        <TopPicks />
                    </div>
                </div>
            </section> */}
            <section id="banner-section" className="pt-5">
                <div className="container">

                    <div className="head-marketchild2">
                        <h3>Featured Collections</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <a href="/collection/0x8E97A48d9aAa499D8DE338B0759b05AD174">
                                <div className="collection-b">
                                    <div className="shadow-div">
                                        <div className="collect-content">
                                            <div className="col-box"><p>Collection</p></div>
                                            <h3>WIzard Official <img src={check} /></h3>
                                            <p>Welcome to WIZARD, a world of unique experience and magic never before available on the blockchain. Mint or Yield exclusive NFT’s, Play to Earn Crypto,
                                                or Explore Our Spell Inventory. </p>
                                            <div className="view-btn">
                                                <a href="/collection/0x4D1294c48EaCF4D5242e68509D2703117B6440B4">View items on sale</a>
                                                <a href="#" className="visit-website">Visit website</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-lg-6">
                            <ul className="featured-list mrt-featured">
                                <li>
                                    <div className="wrp-featured-list">
                                        <div className="featuredlist-img" style={{ backgroundImage: Wolf }}>

                                        </div>
                                        <div className="featuredlist-content">
                                            <div className="ect-box">
                                                <a href="/collection/0xf6237d61a59a8bC87e46Ea2341d96E1E32424B8d">Collection</a>
                                                <p>Wolf Den <img src={check} className="img-check" /></p>
                                                <div>
                                                    <a href="/collection/0xf6237d61a59a8bC87e46Ea2341d96E1E32424B8d" className="view-item">View items on sale</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="wrp-featured-list">
                                        <div className="featuredlist-img featuredlist-img2" style={{ backgroundImage: BABA }}>

                                        </div>
                                        <div className="featuredlist-content">
                                            <div className="ect-box">
                                                <a href="/collection/0xB7aFA8475c4B08D8eb37320EC54a53732013872D">Collection</a>
                                                <p>BABA <img src={check} className="img-check" /></p>
                                                <div>
                                                    <a href="/collection/0xB7aFA8475c4B08D8eb37320EC54a53732013872D" className="view-item">View items on sale</a>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Carousel responsive={responsive}
                        transitionDuration={1000}
                        itemClass="carousel-item-margin-40-px">
                        <div>

                            <a href="/collection/0x52d5F5e14d0a23F1ab36D741aBd675C9D8477362"><img src={EMCOTechnology} className="slide-img" /></a>
                        </div>
                        <div>

                            <a href="/collection/0xf7C86d64995471ce7cae19DcE391532071b71B8A"><img src={OGAlchemist} className="slide-img" /></a>
                        </div>
                        <div>

                            <a href="/collection/0x140Ade6442f2F60A357E9B272047f7Af520B2453"><img src={TheWealthSanctum} className="slide-img" /></a>
                        </div>
                        <div>

                            <a href="/collection/0x903BC3810E404E71C479A4E53bFb415c433b026c"><img src={LNB} className="slide-img" /></a>
                        </div>
                        <div>

                            <a href="/collection/0x93f25B36Ba668a66927b233F0263D7d5CC0ef03F"><img src={EIGHT} className="slide-img" /></a>
                        </div>
                        <div>
                            <a href="/collection/0x4054ae4f4C5db663E38FfeBc5B4aE14383B9be59"><img src={BeyondtheMacrosS} className="slide-img" /></a>

                        </div>
                        <div>

                            <a href="/collection/0x60150e683C081c113ff776f16096F1a3CB064e05"><img src={GluckS} className="slide-img" /></a>
                        </div>
                        <div>

                            <a href="/collection/0x65726303Fdc3932c4eB90f62f41f139D100797bC"><img src={PageLadderS} className="slide-img" /></a>
                        </div>
                        <div>
                            <a href="/collection/0xaab2Be0b3Fd73b6bDF509C50c434FC0b2b1CEe89"><img src={NutritionS} className="slide-img" /></a>


                        </div>
                        <div>
                            <a href="/collection/0x8A83dce4bb96548499fd2aAf45F0c2Ef6d9Af063"><img src={ReignS} className="slide-img" /></a>

                        </div>
                        <div>
                            <a href="/collection/0x6127c6180A5Dd538ab224f4179FC76eD56268AD6"><img src={SystemS} className="slide-img" /></a>

                        </div>
                        <div>

                            <a href="/collection/0x1926f0fd85CF2eC6B93dD9392e04FC337209Ae47"><img src={SabersS} className="slide-img" /></a>
                        </div>
                        <div>

                            <a href="/collection/0xE7d93EB6bF80c0E44B8AC7d119686b71d2AD6DaA"><img src={CustomHappyS} className="slide-img" /></a>
                        </div>
                        <div>

                            <a href="/collection/0x3707B21D7E3cbf338849C2E8C6D50670445ce83B"><img src={DEAP} className="slide-img" /></a>
                        </div>

                    </Carousel>
                </div>

            </section>
            {/* <section id="featured-sec" className="pt-5">
                    <div className="container">
                            <div className="head-marketchild2">
                                <h3>Featured Collections</h3>
                            </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <a href="/collection/0x4D1294c48EaCF4D5242e68509D2703117B6440B4">
                                    <div className="collection-b">
                                       <div className="shadow-div">
                                            <div className="collect-content">
                                                <div className="col-box"><p>Collection</p></div>
                                                <h3>WIzard Official <img src={check} /></h3>
                                                <p>Welcome to WIZARD, a world of unique experience and magic never before available on the blockchain. Mint or Yield exclusive NFT’s, Play to Earn Crypto,
or Explore Our Spell Inventory. </p>
                                                <div className="view-btn">
                                                    <a href="/collection/0x4D1294c48EaCF4D5242e68509D2703117B6440B4">View items on sale</a>
                                                      <a href="#" className="visit-website">Visit website</a>  
                                                </div>
                                            </div>
                                       </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-lg-6">
                                <ul className="featured-list mrt-featured">
                                    <li>
                                        <div className="wrp-featured-list">
                                            <div className="featuredlist-img" style={{backgroundImage: BigFootBanner}}>
                                          <img src={CollectionBanner2} />  
                                            </div>
                                            <div className="featuredlist-content">
                                                <div className="ect-box">
                                                    <a href="/collection/0xA42d1FeC93C1f4aE99703b27f239346B38fCE36A">Collection</a>
                                                    <p>BigFoot <img src={check} className="img-check" /></p>
                                                    <div>
                                                        <a href="/collection/0xA42d1FeC93C1f4aE99703b27f239346B38fCE36A" className="view-item">View items on sale</a>
                                                    </div>
                                                     <div>
                                                        <a href="#" className="visit-web">Visit website</a>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="wrp-featured-list">
                                            <div className="featuredlist-img featuredlist-img2" style={{backgroundImage: CollectionBanner2}}>
                                             <img src={CollectionBanner2} />  
                                            </div>
                                            <div className="featuredlist-content">
                                                <div className="ect-box">
                                                    <a href="/collection/0x4D1294c48EaCF4D5242e68509D2703117B6440B4">Collection</a>
                                                    <p>Magic Boxes <img src={check} className="img-check" /></p>
                                                    <div>
                                                        <a href="/collection/0x4D1294c48EaCF4D5242e68509D2703117B6440B4" className="view-item">View items on sale</a>
                                                    </div>
                                                    <div>
                                                        <a href="#" className="visit-web">Visit website</a>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section> */}
            <TopSellers />

            <ExploreNew />

        </div>
    );


}
export default Marketplace;