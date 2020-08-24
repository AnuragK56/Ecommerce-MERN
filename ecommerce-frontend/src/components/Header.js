import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./Context";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
export class Header extends Component {
  static contextType = DataContext;
  render() {
    const { cart } = this.context;
    return (
      <>
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li>
                      <i className="fa fa-envelope"></i>connect@help.in
                    </li>
                    <i className="fa fa-phone"></i>+91 9111111111
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <a href="https://www.facebook.com/thesalonshopindia">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </div>
                  <div className="header__top__right__language">
                    <img src="img/language.png" alt=""></img>
                    <div>English</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BrowserView>
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="header__logo">
                  <Link to="/">
                    <img src="img/logo.png" alt=""></img>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <nav className="header__menu">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/disposable">Disposable</Link>
                    </li>

                    <li>
                      <Link to="/salon">Salon Products</Link>
                    </li>
                    <li>
                      <Link to="/">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-3">
                <div className="header__cart">
                  <ul>
                    <li>
                      <Link to="/cart">
                        <i className="fa fa-shopping-bag"></i>{" "}
                        <span>{cart.length}</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="humberger__open">
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </BrowserView>
        <MobileView>
          <Navbar expand="lg">
            <div className="header__logo">
              <Link to="/">
                <img src="img/logo.png" alt=""></img>
              </Link>
            </div>
            <div className="header__cart" style={{ marginTop: "5%" }}>
              <ul>
                <li>
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag"></i>{" "}
                    <span>{cart.length}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto ">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/salon">Salon</Nav.Link>
                <Nav.Link href="/disposable">Disposable</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </MobileView>
      </>
    );
  }
}

export default Header;
