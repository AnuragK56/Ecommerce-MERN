import React, { Component } from "react";
import Salon from "./section/Salon";
import Disposable from "./section/Disposable";
import Details from "./section/Details";
import Cart from "./section/Cart";
import { Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Home from "./section/Home";
import Adminpanel from "./Adminpanel";
import Showcreatedorders from "./DashboardSection/Showcreatedorders";
import Showshippedorders from "./DashboardSection/Showshippedorders";

import Addproduct from "./DashboardSection/Addproduct";

export class Section extends Component {
  render() {
    return (
      <section style={{ minHeight: "600px", marginTop: "2%" }}>
        <Route path="/" component={Home} exact />
        <Route path="/disposable" component={Disposable} exact />
        <Route path="/disposable/:id" component={Details} />
        <Route path="/salon" component={Salon} exact />
        <Route path="/salon/:id" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/adminpanel" component={Adminpanel} />
        <Route path="/showcreatedorders" component={Showcreatedorders} />
        <Route path="/showshippedorders" component={Showshippedorders} />
        <Route path="/addproduct" component={Addproduct} />
      </section>
    );
  }
}

export default Section;
