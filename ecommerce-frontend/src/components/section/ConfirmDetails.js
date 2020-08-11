import React, { Component } from "react";

export class ConfirmDetails extends Component {
  render() {
    const { values, prevStep, nextStep } = this.props;
    return (
      <>
        <div className="container">
          <div className="banner">
            <p className="banner-text">Confirm Details</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6" style={{ margin: "0 auto" }}>
          <div className="row">
            <div className="col-lg-6">
              <div className="checkout__input">
                <p>
                  Fist Name<span>*</span>
                </p>
                <input
                  type="text"
                  name="firstname"
                  value={values.firstname}
                  disabled
                ></input>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="checkout__input">
                <p>
                  Last Name<span>*</span>
                </p>

                <input
                  type="text"
                  name="lastname"
                  value={values.lastname}
                  disabled
                ></input>
              </div>
            </div>
          </div>
          <div className="checkout__input">
            <p>
              Address<span>*</span>
            </p>
            <input
              type="text"
              name="address"
              value={values.address}
              disabled
            ></input>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="checkout__input">
                <p>
                  Town/City<span>*</span>
                </p>
                <input
                  type="text"
                  name="city"
                  value={values.city}
                  disabled
                ></input>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="checkout__input">
                <p>
                  State<span>*</span>
                </p>
                <input
                  type="text"
                  name="state"
                  value={values.state}
                  disabled
                ></input>
              </div>
            </div>
          </div>
          <div className="checkout__input">
            <p>
              Pincode / ZIP<span>*</span>
            </p>
            <input
              type="number"
              name="pincode"
              value={values.pincode}
              disabled
            ></input>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="checkout__input">
                <p>
                  Phone<span>*</span>
                </p>
                <input
                  type="number"
                  name="phonenumber"
                  value={values.phonenumber}
                  disabled
                ></input>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="checkout__input">
                <p>
                  Email<span>*</span>
                </p>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  disabled
                ></input>
              </div>
            </div>
          </div>
          <div style={{ margin: "0 auto" }}>
            <div className="row" style={{ padding: "1%" }}>
              <div className="col-lg-6" style={{ padding: "1%" }}>
                <button
                  type="submit"
                  className="btn site-btn  btn-lg btn-block"
                  onClick={prevStep}
                >
                  Go Back
                </button>
              </div>
              <div className="col-lg-6" style={{ padding: "1%" }}>
                <button
                  type="submit"
                  className="btn site-btn  btn-lg btn-block"
                  onClick={nextStep}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ConfirmDetails;
