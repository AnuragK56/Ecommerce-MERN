import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";

export class Saloon extends Component {
  static contextType = DataContext;

  render() {
    const { products } = this.context;
    return (
      <div class="products container">
        <div className="banner">
          <p className="banner-text">Salon Products</p>
        </div>
        <div className="row">
          <div className="col-3" style={{ marginTop: "1%" }}>
            <div class="hero__categories">
              <div class="hero__categories__all">
                <i class="fa fa-bars"></i>
                <span>Sub-Categories</span>
              </div>
              <ul>
                <li>
                  <a href="#">Fresh Meat</a>
                </li>
                <li>
                  <a href="#">Vegetables</a>
                </li>
                <li>
                  <a href="#">Fruit & Nut Gifts</a>
                </li>
                <li>
                  <a href="#">Fresh Berries</a>
                </li>
                <li>
                  <a href="#">Ocean Foods</a>
                </li>
                <li>
                  <a href="#">Butter & Eggs</a>
                </li>
                <li>
                  <a href="#">Fastfood</a>
                </li>
                <li>
                  <a href="#">Fresh Onion</a>
                </li>
                <li>
                  <a href="#">Papayaya & Crisps</a>
                </li>
                <li>
                  <a href="#">Oatmeal</a>
                </li>
                <li>
                  <a href="#">Fresh Bananas</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {products
                .filter((item) => item.category.includes("Saloon"))
                .map((product) => (
                  <div
                    className="col-12 col-sm-8 col-md-6 col-lg-4"
                    style={{ padding: "2%" }}
                  >
                    <div
                      class="card h-100 property-card "
                      style={{ margin: "2%", padding: "4%" }}
                      key={product._id}
                    >
                      <div
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        <Link to={`/disposable/${product._id}`}>
                          <img
                            src={`http://localhost:5000/${product.image}`}
                            alt=""
                            class="card-img-top"
                            style={{
                              width: " 270px",
                              height: "270px",
                              objectFit: "cover",
                            }}
                          ></img>
                        </Link>
                      </div>
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
                          <i class="glyphicon glyphicon-shopping-cart"></i> Add
                          to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Saloon;
