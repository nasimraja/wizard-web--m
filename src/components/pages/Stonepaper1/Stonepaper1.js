import { useEffect, useState } from "react";
import { Params, useParams } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import Web3 from "web3";
import useWallet from '@binance-chain/bsc-use-wallet'
import Img3 from "../../images/stonepaper/img3.png";
import Img4 from "../../images/stonepaper/img4.png";
import Img5 from "../../images/stonepaper/img5.png";
import Icon1 from "../../images/stonepaper/icon1.png";
import Icon2 from "../../images/stonepaper/icon2.png";
import Icon3 from "../../images/stonepaper/icon3.png";
import ContractAbi from "../../../Config/ContractAbi.json";
import nftAbi from "../../../Config/NFT_ABI.json";
import { NFT_VOTING } from "../../../Config";




export const Stonepaper1 = () => {


  const provider = window.ethereum;
  const wallet = useWallet();


  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [completeTransactionModal, setCompleteTransactionModal] = useState(false);
  const completeTransactiontogglemodal = () => setCompleteTransactionModal(!completeTransactionModal);

  const [failTransactionModal, setFailTransactionModal] = useState(false);
  const failTransactiontogglemodal = () => setFailTransactionModal(!failTransactionModal);

  const [nobalnceModal, setNobalnceModal] = useState(false);
  const nobalncetoggleModal = () => setNobalnceModal(!nobalnceModal);

  const [votestringArray, setVotestringArray] = useState([]);
  const [voteunitArray, setVoteunitArray] = useState([]);
  const [votedescriptionArray, setVotedescriptionArray] = useState([]);
  const [nftAddress, setNftAddress] = useState("");
  const [blance, setBlance] = useState("");
  const [tokenid, setTokenid] = useState("");


  const { index } = useParams();

  

  useEffect(() => {
    geteventDetails();
  


  }, [nftAddress, wallet.account]);




  const geteventDetails = async () => {

    const web3 = new Web3(provider);
    const contractABi = new web3.eth.Contract(ContractAbi, NFT_VOTING);
    const eventDetails = await contractABi.methods.getEventDetails(index).call()
    console.log("eventDetails", eventDetails);
    setNftAddress(eventDetails[0]);
    setVotestringArray(eventDetails[1]);
    setVoteunitArray(eventDetails[3]);
    console.log(eventDetails[2]);
    setVotedescriptionArray(eventDetails[2]);
    if(wallet.account){
      getBlanceDetails(eventDetails[0]);

    }
    // getBlanceDetails function call




  }


  const getBlanceDetails = async (_nftAddress) => {
    const web3 = new Web3(provider);
    const Nftcontract = new web3.eth.Contract(nftAbi, _nftAddress);
    const BlanceDetails = await Nftcontract.methods.balanceOf(wallet.account).call();
 

    setBlance(BlanceDetails)

   
    if (BlanceDetails > 0) {

      const tokenId = await Nftcontract.methods.tokenOfOwnerByIndex(wallet.account,0).call();
      // alert(tokenId);
      setTokenid(tokenId);
    }
  }



  const castVotes = async (i) => {
    const option = i;

    const web3 = new Web3(provider);
    const contractABi = new web3.eth.Contract(ContractAbi, NFT_VOTING);
    console.log(index, tokenid, option);
    // alert(blance)
      if (blance > 0) {
      setModal(!modal);
       contractABi.methods.castVote(index, tokenid, option).send({
        from: wallet.account
      }).on('receipt', function (receipt) {

        completeTransactiontogglemodal();
        geteventDetails()
      }).on('error', function (receipt) {
        failTransactiontogglemodal();

      })
    }
    else {
      nobalncetoggleModal();
    }


  }


  return (
    <>

      <div className="wrap-4">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="bag-8">
                {
                  votedescriptionArray[0] &&
                  <img src={votedescriptionArray[0]} alt="" className="bag-5" />
                }
                {/* <img src={Img5} alt="" className="bag-7" />
                <img src={Img4} alt="" className="bag-6" /> */}
                {/* <button>
                  NFT's <br /> Availbale 5
                </button> */}
              </div>
            </div>
            <div className="col-md-7">
              <div className="bag-9">
                <h2>{votedescriptionArray[1]}</h2>
                <p>
                  {votedescriptionArray[2]}
                </p>
              </div>
              <div className="bag-10">
                <div className="row">

                  {
                    votestringArray.length > 0 && votestringArray.map((val, i) => {
                      return (
                        <div className="col-md-4">
                          <div className="bag-11">
                            <div className="bag-12" onClick={() => castVotes(i)}>
                              <h3>Vote</h3>
                            </div>
                            <p onClick={() => castVotes(i)}>{val}</p>
                            <button onClick={() => castVotes(i)}>{voteunitArray[i]}</button>
                          </div>
                        </div>
                      )
                    })

                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal isOpen={modal} toggle={toggle} centered={true}>


        <ModalBody>
          <div className="modaltext text-center mt-4" >Transaction is Processing...</div>

        </ModalBody>
        <Button className="depositButton" onClick={toggle}>Close</Button>

      </Modal>


      <Modal isOpen={completeTransactionModal} toggle={completeTransactiontogglemodal} centered={true}>


        <ModalBody>
          <div className="modaltext text-center mt-4" >Transaction Completed</div>

        </ModalBody>
        <Button className="depositButton" onClick={completeTransactiontogglemodal}>Close</Button>

      </Modal>


      <Modal isOpen={failTransactionModal} toggle={failTransactiontogglemodal} centered={true}>


        <ModalBody>
          <div className="modaltext text-center mt-4" >Transaction Failed</div>

        </ModalBody>
        <Button className="depositButton" onClick={failTransactiontogglemodal}>Close</Button>

      </Modal>


      <Modal isOpen={nobalnceModal} toggle={nobalncetoggleModal} centered={true}>


        <ModalBody>
          <div className="modaltext text-center mt-4" >No NFT balance in your wallet.</div>

        </ModalBody>
        <Button className="depositButton" onClick={nobalncetoggleModal}>Close</Button>

      </Modal>


    </>
  );
};