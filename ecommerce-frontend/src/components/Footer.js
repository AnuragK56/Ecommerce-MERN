import React, { Component } from "react";
export class Footer extends Component {
  render() {
    return (
      <footer className="footer spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer__about">
                <div className="footer__about__logo">
                  <a href="./index.html">
                    <img src="img/The Salon Shop.jpeg" alt=""></img>
                  </a>
                </div>
                <ul>
                  <li>
                    Address: Mumbai,India
                  </li>
                  <li>Phone: +91 91111111111</li>
                  <li>Email: connect@support.in</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
              <div className="footer__widget"></div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="footer__widget">
                <h6>Join Our Newsletter Now</h6>
                <p>
                  Get E-mail updates about our latest shop and special offers.
                </p>
                <form action="#">
                  <input type="text" placeholder="Enter your mail"></input>
                  <button type="submit" className="site-btn">
                    Subscribe
                  </button>
                </form>
                <div className="footer__widget__social">
                  <a href="/">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="footer__copyright">
                <div className="footer__copyright__text">
                  <p>
                    {" "}
                    {/* Link back to Colorlib can't be removed. Template is licensed
                    under CC BY 3.0.  */}
                    Copyright &copy; All rights reserved | This
                    template is made with{" "}
                    <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                    <a href="https://colorlib.com" >
                      Colorlib
                    </a>
                    {/* Link back to Colorlib can't be removed. Template is licensed
                    under CC BY 3.0.{" "} */}
                  </p>
                </div>
                <div className="footer__copyright__payment">
                  <img src="img/payment-item.png" alt=""></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
