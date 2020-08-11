import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ProductDetails from "./DashboardSection/ProductDetails";
export class adminpanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: "",
      accesstoken: "",
      products: [],
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
      fetch("http://localhost:5000/getproducts", {})
        .then((response) => response.json())
        .then((data) => this.setState({ products: data.products }));
      // console.log("Fetching data ");
    }
  }
  deleteitem(item) {
    let url = "http://localhost:5000/deleteproduct/" + item._id;
    let at = "Bearer " + this.state.accesstoken;
    // console.log(url);
    // console.log(at);
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
      // .then((data) => console.log(data));
    window.location.reload(false);
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
          <div className="container">
            <div className="row">
              <div className="col-lg-1">
                <Menu pointing vertical>
                  <Menu.Item as={Link} to="/adminpanel" active>
                    Products
                  </Menu.Item>
                  <Menu.Item as={Link} to="/addproduct">
                    Add new product
                  </Menu.Item>
                  <Menu.Item as={Link} to="/showcreatedorders">
                    Show Created Orders
                  </Menu.Item>
                  <Menu.Item as={Link} to="/showshippedorders">
                    Show Shipped Orders
                  </Menu.Item>
                </Menu>
              </div>
              <div
                className="shoping__cart__table col-lg-6"
                style={{ margin: "0 auto" }}
              >
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__product">Products</th>
                      <th>Title &nbsp;</th>
                      <th>Price&nbsp;&nbsp;&nbsp;</th>

                      <th>Stock&nbsp;&nbsp;&nbsp;</th>
                      <th>Category&nbsp;&nbsp;&nbsp;</th>
                      <th>Sub-Category&nbsp;&nbsp;&nbsp;</th>
                      <th>Delete&nbsp;</th>
                      <th>Update&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((item, index) => (
                      <tr>
                        <td className="shoping__cart__item" key="{item._id}">
                          <img
                            src={`http://localhost:5000/${item.image}`}
                            alt=""
                            width="50"
                            height="50"
                          ></img>
                        </td>
                        <td className="shoping__cart__price">{item.title}</td>

                        <td className="shoping__cart__price">₹{item.price}</td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div>
                              <span name="stock" type="text">
                                {item.stock}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="shoping__cart__total">{item.category}</td>
                        <td className="shoping__cart__total">{item.subcategory}</td>
                        <td className="shoping__cart__item__close">
                          <button
                            onClick={() => this.deleteitem(item)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <ProductDetails product={item} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default adminpanel;
