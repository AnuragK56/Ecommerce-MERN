import React, { Component } from "react";
import { TextArea, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
export class Addproduct extends Component {
  state = {
    title: "",
    description: "",
    minidescription: "",
    category: "Select",
    loggedIn: "",
    accesstoken: "",
    subcategory: "",
    price: 0,
    stock: 0,
    titleError: "",
    descriptionError: "",
    minidescriptionError: "",
    categoryError: "",
    subcategoryError: "",
    stockError: "",
    priceError: "",
    selectedFile: null,
  };

  componentWillMount() {
    let logindetails = JSON.parse(localStorage.getItem("login"));
    if (logindetails != null) {
      this.setState({
        loggedIn: logindetails.login,
        accesstoken: logindetails.token,
      });
    }
  }
  handleChange = (event) => {
    if (event.target.name === "category") console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  validate = () => {
    let titleError = "";
    let descriptionError = "";
    let minidescriptionError = "";
    let categoryError = "";
    let subcategoryError = "";
    let stockError = "";
    let priceError = "";

    if (!this.state.title) {
      titleError = "Please Fill the required field";
    }
    if (!this.state.description) {
      descriptionError = "Please Fill the required field";
    }
    if (!this.state.minidescription) {
      minidescriptionError = "Please Fill the required field";
    }
    if (!this.state.category) {
      categoryError = "Please Fill the required field";
    }
    if (!this.state.subcategory) {
      subcategoryError = "Please Fill the required field";
    }
    if (!this.state.stock.length) {
      stockError = "Please Fill the required field";
    }

    if (!this.state.price.length) {
      priceError = "Please Fill the required field";
    }

    if (
      stockError ||
      priceError ||
      subcategoryError ||
      titleError ||
      descriptionError ||
      minidescriptionError ||
      categoryError
    ) {
      this.setState({
        stockError,
        priceError,
        subcategoryError,
        titleError,
        minidescriptionError,
        descriptionError,
        categoryError,
      });
      return false;
    }

    return true;
  };
  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
    });
  };
  submitdata = () => {
    const data = new FormData();
    console.log(this.state.selectedFile);
    data.append("image", this.state.selectedFile);
    //   for (var x = 0; x < this.state.selectedFile.length; x++) {
    //     data.append("file", this.state.selectedFile[x]);
    //   }
    data.append("title", this.state.title);
    data.append("category", this.state.category);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
    data.append("subcategory", this.state.subcategory);
    data.append("minidescription", this.state.minidescription);
    data.append("description", this.state.description);
    let at = "Bearer " + this.state.accesstoken;
    axios
      .post("http://localhost:5000/addproduct", data, {
        headers: {
          Authorization: at,
        },
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState({
        titleError: "",
        descriptionError: "",
        minidescriptionError: "",
        categoryError: "",
        subcategoryError: "",
        stockError: "",
        priceError: "",
      });
      this.submitdata();
      this.props.history.push("/adminpanel");
    }
  };
  render() {
    if (!this.state.loggedIn) {
      return (
        <Link to="/login" className="primary-btn">
          Go to login
        </Link>
      );
    } else {
      return (
        <>
          {/* <section className="checkout spad"> */}
          <div className="container ">
            <div className="row">
              <div className="col-lg-1">
                <Menu pointing vertical>
                  <Menu.Item as={Link} to="/adminpanel">
                    Products
                  </Menu.Item>
                  <Menu.Item as={Link} to="/addproduct" active>
                    Add new product
                  </Menu.Item>
                  <Menu.Item as={Link} to="/showcreatedorders">
                    Show Created Orders
                  </Menu.Item>
                  <Menu.Item as={Link} to="/showshippedorders">
                    Show Shipped Orders
                  </Menu.Item>
                </Menu>
              </div>
              <div className="checkout__form col-lg-offset-2">
                <h4>Billing Details</h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="row justify-content-end">
                    <div className="col-lg-8 col-md-6">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Title of Product<span>*</span>
                          </p>
                          <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                          ></input>
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.titleError}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Description<span>*</span>
                          </p>
                          <TextArea
                            placeholder="Describe the product"
                            value={this.state.description}
                            style={{ minHeight: 150, width: 400 }}
                            name="description"
                            onChange={this.handleChange}
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.descriptionError}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Mini Description<span>*</span>
                          </p>
                          <TextArea
                            placeholder="Short Describption the product"
                            value={this.state.minidescription}
                            name="minidescription"
                            onChange={this.handleChange}
                          />
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.minidescriptionError}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="checkout__input">
                          <p>
                            Category<span>*</span>
                          </p>
                          <select
                            id="lang"
                            name="category"
                            onChange={this.handleChange}
                            value={this.state.category}
                          >
                            <option value="Select">Select</option>
                            <option value="Disposable">Disposable</option>
                            <option value="Salon">Salon</option>
                          </select>
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.categoryError}
                          </div>
                        </div>
                        <div className="checkout__input">
                          <p>
                            Subcategory<span>*</span>
                          </p>
                          <input
                            type="text"
                            name="subcategory"
                            value={this.state.subcategory}
                            onChange={this.handleChange}
                          ></input>
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.subcategoryError}
                          </div>
                        </div>
                      </div>
                      <div className="checkout__input">
                        <p>
                          Price<span>*</span>
                        </p>
                        <input
                          type="number"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}
                        ></input>
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.priceError}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Stock<span>*</span>
                            </p>
                            <input
                              type="number"
                              name="stock"
                              value={this.state.stock}
                              onChange={this.handleChange}
                            ></input>
                            <div style={{ fontSize: 12, color: "red" }}>
                              {this.state.stockError}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Upload Product Image<span>*</span>
                            </p>
                            <input
                              type="file"
                              name="file"
                              // multiple
                              onChange={this.onChangeHandler}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="site-btn"
                          onSubmit={this.handleSubmit}
                        >
                          Add a new product
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* </section> */}
        </>
      );
    }
  }
}

export default withRouter(Addproduct);
