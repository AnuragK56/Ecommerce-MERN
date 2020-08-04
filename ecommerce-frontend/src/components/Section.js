import React, { Component } from "react";
import Products from "./section/Products";
import Details from "./section/Details";
import Cart from "./section/Cart";
import { Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Adminpanel from "./Adminpanel";
import Showorders from "./DashboardSection/Showorders";

export class Section extends Component {
  render() {
    return (
      <section>
        <Route path="/product" component={Products} exact />
        <Route path="/product/:id" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/adminpanel" component={Adminpanel} />
        <Route path="/showorders" component={Showorders} />
      </section>
    );
  }
}

export default Section;
