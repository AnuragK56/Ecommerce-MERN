import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";
import { Carousel, InputGroup, FormControl } from "react-bootstrap";
export class Home extends Component {
  static contextType = DataContext;
  state = {
    searchvalue: "",
  };
  subcategorySearch = (input) => {
    let tempvalue = input.data;
    this.setState({ searchvalue: tempvalue });
  };
  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ searchvalue: keyword });
  };
  render() {
    const { products, salonsubcategory, disposablesubcategory } = this.context;
    return (
      <div class="products container">
        <Carousel>
          <Carousel.Item>
            <img
              style={{ width: "100%", maxHeight: "500px" }}
              className="d-block w-100"
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ width: "100%", maxHeight: "500px" }}
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ width: "100%", maxHeight: "500px" }}
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
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
                  <Link to="/disposable">
                    <i class="fa fa-caret-right"></i> <b>Disposable</b>
                  </Link>
                  {disposablesubcategory.map((data) => (
                    <li>
                      <Link
                        onClick={() => {
                          this.subcategorySearch({ data });
                        }}
                      >
                        &nbsp;&nbsp;&nbsp; {data}
                      </Link>
                    </li>
                  ))}
                </li>
              </ul>

              <ul>
                <li>
                  <Link to="/salon">
                    <i class="fa fa-caret-right"></i> <b>Salon</b>
                  </Link>
                  {salonsubcategory.map((data) => (
                    <li>
                      <Link
                        onClick={() => {
                          this.subcategorySearch({ data });
                        }}
                      >
                        &nbsp;&nbsp;&nbsp; {data}
                      </Link>
                    </li>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div>
              <div className="row">
                <div className="col-lg-6">
                  <div class="section-title" style={{ paddingTop: "3%" }}>
                    <h2>Featured Products</h2>
                  </div>
                </div>
                <div className="col-lg-6">
                  <InputGroup className="mb-3" style={{ paddingTop: "3%" }}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <i class="fa fa-search"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Search"
                      type="text"
                      name="searchvalue"
                      value={this.state.searchvalue}
                      onChange={this.searchSpace}
                      aria-label="searchvalue"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
            </div>

            <div className="row">
              {products
                .filter((data) => {
                  if (this.state.searchvalue == null) return data;
                  else if (
                    data.title
                      .toLowerCase()
                      .includes(this.state.searchvalue.toLowerCase()) ||
                    data.subcategory
                      .toLowerCase()
                      .includes(this.state.searchvalue.toLowerCase()) ||
                    data.category
                      .toLowerCase()
                      .includes(this.state.searchvalue.toLowerCase())
                  ) {
                    return data;
                  }
                })
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
                      <p class="card-title">{product.minidescription}</p>
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

export default Home;
