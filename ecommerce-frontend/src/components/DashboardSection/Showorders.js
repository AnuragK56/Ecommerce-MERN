import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header, activeItem, Icon, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import OrderDetails from "./OrderDetails";
export class Showorders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: "",
      accesstoken: "",
      orders: [],
      selecteditem: "",
      activeItem: "/",
    };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  componentWillMount() {
    let logindetails = JSON.parse(localStorage.getItem("login"));
    if (logindetails != null) {
      this.setState({
        loggedIn: logindetails.login,
        accesstoken: logindetails.token,
      });
    }
  }
  componentDidMount() {
    if (this.state.loggedIn) {
      fetch("http://localhost:5000/showorders", {})
        .then((response) => response.json())
        .then((data) => this.setState({ orders: data }));
      console.log("Fetching data ");
    }
  }
  deleteitem(item) {
    let url = "http://localhost:5000/deleteproduct/" + item._id;
    let at = "Bearer " + this.state.accesstoken;
    console.log(url);
    console.log(at);
    fetch(
      url,
      // { signal: this.abortcontroller.signal },
      {
        method: "DELETE",
        headers: {
          Authorization: at,
        },
      }
    )
      .then((t) => t.json())
      .then((data) => console.log(data));
    window.location.reload(false);
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <Link to="/login" class="primary-btn">
          Go to login
        </Link>
      );
    } else {
      const { orders } = this.state;
      return (
        <>
          {/* <div class="container"> */}
          <div className="row">
            <div class="col-lg-1">
              <Menu pointing vertical>
                <Menu.Item as={Link} to="/adminpanel">
                  Products
                </Menu.Item>
                <Menu.Item as={Link} to="/addnewporduct">
                  Add new product
                </Menu.Item>
                <Menu.Item as={Link} to="/showorders" active>
                  Show Orders
                </Menu.Item>
                <Menu.Item as={Link} to="/manageorders">
                  Manage Order
                </Menu.Item>
              </Menu>
            </div>
            <div
              class="shoping__cart__table col-lg-9"
              style={{ margin: "0 auto" }}
            >
              <table>
                <thead>
                  <tr>
                    <th>OrderId</th>
                    <th>Order Total</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Payment Method</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.orders.map((item, index) => (
                    <tr>
                      <td key="{item._id}">
                        <h5>{item.orderid}</h5>
                      </td>
                      <td class="shoping__cart__price">₹{item.total}</td>
                      <td class="shoping__cart__quantity">
                        <div class="quantity">
                          <div>
                            <span name="stock" type="text">
                              {item.customer.address}
                              {item.customer.city}, ,{item.customer.pincode}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td class="shoping__cart__total">{item.orderstatus}</td>
                      <td>
                        {typeof item.razorpay.paymentstatus !== undefined && (
                          <h5>{item.paymentmethod}</h5>
                        )}
                        {typeof item.razorpay.paymentstatus === undefined && (
                          <h5>
                            {item.paymentmethod}({item.razorpay.paymentstatus})
                          </h5>
                        )}
                      </td>
                      <td>
                        <h5>{item.customer.phonenumber}</h5>
                      </td>
                      <td class="shoping__cart__item__close">
                        {/* <button
                          onClick={() => this.openmodal(item)}
                          class="btn btn-primary"
                        >
                          Show whole order
                        </button> */}
                        <OrderDetails order={item} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* </div> */}
        </>
      );
    }
  }
}

export default Showorders;
