import { useState, useEffect } from "react";
import Web3 from "web3";
import { NFT_VOTING } from "../../../Config";
import ContractAbi from "../../../Config/ContractAbi.json";






const Event = () => {

    const [upcomingEventArray, setUpcomingEventArray] = useState([]);
    const provider = window.ethereum;
   
    const [votedescriptionArray, setVotedescriptionArray] = useState([]);
    const [eventBuleanVal,seteventBuleanVal]= useState([]);


    useEffect(() => {
        getTotalvotingEvent();
        geteventDetails();

    }, [])



    const getTotalvotingEvent = async () => {
        const web3 = new Web3(provider);
        const contractABi = new web3.eth.Contract(ContractAbi, NFT_VOTING);
        const votingevent = await contractABi.methods.totalvotingEvents().call()


        let _commingEvents = [];

        for (let i = 0; i < votingevent; i++) {

            _commingEvents.push({
                count: i
            });

            if (i == (votingevent - 1)) {

                setUpcomingEventArray(_commingEvents);

            }

        }

    }


    const geteventDetails = async () => {
        const web3 = new Web3(provider);
        const contractABi = new web3.eth.Contract(ContractAbi, NFT_VOTING);
        const eventDetails = await contractABi.methods.getEventDetails(1).call()
        console.log("eventDetails", eventDetails);
        setVotedescriptionArray(eventDetails[2]);
        seteventBuleanVal(eventDetails[4]);
        

    }

    const eventItemhandle = (i) => {
        window.location.href = "/event/details/" + i;
    }


    return (
        <div>

            <div className="wrap-4">
                <div className="container">

                    {
                         upcomingEventArray.length   > 0 ? <> {
                             upcomingEventArray.map((v, i) => {
                                return (
                    
                                    <div className="main-event-box">
    
                                        <a href="#" onClick={() => eventItemhandle(i + 1)} className="event-box-wrp">
                                            <div className="eventHover">
                                                <div className="event-box">
                                                    <h3>{votedescriptionArray[1]}</h3>
                                                    <img src={votedescriptionArray[0]} />
                                                    
    
                                                </div>
                                            </div>
                                            <div class="middle">
                                                        <button className="event-click-btn" onClick={() => eventItemhandle(i + 1)} >View</button>
                                                    </div>
                                        </a>
                                    </div>
    
                                )
                            })
                        }</> : <p className="noeventsfound">No Events Found</p>
                    }

                   

                </div>
            </div>

        </div>
    )
}


export default Event;

