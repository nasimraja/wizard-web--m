import React, { useState } from 'react'
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import $ from "jquery";

import { useNavigate, useParams } from 'react-router-dom';

import { API_URL } from '../../../Config';





const Fogot = () => {

    const [forgetModal, setforgetModal] = useState(false);
    const forgetToggleModal = () => setforgetModal(!forgetModal);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [unsuccessModal, setunsuccessModal] = useState(false);
    const unsuccessToggleModal = () => setunsuccessModal(!unsuccessModal);
    const navigate = useNavigate();
    const {token} = useParams();
    const [alerts, setalerts] = useState(false);
    const [Loader, setLoader] = useState(false);



    async function loginUser(event) {
        setLoader(true)
        if(password != confirmPassword ){
            setalerts(true);
            return false;
        }
       
        event.preventDefault()
        

        const response = await fetch(API_URL + '/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                token
            }),
        })

        const data = await response.json()
        setLoader(true)
        if (data.meesage == "successfull") {
            successToggleModal();
            setTimeout(() => {
                navigate("/game/login");
            },3000)
        }
        else{
            unsuccessToggleModal();
            setalerts(false)
            
        }
       
       

    }
    async function forgotPassword(event) {
        
        event.preventDefault()


        const response = await fetch(API_URL + '/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email

            }),
        })

        const data = await response.json()

        if (data.meesage == "successfull") {
            successToggleModal();
            forgetToggleModal();
        }
        else{
            unsuccessToggleModal();
            forgetToggleModal();
        }
       

    }


    return (
        <div>
            <div className='login-main-rwap'>
                <div className='container'>
                    <Modal isOpen={forgetModal} toggle={forgetToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={forgetToggleModal}><span className="ml-1 roititle font-weight-bold">Forgot Password</span></ModalHeader>
                        <ModalBody>
                            <div className="wrp-forget-box">
                                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                                <div className="submit-btn">
                                    <button type="submit" onClick={forgotPassword}>Submit</button>
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>
                    <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <p>Password has been reset successfully.</p>
                            </div>
                        </ModalBody>

                    </Modal>
                    <Modal isOpen={unsuccessModal} toggle={unsuccessToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={unsuccessToggleModal}><span className="ml-1 roititle font-weight-bold">Unsuccessfull</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <p>We couldn't find you in our records.</p>
                            </div>
                        </ModalBody>

                    </Modal>
                    <div className='login-wrap'>
                        <div className='login-heading'>
                            <h3>Reset Password</h3>
                        </div>
                        <div className='login-input-box'>
                           
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder='Password'></input>
                                <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                placeholder='Confirm Password'></input>

{
                            alerts &&
                            <p className="match">Password doesn't match </p>
                        } 
                        </div>
                        <div className='forget-password'>
                            <a href='/game/login' >Login</a>
                        </div>
                        <div className='login-but'>
                            <a onClick={loginUser}>Reset</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Fogot;