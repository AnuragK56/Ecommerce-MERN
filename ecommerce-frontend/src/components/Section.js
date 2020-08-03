import React, { Component } from "react";
import Products from "./section/Products";
import Details from "./section/Details";
import Cart from "./section/Cart";
import { Route } from "react-router-dom";
import Checkout from "./Checkout";

export class Section extends Component {
  render() {
    return (
      <section>
        <Route path="/product" component={Products} exact />
        <Route path="/product/:id" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
      </section>
    );
  }
}

export default Section;
