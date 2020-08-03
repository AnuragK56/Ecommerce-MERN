import React, { Component } from "react";

export class ConfirmDetails extends Component {
  render() {
    const { values, prevStep, nextStep } = this.props;
    return (
      <>
        <div className="container">
          <div
            style={{
              width: "100%",
              height: "100px",
              backgroundColor: "#7fad39",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                display: "inline-block",
                paddingTop: "30px",
                color: "white",
                fontWeight: "1000",
                fontSize: "40px",
              }}
            >
              Confirm Details
            </p>
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
                  disabled
                ></input>
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
                  disabled
                ></input>
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
              disabled
            ></input>
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
                  disabled
                ></input>
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
                  disabled
                ></input>
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
              disabled
            ></input>
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
                  disabled
                ></input>
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
                  disabled
                ></input>
              </div>
            </div>
          </div>
          <div style={{ margin: "0 auto" }}>
            <div class="row">
              <div class="col-lg-6">
                <button type="submit" class="site-btn" onClick={prevStep}>
                  Go Back
                </button>
              </div>
              <div class="col-lg-6">
                <button type="submit" class="site-btn" onClick={nextStep}>
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
