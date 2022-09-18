/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import $ from "jquery";
import properties from '../../images/properties.png'
import gallerylist from '../../images/gallerylist.png'
import detail from '../../images/detail.png'
import mgimg from '../../images/mgimg.jpg'
import LaunchIcon from '@mui/icons-material/Launch';
 



class Panelleft extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount = () => {
        // faq open js

        $(document).ready(function () {
            $('.block__title').click(function (event) {
                if ($('.block').hasClass('one')) {
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
                <section id="panel">
                    <div class="wrapper">
                        <div class="block one">
                            <div class="block__item-p">
                                <div class="block__title"><span><img src={properties} /></span>Properties</div>
                                <div class="block__text">
                                    <div className='properties-box-wrp'>
                                        <a href='#'>
                                            <div className='properties-box'>
                                                <h2>ARTIST</h2>
                                                <h3>SOMNAI</h3>
                                                <p>23% have this trait</p>
                                            </div>
                                        </a>
                                        <a href='#'>
                                            <div className='properties-box'>
                                                <h2>BIOME</h2>
                                                <h3>The Evergreen</h3>
                                                <p>0.75% have this trait</p>
                                            </div>
                                        </a>
                                        <a href='#'>
                                            <div className='properties-box'>
                                                <h2>DROP</h2>
                                                <h3>Ebbs And Flows</h3>
                                                <p>39% have this trait</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className='properties-box-wrp'>
                                        <a href='#'>
                                            <div className='properties-box'>
                                                <h2>RARITY</h2>
                                                <h3>The Holy Matria...</h3>
                                                <p>4% have this trait</p>
                                            </div>
                                        </a>

                                    </div>
                                </div>
                            </div>
                            <div class="block__item-p">
                                <div class="block__title"><span><img src={gallerylist} /></span>About Mirage Gallery Curated</div>
                                <div class="block__text">
                                    <div className='social-icon-l-wrp'>
                                        <div className='aboutcurated-wrp'>
                                            <div className='about-c-left'>
                                                <img src={mgimg} />
                                            </div>
                                            <div className='about-c-right'>
                                                <p>
                                                    The destination for beautiful and innovative AI artwork from a curated selection of artists.
                                                </p>
                                                <p>Mint here: <span><a href='https://www.miragegallery.ai/curated' target="_black">https://www.miragegallery.ai/curated</a></span></p>
                                            </div>
                                        </div>

                                        <div class="social-icon-l">
                                            <a href="#"><span class="si-popup">Facebook</span></a>
                                            <a href="#"><span class="si-popup">Twitter</span></a>
                                            <a href="#"><span class="si-popup">Google+</span></a>
                                            <a href="#"><span class="si-popup">Github</span></a>
                                            <a href="#"><span class="si-popup">Dribbble</span></a>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="block__item-p">
                                <div class="block__title"><span><img src={detail} /></span>Details</div>
                                <div class="block__text">
                                    <div className='detail-cont-wrp'>
                                        <div className='detail-cont'>
                                            <p>Contract Address</p>
                                            <p><a href='#'>0xb7ec...c4b5</a></p>
                                        </div>
                                        <div className='detail-cont'>
                                            <p>Token ID</p>
                                            <p><a href='#'>10676</a></p>
                                        </div>
                                        <div className='detail-cont'>
                                            <p>Token Standard</p>
                                            <p>ERC-721</p>
                                        </div>
                                        <div className='detail-cont'>
                                            <p>Blockchain</p>
                                            <p>Ethereum</p>
                                        </div>
                                        <div className='detail-cont'>
                                            <p>Creator Earnings<span>  <LaunchIcon title="View on Mirage Gallery Curated" /></span></p>
                                            <p>10%</p>
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

export default Panelleft;