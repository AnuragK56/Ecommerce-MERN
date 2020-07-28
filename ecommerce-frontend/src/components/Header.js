import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./Context";
export class Header extends Component {
  static contextType = DataContext;
  render() {
    const { cart, total } = this.context;
    return (
      <>
        <div class="humberger__menu__overlay"></div>
        <div class="humberger__menu__wrapper">
          <div class="humberger__menu__logo">
            <a href="#">
              <img src="img/logo.png" alt=""></img>
            </a>
          </div>
          <div class="humberger__menu__cart">
            <ul>
              <li>
                <a href="#">
                  <i class="fa fa-heart"></i> <span>1</span>
                </a>
              </li>
              <li>
                <Link to="/">
                  <i class="fa fa-shopping-bag"></i> <span>{cart.length}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div class="humberger__menu__widget">
            <div class="header__top__right__auth">
              <a href="#">
                <i class="fa fa-user"></i> Login
              </a>
            </div>
          </div>
          <nav class="humberger__menu__nav mobile-menu">
            <ul>
              <li class="active">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/product">Disposable</Link>
              </li>

              <li>
                <Link to="/">Saloon Products</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
            </ul>
          </nav>
          <div id="mobile-menu-wrap"></div>
          <div class="humberger__menu__contact">
            <ul>
              <li>
                <i class="fa fa-envelope"></i> connect@thesalonshop.in
              </li>
              <i class="fa fa-phone"></i>+91 9009005224
            </ul>
          </div>
        </div>

        <header class="header">
          <div class="header__top">
            <div class="container">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="header__top__left">
                    <ul>
                      <li>
                        <i class="fa fa-envelope"></i>connect@thesalonshop.in
                      </li>
                      <i class="fa fa-phone"></i>+91 9009005224
                    </ul>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="header__top__right">
                    <div class="header__top__right__auth">
                      <a href="#">
                        <i class="fa fa-user"></i> Login
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-3">
                <div class="header__logo">
                  <a href="./index.html">
                    <img src="img/logo.png" alt=""></img>
                  </a>
                </div>
              </div>
              <div class="col-lg-6">
                <nav class="header__menu">
                  <ul>
                    <li class="active">
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/product">Disposable</Link>
                    </li>

                    <li>
                      <Link to="/">Saloon Products</Link>
                    </li>
                    <li>
                      <Link to="/">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="col-lg-3">
                <div class="header__cart">
                  <ul>
                    <li>
                      <Link to="/cart">
                        <i class="fa fa-shopping-bag"></i>{" "}
                        <span>{cart.length}</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="humberger__open">
              <i class="fa fa-bars"></i>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
