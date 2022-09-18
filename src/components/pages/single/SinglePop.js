/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { Component, useEffect, useState } from 'react';
import $ from "jquery";
import { Row, Col, Container,Button,ModalHeader,ModalFooter, Modal, ModalBody } from "reactstrap";

import Config, {MARKETPLACE} from "../../../Config"
import MARKETPLACE_ABI from "../../../Config/MARKETPLACE_ABI.json"
import NFT_ABI from "../../../Config/NFT_ABI.json"

import Header from '../header.js';
import Footer from '../footer.js';
import plus  from '../../images/plus.png';
import auctionhunt  from '../../images/auctionhunt.png';
import diamond  from '../../images/diamond.png';
import axios from "axios";
import Web3 from "web3"

import useWallet from '@binance-chain/bsc-use-wallet'




const SinglePop = (props) => {
    let web3Provider  = window.ethereum ; 
    const wallet = useWallet();
	const [filedata , setFileData] = useState([]) ;
	const [fileName , setFileName] = useState(null) ;
	const [fileType , setFileType] = useState(null) ;
    
	const [saleon , setSaleon] = useState(true) ;
	const [instantsale , setInstantsale] = useState(null) ;
	const [price , setPrice] = useState(null) ;
	const [name , setName] = useState(null) ;
	const [description , setDescription] = useState(null) ;
	const [artist , setArtist] = useState(null) ;

	const [height , setHeight] = useState(null) ;
	const [breadth , setBreadth] = useState(null) ;
	const [length , setLength] = useState(null) ;
	const [weight , setWeight] = useState(null) ;
	const [tags , setTags] = useState(null) ;

	const [publicProfileLink , setPublicProfileLink] = useState(null) ;
	const [startTime , setStartTime] = useState(null) ;
	const [endTime , setEndTime] = useState(null) ;
	const [auctionToken , setAuctionToken] = useState(null) ;
    const [auctionTokenArray, setAuctionTokenArray] = useState([]);
	
    const [modal, setModal] = useState(false);
    const [apiModal, setApiModal] = useState(false);
    const [mintModal, setMintModal] = useState(false);
    const [onSaleModal, setOnSaleModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [mined, setMinded] = useState(false);
    const [approved, setApproved] = useState(false);
    
    
    const apiToggle = () => setApiModal(!apiModal);
    const mintToggle = () => setMintModal(!mintModal);
    const saleToggle = () => setOnSaleModal(!onSaleModal);
    const successToggle = () => setSuccessModal(!successModal);
    const modalToggle = () => setModal(!modal);
    

    if(window.ethereum){
        web3Provider  = window.ethereum;
      }
      else{
        web3Provider = new Web3.providers.HttpProvider(Config.RPC_URL)
       
      }
      useEffect(() =>{
        if(wallet.account){
            getApproval() ;
getTokenList() ;

        }
      },[wallet.account])


    useEffect(() =>{

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
         

    //   setInterval(() => {
    //     console.log(that.saleon);
    //   }, 1000);
     function readURL(input, imgControlName) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $(imgControlName).attr('src', e.target.result);
      

    }
    console.log(input.files)
    setFileName(input.files[0].name);
    setFileType(input.files[0].type);
    setFileData(input.files[0]) ;

    reader.readAsDataURL(input.files[0]);
    //   reader.readAsArrayBuffer(input.files[0])  // Read bufffered file

        // Callback
        // reader.onloadend = () => {
        //     console.log("Buffer Read" ,Buffer(reader.result) )
        //     // setFile(Buffer(reader.result)) ;
          
        // }
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

       
	  })


      const handleSaleon = (e) => {
          console.log(e.target.checked);
          setSaleon(e.target.checked);
      }

      const handleInstantSale = (e) => {
        console.log(e.target.checked);
        setInstantsale(e.target.checked);
    }

 
    const handlePrice = (e) => {
        // console.log(e.target.checked);
        setPrice(e.target.value);
    }

    const handleName = (e) => {
        // console.log(e.target.checked);
        setName(e.target.value);
    }

    const handleDescription = (e) => {
        // console.log(e.target.checked);
        setDescription(e.target.value);
    }

    const handleArtist = (e) => {
        // console.log(e.target.checked);
        setArtist(e.target.value);
    }

    const handleLength = (e) => {
        // console.log(e.target.checked);
        setLength(e.target.value);
    }


    const handleBreadth = (e) => {
        // console.log(e.target.checked);
        setBreadth(e.target.value);
    }



    const handleHeight = (e) => {
        // console.log(e.target.checked);
        setHeight(e.target.value);
    }


    const handleWeight = (e) => {
        // console.log(e.target.checked);
        setWeight(e.target.value);
    }


    const handleTags = (e) => {
        // console.log(e.target.checked);
        setTags(e.target.value);
    }

    const handlePublicProfileLink = (e) => {
        // console.log(e.target.checked);
        setPublicProfileLink(e.target.value);
    }

    const handleAuctionToken  = (e) => {
        console.log(e.target.value);
        setAuctionToken(e.target.value);
    }

    const handleStartTime = (e) => {
        console.log(e.target.value);
        setStartTime(e.target.value);
    }

    const handleEndTime = (e) => {
        console.log(e.target.value);
        setEndTime(e.target.value);
    }


    const getTokenList = async () => {
        let _web3 = new Web3(web3Provider);
        let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
        let _length = await _marketPlaceContract.methods.gettokenCount().call() ;
        let temp = [] ;
        let tokens = [] ; 

        for(let i = 0 ; i < _length; i++){
             let _token = await _marketPlaceContract.methods.getApprovedToken(i).call() ;
             if(!tokens.includes(_token[2])){
                temp.push(_token);
                tokens.push(_token[2]);
             }
             if((_length -1) == i){
                 setAuctionTokenArray(temp);
             }
        }
     
    } 
 
    const reset = () => {
        setAuctionToken('');
        setFileName('');
        setFileType('');
        setFileData('');
        setName('');
        setDescription('');
        setArtist('');
        setPublicProfileLink('');
        setPrice('');
        setStartTime('');
        setEndTime('');
        setInstantsale(false);
        setSaleon(true);
        setMinded(false);
        $("#imag").val("");
        $("#ImgPreview").attr("src", "");
        $('.preview1').removeClass('it');
        $('.btn-rmv1').removeClass('rmv');


    }

    const putauction = async () => {
        let id = props.id ;
        let _web3 = new Web3(web3Provider);
        let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
        let _sPrice = _web3.utils.toWei(price) ;
        let _sTime =  new Date(startTime).getTime() / 1000 ;
        let _eTime = new Date(endTime).getTime() / 1000 ;
        let _title = props.name ; 
        setOnSaleModal(true);

        if(instantsale){
 

        _marketPlaceContract.methods.openInstantSellAuction(id,_sPrice,auctionToken,_title).send({
            from: wallet.account

        }).on('receipt', function(receipt){
            setOnSaleModal(false);
            setSuccessModal(true);
           reset() ;
           props.saleToggle() ;


        }).on('error', function(receipt){
            setOnSaleModal(false) ;


        });

        }
        else{
   
        
        _marketPlaceContract.methods.openAuction(auctionToken,id,_sPrice,_sTime,_eTime,_title).send({
            from: wallet.account

        }).on('receipt', function(receipt){
            setOnSaleModal(false);
            setSuccessModal(true);
           reset() ;
            props.saleToggle() ;

        }).on('error', function(receipt){
            setOnSaleModal(false) ;


        });
 
    }
    }

    const putauctionImported = async () => {
        let id = props.id ;
        let _web3 = new Web3(web3Provider);
        let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
        let _sPrice = _web3.utils.toWei(price) ;
        let _sTime =  new Date(startTime).getTime() / 1000 ;
        let _eTime = new Date(endTime).getTime() / 1000 ;
        let _title = !props.name  ? "" : props.name ; 
        setOnSaleModal(true);
        
        if(instantsale){
 

        _marketPlaceContract.methods.openOtherInstantSellAuction(props.address,id,_sPrice,auctionToken,_title).send({
            from: wallet.account

        }).on('receipt', function(receipt){
            setOnSaleModal(false);
            setSuccessModal(true);
           reset() ;
           props.saleToggle() ;


        }).on('error', function(receipt){
            setOnSaleModal(false) ;


        });

        }
        else{
   
        
        _marketPlaceContract.methods.openOtherAuction(auctionToken,props.address,id,_sPrice,_sTime,_eTime,_title).send({
            from: wallet.account

        }).on('receipt', function(receipt){
            setOnSaleModal(false);
            setSuccessModal(true);
           reset() ;
            props.saleToggle() ;

        }).on('error', function(receipt){
            setOnSaleModal(false) ;


        });
 
    }
    }
    const createToken = async () => {
        setMinded(false);

        let _web3 = new Web3(web3Provider);
        let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
        let _nft = await _marketPlaceContract.methods.nftAddress().call() ;
        let _nftContract = new _web3.eth.Contract(NFT_ABI,_nft);
        console.log(filedata);
        var formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("artist", artist);
        formData.append("public_profile_link", publicProfileLink);
        formData.append("filename", fileName);
        formData.append("fileType", fileType);
        formData.append("filedata", filedata);

        formData.append("height", height);
        formData.append("breadth", breadth);
        formData.append("length", length);
        formData.append("weight", weight);
        formData.append("tags", tags);

        setApiModal(true) ;
        axios 
        .post("https://dev.wizard.financial/api/uploadmeta", formData,
        {
            headers: {
            'content-Type': 'multipart/form-data'
          }}
          ) 
        .then((response) => {
        setApiModal(false) ;

            if(response.data.result == "success"){
                setMintModal(true);
                
                _nftContract.methods._Mint(response.data.id,response.data.url).send({
                    from: wallet.account
                }).on('receipt', function(receipt){
                setMintModal(false);
                    if(saleon && !mined){
                        console.log(response.data.id);
                        setMinded(true);
                        if(props.imported){
                            putauctionImported(response.data.id)
                        }
                        else{
                            putauction(response.data.id) ;

                        }
                    }
                    else{
                           setSuccessModal(true);
                           reset() ;
                        
                    }
               
                }).on('error', function(receipt){
                 
                setMintModal(false);

                })
            }
        //   setPost(response.data);
        }).catch(function (error) {
            setApiModal(false) ;


        });
    }

    const getApproval = async () => {
        let _web3 = new Web3(web3Provider);
        let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
        let _nft = await _marketPlaceContract.methods.nftAddress().call() ;
        if(props.imported){
            _nft  = props.address ;
        }
        let _nftContract = new _web3.eth.Contract(NFT_ABI,_nft);
        let _approevd  = await _nftContract.methods.isApprovedForAll(wallet.account,MARKETPLACE).call();
        setApproved(_approevd);
        }

        const approveToken = async () => {
            let _web3 = new Web3(web3Provider);
            let _marketPlaceContract = new _web3.eth.Contract(MARKETPLACE_ABI,MARKETPLACE);
            let _nft = await _marketPlaceContract.methods.nftAddress().call() ;
            if(props.imported){
                _nft  = props.address ;
            }
            let _nftContract = new _web3.eth.Contract(NFT_ABI,_nft);
            setModal(true);

             _nftContract.methods.setApprovalForAll(MARKETPLACE,true).send({
                 from: wallet.account
                }).on('receipt', function(receipt){
                    setModal(false);

                    getApproval() ;
                }).on('error', function(receipt){
                 
                    setModal(false);
    
                 })
           
            }
        
	 
		return(
			<div>
			 
                <section id="create-sec-pop">
      
        <div class="container">
            <div class="row coloum-r">
                
                <div class="col-lg-12">
                     
                    <ul class="list-sales">
                        
                      
                        
                        {
                             saleon == true && 
                        <li  >
                            <div class="sales-l-c-wrp" >
                                <div class="sales-l-c-child">
                                    <h4>Instant sale</h4>
                                    <p>Enter the price for which the item will be <br></br>instantly sold</p>
                                </div>
                                <div class="sales-l-c-child">
                                  <input class="switch" type="checkbox"  checked={instantsale}
                                  onChange={handleInstantSale}
                                  value={instantsale} />
                                </div>
                            </div>
                        </li>
                        }

                        {
                             saleon == true && 
                           
                         <div class="wrp-royalities marti-top">
                         <div class="royalities-child mart-in">
                             <label>Price</label>
                             <input  placeholder="Enter Price" 
                              onChange={handlePrice}
                              type="text"
                     
                             value={price} />
                         </div>
                         <div class="royalities-child martb-top">   
                             <label>Token</label>
                             <select  
                             
                             onChange={handleAuctionToken}
                              value={auctionToken} >
                                          <option value="" >---Select---</option>

                                  {
                                     auctionTokenArray.length > 0 && auctionTokenArray.map((v,i) => {
                                        return (
                                          <option value={v[2]} >{v[0]} (Fee: {parseFloat(v[1]/100)}%)</option>
                                        )
                                     } )
                                  }
                                 </select>
                         </div>
                     </div>
                       
                        }
                         {
                             saleon == true && !instantsale &&
                       <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Start Date</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleStartTime}
                                         type="datetime-local"
                                
                                        value={startTime} />
                                    </div>
                                    <div class="royalities-child martb-top">   
                                        <label>End Date</label>
                                        <input  
                                        
                                        onChange={handleEndTime}
                                        type="datetime-local"
                                        placeholder="eg. M" value={endTime} />
                                    </div>
                                </div>
                        }

                        <div class="crate-items d-flex justify-content-center">
                                    {
                                        approved ? 
                                        props.imported ?
                                        <button onClick={putauctionImported}>Put On Sale</button>
                                        :
                                        <button onClick={putauction}>Put On Sale</button>
                                        :
                                    <button onClick={approveToken}>Approve to Create</button>
                                        
                                    }
                                </div>
                    
                        {/* <li>
                            
                                <div class="wrp-input">
                                    <label>Name</label>
                                    <input placeholder="eg. Reedimable T-shirt with logo" 
                                  onChange={handleName}
                                    
                                    value={name} />
                                </div>
                                <div class="wrp-input">
                                    <label>Description <span>(optional)</span></label>
                                    <textarea placeholder="eg. Reedimable T-shirt with logo" 
                                  onChange={handleDescription}
                                    
                                    value={description} ></textarea>
                                </div>
                                
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Artist</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleArtist}
                                
                                        value={artist} />
                                    </div>
                                    <div class="royalities-child martb-top">   
                                        <label>Public Profile Link</label>
                                        <input  
                                        
                                        onChange={handlePublicProfileLink}
                                        
                                        placeholder="eg. M" value={publicProfileLink} />
                                    </div>
                                </div>
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Length</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleLength}
                                
                                        value={length} />
                                    </div>
                                    <div class="royalities-child martb-top">   
                                        <label>Breadth</label>
                                        <input  
                                        
                                        onChange={handleBreadth}
                                        
                                        placeholder="eg. M" value={breadth} />
                                    </div>
                                </div>
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Height</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleHeight}
                                
                                        value={height} />
                                    </div>
                                    <div class="royalities-child martb-top">   
                                        <label>Weight</label>
                                        <input  
                                        
                                        onChange={handleWeight}
                                        
                                        placeholder="eg. M" value={weight} />
                                    </div>
                                </div>
                                <div class="wrp-royalities marti-top">
                                    <div class="royalities-child mart-in">
                                        <label>Tags</label>
                                        <input  placeholder="eg. size" 
                                         onChange={handleTags}
                                
                                        value={tags} />
                                    </div>
                                   
                                </div>
                                <div class="crate-items">
                                    {
                                        approved ?
                                        <button onClick={createToken}>Create item</button>
                                        :
                                    <button onClick={approveToken}>Approve to Create</button>
                                        
                                    }
                                </div>
                                
                                
                        </li> */}
                        
                    </ul>
                  
                </div>
                <Button className="depositButton mr-auto ml-auto mb-5 mt-5" onClick={props.saleToggle}>Close</Button>
              
                
            </div>
    </div>
    
    </section>

       
   <Modal isOpen={apiModal} toggle={apiToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4 pb-3" >Saving NFT Media and Creating Meta... <br />Do not Close Tab/Window or reload</div>      

   </ModalBody>
 
 </Modal>

 <Modal isOpen={mintModal} toggle={mintToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4 pb-3" >Minting NFT Transaction in progress... <br />Do not Close Tab/Window or reload</div>      

   </ModalBody>
 
 </Modal>


 <Modal isOpen={onSaleModal} toggle={saleToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4 pb-3" >Creating Auction on Marketplace.</div>      

   </ModalBody>
 
 </Modal>


 <Modal isOpen={successModal} toggle={successToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4 pb-3" >Transaction Successfull.</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={successToggle}>Close</Button>
 
 </Modal>

    
 <Modal isOpen={modal} toggle={modalToggle}  centered={true}>
   
        
   <ModalBody>
   <div className="modaltext text-center mt-4 pb-3" >Transaction is Processing...</div>      

   </ModalBody>
   <Button className="depositButton mr-auto ml-auto mb-5" onClick={modalToggle}>Close</Button>
    
 </Modal>

			</div>
		);
 

}
export default SinglePop;