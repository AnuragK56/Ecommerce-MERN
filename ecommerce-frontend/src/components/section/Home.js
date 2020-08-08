import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";
import { Carousel } from "react-bootstrap";
export class Home extends Component {
  static contextType = DataContext;

  render() {
    const { products } = this.context;
    return (
      <div class="products container">
        <Carousel>
          <Carousel.Item>
            <img
              style={{ width: "100%", maxHeight: "500px" }}
              className="d-block w-100"
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ width: "100%", maxHeight: "500px" }}
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ width: "100%", maxHeight: "500px" }}
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
              alt="Third slide"
            />

            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
        <div className="row">
          <div className="col-lg-3" style={{ marginTop: "1%" }}>
            <div class="hero__categories">
              <div class="hero__categories__all">
                <i class="fa fa-bars"></i>
                <span>All departments</span>
              </div>
              <ul>
                <li>
                  <Link to="/disposable">Disposable</Link>
                </li>
                <li>
                  <Link to="/saloon">Saloon</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div class="section-title" style={{ paddingTop: "3%" }}>
              <h2>Featured Products</h2>
            </div>

            <div className="row">
              {products.map((product) => (
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
                        <i class="glyphicon glyphicon-shopping-cart"></i> Add to
                        Cart
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

export default Home;
