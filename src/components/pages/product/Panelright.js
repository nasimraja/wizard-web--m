import React, { Component } from "react";
import $ from "jquery";
import properties from "../../images/properties.png";
import gallerylist from "../../images/gallerylist.png";
import detail from "../../images/detail.png";
import Table from "react-bootstrap/Table";
import ethereumpurple from "../../images/ethereumpurple.png";
import Form from "react-bootstrap/Form";
import Graph from "./Graph";
class Panelright extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    // faq open js

    $(document).ready(function () {
      $(".block__title").click(function (event) {
        if ($(".block").hasClass("one")) {
          $(".block__title").not($(this)).removeClass("active");
          $(".block__text").not($(this).next()).slideUp(300);
        } else {
          $(this).toggleClass("active").next().slideToggle(300);
        }
      });
    });

    // closed faq js
  };
  render() {
    return (
      <div>
        <section id="panel">
          <div class="wrapper">
            <div class="block one">
              <div class="block__item-pb">
                <div class="block__title">
                  <span>
                    <img src={properties} />
                  </span>
                  Price History
                </div>
                <div class="block__text">
                  <div className="price-history">
                    <div className="select-input">
                      <Form.Select aria-label="Default select example">
                        <option>All time</option>
                        <option value="1">Last 7 days</option>
                        <option value="2">Last 14 days</option>
                        <option value="3">Last 30 days</option>
                        <option value="3">Last 60 days</option>
                        <option value="3">Last 90 days</option>
                        <option value="3">Last year</option>
                        {/* <option value="3">All time</option> */}

                      </Form.Select>
                    </div>
                    <div className="avg-price">
                      <p>All time avg. price</p>
                      <p className="price-p">
                        <b>Ξ</b>0.0436
                      </p>
                    </div>
                  </div>
                  <Graph/>
                </div>
              </div>
              <div class="block__item-pb">
                <div class="block__title">
                  <span>
                    <img src={gallerylist} />
                  </span>
                  Listings
                </div>
                <div class="block__text">
                  <div className="panelright-table">
                    <Table responsive="sm">
                      <thead>
                        <tr>
                          <th>Pricet</th>
                          <th>USD Price</th>
                          <th>Expiration</th>
                          <th>From</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tr-border">
                          <td className="ether">
                            <img src={ethereumpurple} alt="" />
                            <span>
                              <b>0.13</b>ETH
                            </span>
                          </td>
                          <td>$237.40</td>
                          <td>27 days</td>
                          <td>
                            <a href="#">RahGold</a>
                          </td>
                          <td className="buy-link">
                            <a href="#">Buy</a>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div class="block__item-pb">
                <div class="block__title">
                  <span>
                    <img src={detail} />
                  </span>
                  Offers
                </div>
                <div class="block__text">
                  <div className="panelright-table">
                    <Table responsive="sm">
                      <thead>
                        <tr>
                          <th>Pricet</th>
                          <th>USD Price</th>
                          <th>Floor Difference</th>
                          <th>Expiration</th>
                          <th>From</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tr-border">
                          <td className="ether">
                            <img src={ethereumpurple} alt="" />
                            <span>
                              <b>0.0275</b>WETH
                            </span>
                          </td>
                          <td>$50.18</td>
                          <td>45% below</td>
                          <td>14 minutes</td>
                          <td>
                            <a href="#">DD3438</a>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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

export default Panelright;
