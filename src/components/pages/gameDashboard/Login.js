import React, { useState } from 'react'
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import $ from "jquery";

import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../../Config';





const Login1 = () => {

    const [forgetModal, setforgetModal] = useState(false);
    const forgetToggleModal = () => setforgetModal(!forgetModal);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [unsuccessModal, setunsuccessModal] = useState(false);
    const unsuccessToggleModal = () => setunsuccessModal(!unsuccessModal);
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [Loader2, setLoader2] = useState(false);
    const [alerts, setalerts] = useState(false)
    


    async function loginUser(event) {
        setLoader2(true)
        setalerts(false)
        event.preventDefault()


        const response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
       

        const data = await response.json()
        setLoader2(false)
        if (data.meesage == "successfull") {
            localStorage.setItem('game_user_id', data.data);
            navigate("/game/dashboard");
        }
        else{
            setalerts(true) 
        }
       

    }
    async function forgotPassword(event) {
        setLoader(true)
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
        setLoader(false)
        if (data.meesage == "successfull") {
            successToggleModal();
            forgetToggleModal();
            
        }
        else {
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
                                    <button type="submit" onClick={forgotPassword}>Submit
                                    {
                                    Loader &&
                                    <div id="loader"></div>
                                }
                                    </button>
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>
                    <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <p>Password reset email has been sent to your registered email address.</p>
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
                            <h3>login</h3>
                        </div>
                        <div className='login-input-box'>
                            <input type='text'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Username'></input>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder='Password'></input>
                        </div>
                        <div className='forget-password'>
                            <a href='#' onClick={forgetToggleModal}>Forgot Password?
                               
                            </a>
                        </div>
                        {
                            alerts &&
                            <p className="invalid-p">Invalid Login</p>
                        }
                        <div className='login-but'>
                            <a onClick={loginUser}>Login
                            {
                                    Loader2 &&
                                    <div id="loader"></div>
                                }
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login1;