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
            <p className="banner-text">Order placed Successfully</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6" style={{ margin: "0 auto" }}>
          <p
            style={{
              display: "inline-block",
            }}
          >
            <b> Thank you {values.firstname},</b>
            <br></br>&nbsp;Your order ID is :{values.orderId}
            <br></br>Total:&nbsp;{total}
          </p>
          <div className="shoping__cart__table">
            <table>
              <thead>
                <tr>
                  <th className="shoping__product">Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key="{item._id}">
                    <td className="shoping__cart__item">
                      <img
                        src={`http://localhost:5000/${item.image}`}
                        alt=""
                        width="50"
                        height="50"
                      ></img>
                      <h5>{item.title}</h5>
                    </td>
                    <td className="shoping__cart__price">₹{item.price}</td>
                    <td className="shoping__cart__quantity">
                      <div className="quantity">
                        <div>
                          {/* <input value={item.count}></input> */}
                          <span style={{ padding: "15px" }}>{item.count}</span>
                        </div>
                      </div>
                    </td>
                    <td className="shoping__cart__total">
                      ₹{item.price * item.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <div className="banner">
            <p className="banner-text">
              {" "}
              Total &nbsp; &nbsp;<span>₹{total}</span>
            </p>
          </div> */}
        </div>
      </>
    );
  }
}

export default Orderplaced;
