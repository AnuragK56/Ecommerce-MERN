import React, { Component } from "react";
import Saloon from "./section/Saloon";
import Disposable from "./section/Disposable";

import Details from "./section/Details";
import Cart from "./section/Cart";
import { Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Adminpanel from "./Adminpanel";
import Showorders from "./DashboardSection/Showorders";
import Addproduct from "./DashboardSection/Addproduct";

export class Section extends Component {
  render() {
    return (
      <section>
        <Route path="/disposable" component={Disposable} exact />
        <Route path="/disposable/:id" component={Details} />
        <Route path="/saloon" component={Saloon} exact />
        <Route path="/saloon/:id" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/adminpanel" component={Adminpanel} />
        <Route path="/showorders" component={Showorders} />
        <Route path="/addproduct" component={Addproduct} />
      </section>
    );
  }
}

export default Section;
