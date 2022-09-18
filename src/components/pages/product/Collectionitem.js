import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import gallerylist from "../../images/gallerylist.png";
import ethereumpurple from "../../images/ethereumpurple.png";
import Activity from "./Activity";
const Collectionitem = () => {
  return (
    <div>
     <Activity/>
      <div className="collectionitem">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <div className="summary">
                <span>
                  <img src={gallerylist} />
                </span>
                More From This Collection
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="accordian-details">
                <div className="flex">
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/d960c3378ad65afabb50866aad64b71a.png?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Page 72</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>2</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/10db14cefeaac70fa7866e811469961a.jpg?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Page 454</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>4.44</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/536c6370de1a79990e34013e60d1c69b.jpg?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Anima 423</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>0.7</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/27e85c6b17aa7c18830c70f89ea10f5c.png?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Otherwhere 321</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>0.09</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/64bf2d9c51f7e89daadacf65cb1a7dfb.png?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Otherwhere 665</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>0.07</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/5fd69d24ce800f48b731aa3ee9feac67.png?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Otherwhere 436</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>0.0599</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/de3ab6245cb2059b38c48ee24eaf2907.png?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Otherwhere 633</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>0.072</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/082bb7ef08165d775becea9159debfdd.png?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Page 456</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>9.9</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/db81aaf961158373c9ec68b022876ec8.png?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Moods 113</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>0.3</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/10db14cefeaac70fa7866e811469961a.jpg?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Yugen 205</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>0.16</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="cart-collection">
                    <div className="cart-img">
                      <img src="https://img.seadn.io/files/10db14cefeaac70fa7866e811469961a.jpg?fit=max&w=270" />
                    </div>
                    <div className="page">
                      <p>Yugen 205</p>
                      <p>Price</p>
                      <div className="img">
                        <img src={ethereumpurple} />
                        <span>0.16</span>
                      </div>
                    </div>
                    <div className="buy-btn">
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collection-btn">
                <a href="#">View Collection</a>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Collectionitem;
