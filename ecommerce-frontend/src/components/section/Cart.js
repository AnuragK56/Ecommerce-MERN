import React, { Component } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";

export class Cart extends Component {
  static contextType = DataContext;
  componentDidMount() {
    this.context.getTotal();
  }
  render() {
    const { cart, increase, reduction, removeitem, total } = this.context;
    if (cart.length === 0) {
      return (
        <>
          <div className="container">
            <div className="banner">
              <p className="banner-text">Shopping Cart</p>
            </div>
          </div>
          <div
            style={{
              margin: "auto",
              width: "50%",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <h2>Cart is empty</h2>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="container">
            <div className="banner">
              <p className="banner-text">Shopping Cart</p>
            </div>
          </div>
          <section className="shoping-cart spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-7">
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
                          <tr>
                            <td
                              className="shoping__cart__item"
                              key="{item._id}"
                            >
                              <img
                                src={`http://localhost:5000/${item.image}`}
                                alt=""
                                width="50"
                                height="50"
                              ></img>
                              <p>{item.title}</p>
                            </td>
                            <td className="shoping__cart__price">
                              ₹{item.price}
                            </td>
                            <td className="shoping__cart__quantity">
                              <div className="quantity">
                                <div>
                                  <span
                                    className="count"
                                    onClick={() => reduction(item._id)}
                                    className="btn btn-success"
                                  >
                                    -
                                  </span>
                                  {/* <input value={item.count}></input> */}
                                  <span style={{ padding: "15px" }}>
                                    {item.count}
                                  </span>
                                  <span
                                    className="count"
                                    onClick={() => increase(item._id)}
                                    className="btn btn-success"
                                  >
                                    +
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="shoping__cart__total">
                              ₹{item.price * item.count}
                            </td>
                            <td className="shoping__cart__item__close">
                              <span
                                onClick={() => removeitem(item._id)}
                                className="icon_close"
                              ></span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="shoping__checkout">
                    <h5>Cart Total</h5>
                    <ul>
                      <li>
                        Total <span>₹{total}</span>
                      </li>
                    </ul>
                    <Link to="/checkout" className="primary-btn">
                      PROCEED TO CHECKOUT
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div style={{ margin: "auto", paddingTop: "20px" }}>
                  <Link to="/" className="primary-btn">
                    Continue Shopping
                  </Link>
                </div>
                {/* <div className="col-lg-6"> 
                   <div className="shoping__continue"> 
                   ------------------- For Discount Coupon Code---------------- 
                     <div className="shoping__discount">
                      <h5>Discount Codes</h5>
                      <form action="#">
                        <input
                          type="text"
                          placeholder="Enter your coupon code"
                        ></input>
                        <button type="submit" className="site-btn">
                          APPLY COUPON
                        </button>
                      </form>
                    </div> 
                   </div> 
                 </div> */}
              </div>
            </div>
          </section>
        </>
      );
    }
  }
}

export default Cart;
