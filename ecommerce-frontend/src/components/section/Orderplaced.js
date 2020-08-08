import React, { Component } from "react";
import { DataContext } from "../Context";

export class Orderplaced extends Component {
  static contextType = DataContext;
  componentWillUnmount() {
    this.context.emptycart();
  }
  render() {
    const { values } = this.props;
    const { cart, total } = this.context;
    return (
      <>
        <div className="container">
          <div className="banner">
            <p className="banner-text">Order ID:{values.orderId}</p>
          </div>
        </div>
        <div class="col-lg-6 col-md-6" style={{ margin: "0 auto" }}>
          <div class="shoping__cart__table">
            <h3
              style={{
                display: "inline-block",
                paddingTop: "30px",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              Thank you {values.firstname}.<span></span>Your order has been
              placed
            </h3>
            <table>
              <thead>
                <tr>
                  <th class="shoping__product">Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key="{item._id}">
                    <td class="shoping__cart__item">
                      <img
                        src={`http://localhost:5000/${item.image}`}
                        alt=""
                        width="50"
                        height="50"
                      ></img>
                      <h5>{item.title}</h5>
                    </td>
                    <td class="shoping__cart__price">₹{item.price}</td>
                    <td class="shoping__cart__quantity">
                      <div class="quantity">
                        <div>
                          {/* <input value={item.count}></input> */}
                          <span style={{ padding: "15px" }}>{item.count}</span>
                        </div>
                      </div>
                    </td>
                    <td class="shoping__cart__total">
                      ₹{item.price * item.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div class="shoping__checkout">
            <ul>
              <li>
                Total <span>₹{total}</span>
              </li>
            </ul>
          </div> */}
          <div className="banner">
            <p className="banner-text">
              {" "}
              Total &nbsp; &nbsp;<span>₹{total}</span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Orderplaced;
