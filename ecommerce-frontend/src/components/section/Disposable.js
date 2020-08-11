import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";
import { InputGroup, FormControl } from "react-bootstrap";

export class Disposable extends Component {
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
    const { products, disposablesubcategory } = this.context;
    return (
      <div className="products container">
        <div className="banner">
          <p className="banner-text">Disposable Product</p>
        </div>
        <div className="row">
          <div className="col-lg-3" style={{ marginTop: "1%" }}>
            <div className="hero__categories">
              <div className="hero__categories__all">
                <i className="fa fa-bars"></i>
                <span>Sub-Categories</span>
              </div>
              <ul>
                <li>
                  <Link
                    onClick={() => {
                      this.subcategorySearch("");
                    }}
                  >
                    Show All
                  </Link>
                </li>
                {disposablesubcategory.map((data) => (
                  <li>
                    <Link
                      onClick={() => {
                        this.subcategorySearch({ data });
                      }}
                    >
                      {data}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="section-title" style={{ paddingTop: "3%" }}>
                    <h2>Disposable Products</h2>
                  </div>
                </div>
                <div className="col-lg-6">
                  <InputGroup className="mb-3" style={{ paddingTop: "3%" }}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <i className="fa fa-search"></i>
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
                .filter((item) => item.category.includes("Disposable"))
                .filter((data) => {
                  if (this.state.searchvalue == null) return data;
                  else if (
                    data.title
                      .toLowerCase()
                      .includes(this.state.searchvalue.toLowerCase()) ||
                    data.subcategory
                      .toLowerCase()
                      .includes(this.state.searchvalue.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((product) => (
                  // <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                  //   <div
                  //     className="card "
                  //     style={{ width: "18rem", margin: "2%" }}
                  //     key={product._id}
                  //   >
                  <div
                    className=" col-sm-8 col-md-6 col-lg-4"
                    style={{ paddingTop: "2%", paddingBottom: "2%" }}
                    key={product._id}
                  >
                    <div
                      className="card h-100 property-card "
                      style={{ margin: "2%", padding: "4%" }}
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
                            className="card-img-top"
                            style={{
                              width: " 270px",
                              height: "270px",
                              objectFit: "cover",
                            }}
                          ></img>
                        </Link>
                      </div>
                      <h3 className="card-title">{product.title}</h3>
                      <p className="card-title">{product.minidescription}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="price">
                          <h5 className="mt-4 text-success">₹{product.price} </h5>
                        </div>
                        <button
                          onClick={() => this.context.addcart(product._id)}
                          className="btn btn-success mt-3"
                        >
                          <i className="glyphicon glyphicon-shopping-cart"></i> Add
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

export default Disposable;
