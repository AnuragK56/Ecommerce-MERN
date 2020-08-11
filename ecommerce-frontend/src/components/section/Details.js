import React, { Component } from "react";
import { DataContext } from "../Context";
export class Details extends Component {
  static contextType = DataContext;
  state = {
    product: [],
  };
  getProduct = () => {
    if (this.props.match.params.id) {
      const res = this.context.products;
      const data = res.filter((item) => {
        return item._id === this.props.match.params.id;
      });
      this.setState({ product: data });
    }
  };
  componentDidMount() {
    this.getProduct();
  }
  render() {
    const { product } = this.state;
    let newText = product.map((item) =>
      item.description.split("\n").map((i) => {
        return <p>{i}</p>;
      })
    );

    return product.map((item) => (
      // <div className="Details" key="{item._id}">
      //   <img src={`http://localhost:5000/${item.image}`} alt=""></img>
      //   <div classname="box">
      //     <div className="row">
      //       <h2>{item.title}</h2>
      //       <span>${item.price}</span>
      //     </div>
      //     <p>{item.description}</p>
      //     <button onClick={() => this.context.addcart(item._id)}>
      //       ADD TO CART
      //     </button>
      //   </div>
      // </div>
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img
                    className="product__details__pic__item--large"
                    src={`http://localhost:5000/${item.image}`}
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{item.title}</h3>
                <h5>{item.minidescription}</h5>
                <div className="product__details__price">₹{item.price}</div>
                {newText}
                <div className="product__details__quantity">
                  <div className="quantity">
                    <div className="pro-qty">
                      <input type="text" value="1"></input>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => this.context.addcart(item._id)}
                  className="primary-btn"
                >
                  ADD TO CART
                </button>
                <ul>
                  <li>
                    <b>Availability</b> <span>In Stock</span>
                  </li>
                  <li>
                    <b>Shipping</b> <span>Free shipping</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    ));
  }
}

export default Details;
