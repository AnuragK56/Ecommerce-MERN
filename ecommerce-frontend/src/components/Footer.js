import React, { Component } from "react";
export class Footer extends Component {
  render() {
    return (
      <footer class="footer spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="footer__about">
                <div class="footer__about__logo">
                  <a href="./index.html">
                    <img src="img/The Salon Shop.jpeg" alt=""></img>
                  </a>
                </div>
                <ul>
                  <li>
                    Address: S.PACE Coworking , Basant Vihar Clny, Behind Bombay
                    Hospital, Indore-452010
                  </li>
                  <li>Phone: +91 9009005224</li>
                  <li>Email: connect@thesalonshop.in</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
              <div class="footer__widget"></div>
            </div>
            <div class="col-lg-4 col-md-12">
              <div class="footer__widget">
                <h6>Join Our Newsletter Now</h6>
                <p>
                  Get E-mail updates about our latest shop and special offers.
                </p>
                <form action="#">
                  <input type="text" placeholder="Enter your mail"></input>
                  <button type="submit" class="site-btn">
                    Subscribe
                  </button>
                </form>
                <div class="footer__widget__social">
                  <a href="#">
                    <i class="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="footer__copyright">
                <div class="footer__copyright__text">
                  <p>
                    {" "}
                    {/* Link back to Colorlib can't be removed. Template is licensed
                    under CC BY 3.0.  */}
                    Copyright &copy; All rights reserved | This
                    template is made with{" "}
                    <i class="fa fa-heart" aria-hidden="true"></i> by{" "}
                    <a href="https://colorlib.com" target="_blank">
                      Colorlib
                    </a>
                    {/* Link back to Colorlib can't be removed. Template is licensed
                    under CC BY 3.0.{" "} */}
                  </p>
                </div>
                <div class="footer__copyright__payment">
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
