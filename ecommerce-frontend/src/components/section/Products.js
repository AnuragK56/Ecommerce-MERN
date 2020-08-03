import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";

export class Products extends Component {
  static contextType = DataContext;

  render() {
    const { products } = this.context;
    return (
      <div class="products">
        {products.map((product) => (
          <div class="col-lg-3 col-md-4 col-sm-6" key={product._id}>
            <div class="feature" >
              <Link to={`/product/${product._id}`}>
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt=""
                ></img>
              </Link>
              <button onClick={() => this.context.addcart(product._id)}>
                ADD TO CART
              </button>
              <div class="featured__item__text">
                <h6>{product.title}</h6>
                <h5>₹{product.price}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Products;
