import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";

export class Saloon extends Component {
  static contextType = DataContext;

  render() {
    const { products } = this.context;
    return (
      <div class="products container">
        <div className="row">
          {products
            .filter((item) => item.category.includes("Saloon"))
            .map((product) => (
              <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <div
                  class="card "
                  style={{ width: "18rem", margin: "2%" }}
                  key={product._id}
                >
                  <Link to={`/disposable/${product._id}`}>
                    <img
                      src={`http://localhost:5000/${product.image}`}
                      alt=""
                      class="card-img-top"
                    ></img>
                  </Link>
                  <h4 class="card-title">{product.title}</h4>
                  <div
                    class="buy d-flex justify-content-between align-items-center"
                    style={{ padding: "3%" }}
                  >
                    <div class="price">
                      <h5 class="mt-4 text-success">₹{product.price} </h5>
                    </div>
                    <button
                      onClick={() => this.context.addcart(product._id)}
                      class="btn btn-success mt-3"
                    >
                      <i class="glyphicon glyphicon-shopping-cart"></i> Add to
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Saloon;
