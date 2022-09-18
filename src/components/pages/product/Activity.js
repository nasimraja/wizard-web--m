import React from "react";
// import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Table from "react-bootstrap/Table";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import properties from "../../images/properties.png";
import transfer from "../../images/icons/transfer.png";
import sale from "../../images/icons/sale.png";
import newicon from "../../images/icons/newicon.png";
import stars from "../../images/icons/stars.png";
import ethereumpurple from "../../images/ethereumpurple.png";
function Activity() {
  return (
    <div className="activity-wrapper">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <div className="summary">
              <span>
                <img src={properties} />
              </span>
              Item Activity
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="accordian-table">
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Price</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="saleicon">
                      {" "}
                      <img src={transfer} alt="" /> Transfer
                    </td>
                    <td></td>
                    <td>
                      <a href="#">👩🏿‍🎤.eth</a>
                    </td>
                    <td>
                      <a href="#">RahGold</a>
                    </td>
                    <td className="newicon">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            August 15 2022,5:10am
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <span disabled style={{ pointerEvents: "none" }}>
                            3 days ago
                          </span>
                        </a>
                      </OverlayTrigger>
                      <img src={newicon} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="saleicon">
                      <img src={sale} alt="" />
                      Sale
                    </td>
                    <td className="ether">
                      <img src={ethereumpurple} alt="" />
                      0.0446
                    </td>
                    <td>
                      <a href="#">👩🏿‍🎤.eth</a>
                    </td>
                    <td>
                      <a href="#">RahGold</a>
                    </td>
                    <td className="newicon">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            August 15 2022,5:10am
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <span disabled style={{ pointerEvents: "none" }}>
                            3 days ago
                          </span>
                        </a>
                      </OverlayTrigger>
                      <img src={newicon} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="saleicon">
                      <img src={transfer} alt="" />
                      Transfer
                    </td>
                    <td></td>
                    <td>
                      <a href="#">artmindedfreak</a>
                    </td>
                    <td>
                      <a href="#">👩🏿‍🎤.eth</a>
                    </td>
                    <td className="newicon">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            August 15 2022,5:10am
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <span disabled style={{ pointerEvents: "none" }}>
                            6 days ago
                          </span>
                        </a>
                      </OverlayTrigger>
                      <img src={newicon} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="saleicon">
                      <img src={sale} alt="" />
                      Sale
                    </td>
                    <td className="ether">
                      <img src={ethereumpurple} alt="" />
                      0.0411
                    </td>
                    <td>
                      <a href="#">artmindedfreak</a>
                    </td>
                    <td>
                      <a href="#">👩🏿‍🎤.eth</a>
                    </td>
                    <td className="newicon">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            August 15 2022,5:10am
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <span disabled style={{ pointerEvents: "none" }}>
                            6 days ago
                          </span>
                        </a>
                      </OverlayTrigger>
                      <img src={newicon} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="saleicon">
                      <img src={transfer} alt="" />
                      Transfer
                    </td>
                    <td></td>
                    <td>
                      <a href="#">0xlostspace</a>
                    </td>
                    <td>
                      <a href="#">artmindedfreak</a>
                    </td>
                    <td className="newicon">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            August 15 2022,5:10am
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <span disabled style={{ pointerEvents: "none" }}>
                            8 days ago
                          </span>
                        </a>
                      </OverlayTrigger>
                      <img src={newicon} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="saleicon">
                      <img src={sale} alt="" />
                      Sale
                    </td>
                    <td className="ether">
                      <img src={ethereumpurple} alt="" />
                      0.045
                    </td>
                    <td>
                      <a href="#">9460EC</a>
                    </td>
                    <td>
                      <a href="#">0xlostspace</a>
                    </td>
                    <td className="newicon">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            August 15 2022,5:10am
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <span disabled style={{ pointerEvents: "none" }}>
                            8 days ago
                          </span>
                        </a>
                      </OverlayTrigger>
                      <img src={newicon} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="saleicon">
                      <img src={transfer} alt="" />
                      Transfer
                    </td>
                    <td></td>
                    <td>
                      <a href="#">9460EC</a>
                    </td>
                    <td>
                      <a href="#">0xlostspace</a>
                    </td>
                    <td className="newicon">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            August 15 2022,5:10am
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <span disabled style={{ pointerEvents: "none" }}>
                            13 days ago
                          </span>
                        </a>
                      </OverlayTrigger>
                      <img src={newicon} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="saleicon">
                      <img src={stars} alt="" />
                      Minted
                    </td>
                    <td className="ether">
                      <img src={ethereumpurple} alt="" />
                      0.06
                    </td>
                    <td>
                      <a href="#">NullAddress</a>
                    </td>
                    <td>
                      <a href="#">9460EC</a>
                    </td>
                    <td className="newicon">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            August 15 2022,5:10am
                          </Tooltip>
                        }
                      >
                        <a href="#">
                          <span disabled style={{ pointerEvents: "none" }}>
                            13 days ago
                          </span>
                        </a>
                      </OverlayTrigger>
                      <img src={newicon} alt="" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Activity;
