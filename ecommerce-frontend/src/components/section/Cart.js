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
      return <h2>Cart is empty</h2>;
    } else {
      return (
        <>
          <section class="shoping-cart spad">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="shoping__cart__table"></div>
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
                          <div className="Details" key="{item._id}">
                            <td class="shoping__cart__item">
                              <img src="{item.src}" alt=""></img>
                              <h5>{item.title}</h5>
                            </td>
                            <td class="shoping__cart__price">${item.price}</td>
                            <td class="shoping__cart__quantity">
                              <div class="quantity">
                                <div class="pro-qty">
                                  <button
                                    className="count"
                                    onClick={() => reduction(item._id)}
                                  >
                                    -
                                  </button>
                                  <span>{item.count}</span>
                                </div>
                                <button
                                  className="count"
                                  onClick={() => increase(item._id)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td class="shoping__cart__total">
                              ${item.price * item.count}
                            </td>
                            <td class="shoping__cart__item__close">
                              <button
                                className="count"
                                onClick={() => removeitem(item._id)}
                              >
                                X
                              </button>
                            </td>
                          </div>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="shoping__cart__btns">
                  <a href="/" class="primary-btn cart-btn">
                    CONTINUE SHOPPING
                  </a>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="col-lg-6">
                  <div class="shoping__checkout">
                    <h5>Cart Total</h5>
                    <ul>
                      <li>
                        Total <span>${total}</span>
                      </li>
                    </ul>
                    <Link to="/payment">
                      <button class="primary-btn">PROCEED TO CHECKOUT</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  }
}

export default Cart;
