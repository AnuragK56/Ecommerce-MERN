import React, { Component } from "react";
import { Link } from "react-router-dom";
export class CustomerDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    const isValid = this.props.validate();
    if (isValid) {
      this.setState({
        firstnameError: "",
        lastnameError: "",
        addressError: "",
        cityError: "",
        stateError: "",
        emailError: "",
        phonenumberError: "",
        pincodeError: "",
      });
      this.props.nextStep();
    }
  };
  render() {
    const { values, handleChange } = this.props;

    return (
      <>
        <div className="container">
          <div class="banner">
            <p className="banner-text">Shipping Details</p>
          </div>
        </div>
        <div class="col-lg-6 col-md-6" style={{ margin: "0 auto" }}>
          <div class="row">
            <div class="col-lg-6">
              <div class="checkout__input">
                <p>
                  Fist Name<span>*</span>
                </p>
                <input
                  type="text"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange("firstname")}
                ></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {values.firstnameError}
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="checkout__input">
                <p>
                  Last Name<span>*</span>
                </p>

                <input
                  type="text"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange("lastname")}
                ></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {values.lastnameError}
                </div>
              </div>
            </div>
          </div>
          <div class="checkout__input">
            <p>
              Address<span>*</span>
            </p>
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange("address")}
            ></input>
            <div style={{ fontSize: 12, color: "red" }}>
              {values.addressError}
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="checkout__input">
                <p>
                  Town/City<span>*</span>
                </p>
                <input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange("city")}
                ></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {values.cityError}
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="checkout__input">
                <p>
                  State<span>*</span>
                </p>
                <input
                  type="text"
                  name="state"
                  value={values.state}
                  onChange={handleChange("state")}
                ></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {values.stateError}
                </div>
              </div>
            </div>
          </div>
          <div class="checkout__input">
            <p>
              Pincode / ZIP<span>*</span>
            </p>
            <input
              type="number"
              name="pincode"
              value={values.pincode}
              onChange={handleChange("pincode")}
            ></input>
            <div style={{ fontSize: 12, color: "red" }}>
              {values.pincodeError}
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="checkout__input">
                <p>
                  Phone<span>*</span>
                </p>
                <input
                  type="number"
                  name="phonenumber"
                  value={values.phonenumber}
                  onChange={handleChange("phonenumber")}
                ></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {values.phonenumberError}
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="checkout__input">
                <p>
                  Email<span>*</span>
                </p>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange("email")}
                ></input>
                <div style={{ fontSize: 12, color: "red" }}>
                  {values.emailError}
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ padding: "1%" }}>
            <div className="col-lg-6" style={{ padding: "1%" }}>
              <Link class="btn site-btn  btn-lg btn-block" to="/cart">
                Back to Cart
              </Link>
            </div>
            <div
              style={{ margin: "0 auto", padding: "1%" }}
              className="col-lg-6"
            >
              <button
                type="submit"
                class="btn site-btn  btn-lg btn-block"
                style={{ height: "h-10" }}
                onClick={this.continue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CustomerDetails;
