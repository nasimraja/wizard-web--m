import React, { Component } from 'react';
import $ from "jquery";

import Header from '../header.js';
import Footer from '../footer.js';
import plus  from '../../images/plus.png';
import auctionhunt  from '../../images/auctionhunt.png';
import diamond  from '../../images/diamond.png';

class Multiple extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  };
  
	}
	
	componentDidMount = () =>{

        // fixed preview js
        $(window).scroll(function(){
            if ($(window).scrollTop() >= 300) {
                $('.wrp-preview').addClass('fixed-header');
                
            }
            else {
                $('.wrp-preview').removeClass('fixed-header');
                
            }
        });
        // fixed preview js
        var that = this ;

    //   setInterval(() => {
    //     console.log(that.saleon);
    //   }, 1000);
     function readURL(input, imgControlName) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $(imgControlName).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
    //   reader.readAsArrayBuffer(input.files[0])  // Read bufffered file

        // Callback
        reader.onloadend = () => {
            console.log("Buffer Read" ,Buffer(reader.result) )
            that.file =  Buffer(reader.result) ;
          
        }
  }
}

$("#imag").change(function() {
  // add your logic to decide which image control you'll use
  var imgControlName = "#ImgPreview";
  readURL(this, imgControlName);
  $('.preview1').addClass('it');
  $('.btn-rmv1').addClass('rmv');
});


$("#removeImage1").click(function(e) {
  e.preventDefault();
  $("#imag").val("");
  $("#ImgPreview").attr("src", "");
  $('.preview1').removeClass('it');
  $('.btn-rmv1').removeClass('rmv');
});
       
	  }

	render(){
		return(
			<div>
				<Header />
                <section id="create-sec">
    <div class="wrp-create-head">
        <div class="container">
            <div class="create-head">
               
            <h4 class="m-pdt">Create Multiple Collectible</h4>
            </div>
        </div>
    </div>
    <div class="file-sec">
        <div class="container">
            <div class="row coloum-r">
              
                <div class="col-lg-6">
                    <div class="upload-head">
                        <h4>Upload file</h4>
                    </div>
                    <div class="file-upload-wrp">
                        <form id="myform">
                        <div class="yes">
                            <span class="btn_upload">
                            <input type="file" id="imag"   title="" class="input-img"/>
                            Choose File
                            </span>
                        </div>
                        <p class="formats">PNG, GIF, WEBP, MP4 or <br></br>  MP3. Max 30mb</p>
                        </form>
                    </div>
                    <ul class="list-sales">
                        <li>
                            <div class="sales-l-c-wrp">
                                <div class="sales-l-c-child">
                                    <h4>Put on sale</h4>
                                    <p>You’ll receive bids on this item</p>
                                </div>
                                <div class="sales-l-c-child">
                                  <input class="switch" v-model="saleon" value="sale" type="checkbox"  />
                                </div>
                            </div>
                        </li>
                        <li v-if="saleon == true">
                            <div class="sales-l-c-wrp" >
                                <div class="sales-l-c-child">
                                    <h4>Instant sale price</h4>
                                    <p>Enter the price for which the item will be <br></br>instantly sold</p>
                                </div>
                                <div class="sales-l-c-child">
                                  <input class="switch" type="checkbox" v-model="instantsale" />
                                </div>
                            </div>
                        </li>
                        <li v-if="instantsale == true && saleon == true">
                            <div class="sales-l-c-wrp" >
                                
                                <div class="sales-l-c-child wrp-input">
                                  <input placeholder="Enter Price"  type="text" v-model="saleprice" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="sales-l-c-wrp">
                                <div class="sales-l-c-child">
                                    <h4>Unlock once purchased</h4>
                                    <p>Content will be unlocked after successful <br></br>transaction</p>
                                </div>
                                <div class="sales-l-c-child">
                                  <input class="switch" type="checkbox" v-model="unlockOncePurchased" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="sales-l-c-wrp">
                                <div class="sales-l-c-child">
                                    <h4>Choose collection</h4>
                                    <p>Content will be unlocked after successful <br></br>transaction</p>
                                </div>
                                <div class="sales-l-c-child">
                                 
                                </div>
                            </div>
                            <div class="create-box-wrp">
                               <a href="#popup1">
                                    <div class="create-box-c1">
                                    <div class="avtar-b">
                                        <img src={plus} />
                                    </div>
                                    <h4>Create</h4>
                                    <p>ERC-721</p>
                                </div>
                               </a>
                                <div id="popup1" class="overlay">
                                    <div class="popup">
                                       <div class="img-pop">
                                           <img src={diamond} />
                                       </div>
                                        <a class="close" href="#">&times;</a>
                                        <p>You should connect your wallet to sign messages and <br></br> send transactions to ethereum network</p>
                                        <button>Connect Wallet</button>
                                    </div>
                                </div>
                                <div class="create-box-c2">
                                     <a href="#" class="aount-hunt">
                                    <div class="create-box-c1">
                                    <div class="avtar-b">
                                        <img src={auctionhunt} />
                                    </div>
                                    <h4>Auction hunt</h4>
                                    <p>ERC-721</p>
                                </div>
                               </a>
                                </div>
                            </div>
                        </li>
                        <li>
                            
                                <div class="wrp-input">
                                    <label>Name</label>
                                    <input placeholder="eg. Reedimable T-shirt with logo" v-model="name" />
                                </div>
                                <div class="wrp-input">
                                    <label>Description <span>(optional)</span></label>
                                    <input placeholder="eg. Reedimable T-shirt with logo"  />
                                </div>
                                  <div class="wrp-royalities">
                                    <div class="royalities-child mart-in">
                                        <label>Royalties</label>
                                        <input  placeholder="10" />
                                    </div>
                                    <div class="royalities-child">
                                        <label>Number of copies</label>
                                        <input v-model="copies" placeholder="eg. 10" />
                                    </div>
                                </div>
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Properties</label>
                                        <input  placeholder="eg. size" />
                                    </div>
                                    <div class="royalities-child martb-top">   
                                        <label>Size</label>
                                        <input  placeholder="eg. M" />
                                    </div>
                                </div>
                                <div class="crate-items">
                                    <button>Create item</button>
                                </div>
                                
                                
                        </li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <div class="wrp-preview">
                            <div class="upload-head">
                                <h4>Preview</h4>
                            </div>
                            <div class="yes preview-img">
                                <img id="ImgPreview" src="" class="preview1" />
                                <input type="button"  id="removeImage1" value="x" class="btn-rmv1" />
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
export default Multiple;