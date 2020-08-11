import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Displayorder from "./Displayorder";
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
      let at = "Bearer " + this.state.accesstoken;
      fetch("http://localhost:5000/showorders", {
        headers: {
          Authorization: at,
        },
      })
        .then((response) => response.json())
        .then((data) => this.setState({ orders: data }));
      // console.log("Fetching data ");
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <Link to="/login" className="primary-btn">
          Go to login
        </Link>
      );
    } else {
      return (
        <>
          <div className="row">
            <div className="col-lg-1">
              <Menu pointing vertical>
                <Menu.Item as={Link} to="/adminpanel">
                  Products
                </Menu.Item>
                <Menu.Item as={Link} to="/addproduct">
                  Add new product
                </Menu.Item>
                <Menu.Item as={Link} to="/showcreatedorders" active>
                  Show Created Orders
                </Menu.Item>
                <Menu.Item as={Link} to="/showshippedorders">
                  Show Shipped Orders
                </Menu.Item>
              </Menu>
            </div>
            <Displayorder
              orders={this.state.orders.filter(
                (order) => order.orderstatus !== "Shipped"
              )}
            />
          </div>
        </>
      );
    }
  }
}

export default Showorders;
