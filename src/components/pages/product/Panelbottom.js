import React, { Component } from 'react';
import $ from "jquery";
import properties from '../../images/properties.png'
import gallerylist from '../../images/gallerylist.png'
import detail from '../../images/detail.png'


class Panelbottom extends Component {
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
                            <div class="block__item-pb">
                                <div class="block__title"><span><img src={properties} /></span>Item Activity</div>
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
                                            <h2>ARTIST</h2>
                                            <h3>SOMNAI</h3>
                                            <p>23% have this trait</p>
                                        </div>
                                        </a>
                                        <a href='#'>
                                        <div className='properties-box'>
                                            <h2>ARTIST</h2>
                                            <h3>SOMNAI</h3>
                                            <p>23% have this trait</p>
                                        </div>
                                        </a>
                                     </div>
                                     <div className='properties-box-wrp'>
                                        <a href='#'>
                                        <div className='properties-box'>
                                            <h2>ARTIST</h2>
                                            <h3>SOMNAI</h3>
                                            <p>23% have this trait</p>
                                        </div>
                                        </a>
                                         
                                     </div>
                                </div>
                            </div>
                            <div class="block__item-pb">
                                <div class="block__title"><span><img src={gallerylist} /></span>More From This Collection</div>
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
                                            <h2>ARTIST</h2>
                                            <h3>SOMNAI</h3>
                                            <p>23% have this trait</p>
                                        </div>
                                        </a>
                                        <a href='#'>
                                        <div className='properties-box'>
                                            <h2>ARTIST</h2>
                                            <h3>SOMNAI</h3>
                                            <p>23% have this trait</p>
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

export default Panelbottom;