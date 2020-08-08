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
            <div class="banner">
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
            <div class="banner">
              <p className="banner-text">Shopping Cart</p>
            </div>
          </div>
          <section class="shoping-cart spad">
            <div class="container">
              <div class="row">
                <div class="col-lg-7">
                  <div class="shoping__cart__table">
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
                          <tr>
                            <td class="shoping__cart__item" key="{item._id}">
                              <img
                                src={`http://localhost:5000/${item.image}`}
                                alt=""
                                width="50"
                                height="50"
                              ></img>
                              <p>{item.title}</p>
                            </td>
                            <td class="shoping__cart__price">₹{item.price}</td>
                            <td class="shoping__cart__quantity">
                              <div class="quantity">
                                <div>
                                  <span
                                    className="count"
                                    onClick={() => reduction(item._id)}
                                    class="btn btn-success"
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
                                    class="btn btn-success"
                                  >
                                    +
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td class="shoping__cart__total">
                              ₹{item.price * item.count}
                            </td>
                            <td class="shoping__cart__item__close">
                              <span
                                onClick={() => removeitem(item._id)}
                                class="icon_close"
                              ></span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="col-lg-4">
                  <div class="shoping__checkout">
                    <h5>Cart Total</h5>
                    <ul>
                      <li>
                        Total <span>₹{total}</span>
                      </li>
                    </ul>
                    <Link to="/checkout" class="primary-btn">
                      PROCEED TO CHECKOUT
                    </Link>
                  </div>
                </div>
              </div>
              <div class="row">
                <div style={{ margin: "auto", paddingTop: "20px" }}>
                  <Link to="/" class="primary-btn">
                    Continue Shopping
                  </Link>
                </div>
                {/* <div class="col-lg-6"> 
                   <div class="shoping__continue"> 
                   ------------------- For Discount Coupon Code---------------- 
                     <div class="shoping__discount">
                      <h5>Discount Codes</h5>
                      <form action="#">
                        <input
                          type="text"
                          placeholder="Enter your coupon code"
                        ></input>
                        <button type="submit" class="site-btn">
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
