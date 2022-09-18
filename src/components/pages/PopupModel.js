/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import calculatoericon from '../images/calculatoericon.png'

function PopupModel() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <a href='#' onClick={handleShow}><img src={calculatoericon} /></a>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ROI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='model-cont-wrp'>
                        <li>
                            <h3 className='model-hding'>Timeframe</h3>
                            <ul className='model-cont-child'>
                                <li>1d</li>
                                <li>7d</li>
                                <li>30d</li>
                                <li>365d(annual)</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className='model-hding'>ROI</h3>
                            <ul className='model-cont-child'>
                                <li>0.55%</li>
                                <li>3.90%</li>
                                <li>17.81%</li>
                                <li>634.88%</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className='model-hding'>ACK per $1000</h3>
                            <ul className='model-cont-child'>
                                <li>722.17</li>
                                <li>5139.03</li>
                                <li>24477.72</li>
                                <li>836746.48</li>
                            </ul>
                        </li>
                    </ul>
                    <p className='model-para'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Get ACK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupModel;