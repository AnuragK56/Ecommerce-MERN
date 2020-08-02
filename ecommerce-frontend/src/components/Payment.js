import React, { Component } from "react";
import { DataContext } from "../components/Context";

function loadRazerpay() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
async function displayRazorpay() {
  const res = await loadRazerpay();
  if (!res) {
    alert("Razorpay SDK Failed to load.Check your Internet connection");
    return;
  }
  const data = await fetch("http://localhost:5000/createorder", {
    method: "POST",
  }).then((t) => t.json());
  console.log(data);
  const options = {
    currency: data.currency,
    amout: data.amount,
    key: "rzp_test_xfqXHG772xVSUH", // Enter the Key ID generated from the Dashboard
    name: "The Salon Shop",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    prefill: {
      name: "Anurag Kandalkar",
      email: "test@gmail.com",
    },
    theme: {
      color: "#F37254",
    },
  };
  const paymentoption = new window.Razorpay(options);
  paymentoption.open();
}

export class Payment extends Component {
  static contextType = DataContext;
  state = {
    firstname: "",
    lastname: "",
    address: "",
    state: "",
    city: "",
    pincode: 0,
    phonenumber: 0,
    email: "",
    firstnameError: "",
    lastnameError: "",
    addressError: "",
    cityError: "",
    stateError: "",
    emailError: "",
    phonenumberError: "",
    pincodeError: "",
  };
  async cashonDelivery() {
    const tempcart = this.context.cart.map((product) => ({
      product: product._id,
      quantity: product.count,
    }));
    const data = {
      customer: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address: this.state.address,
        state: this.state.state,
        city: this.state.city,
        pincode: this.state.pincode,
        phonenumber: this.state.phonenumber,
        email: this.state.email,
      },
      cart: tempcart,
      paymentmethod: "COD",
      total: this.context.total,
    };
    console.log(JSON.stringify(data));
    const data1 = await fetch("http://localhost:5000/createorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((t) => t.json());
    console.log(data1);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  validate = () => {
    let firstnameError = "";
    let lastnameError = "";
    let addressError = "";
    let cityError = "";
    let stateError = "";
    let emailError = "";
    let phonenumberError = "";
    let pincodeError = "";

    if (!this.state.firstname) {
      firstnameError = "Please Fill the required field";
    }
    if (!this.state.lastname) {
      lastnameError = "Please Fill the required field";
    }
    if (!this.state.address) {
      addressError = "Please Fill the required field";
    }
    if (!this.state.city) {
      cityError = "Please Fill the required field";
    }
    if (!this.state.state) {
      stateError = "Please Fill the required field";
    }

    if (!this.state.email.includes("@")) {
      emailError = "Invalid email";
    }
    if (this.state.phonenumber.length !== 10) {
      phonenumberError = "Invalid phonenumber";
    }

    if (this.state.pincode.length !== 6) {
      pincodeError = "Invalid pincode";
    }

    if (
      emailError ||
      phonenumberError ||
      pincodeError ||
      stateError ||
      cityError ||
      firstnameError ||
      lastnameError ||
      addressError
    ) {
      this.setState({
        emailError,
        phonenumberError,
        pincodeError,
        stateError,
        cityError,
        firstnameError,
        lastnameError,
        addressError,
      });
      return false;
    }

    return true;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
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
      // {displayRazorpay}
      this.cashonDelivery();
    }
  };

  render() {
    const { cart, total } = this.context;
    if (cart.length === 0) {
      return <h2>Cart is empty</h2>;
    } else {
      return (
        <>
          {/* <section class="checkout spad"> */}
          <div class="container">
            <div class="checkout__form">
              <h4>Billing Details</h4>
              <form onSubmit={this.handleSubmit}>
                <div class="row">
                  <div class="col-lg-8 col-md-6">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>
                            Fist Name<span>*</span>
                          </p>
                          <input
                            type="text"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                          ></input>
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.firstnameError}
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
                            value={this.state.lastname}
                            onChange={this.handleChange}
                          ></input>
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.lastnameError}
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
                        value={this.state.address}
                        onChange={this.handleChange}
                      ></input>
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.addressError}
                      </div>
                    </div>
                    <div class="checkout__input">
                      <p>
                        Town/City<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                      ></input>
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.cityError}
                      </div>
                    </div>
                    <div class="checkout__input">
                      <p>
                        State<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="state"
                        value={this.state.state}
                        onChange={this.handleChange}
                      ></input>
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.stateError}
                      </div>
                    </div>
                    <div class="checkout__input">
                      <p>
                        Pincode / ZIP<span>*</span>
                      </p>
                      <input
                        type="number"
                        name="pincode"
                        value={this.state.pincode}
                        onChange={this.handleChange}
                      ></input>
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.pincodeError}
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
                            value={this.state.phonenumber}
                            onChange={this.handleChange}
                          ></input>
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.phonenumberError}
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
                            value={this.state.email}
                            onChange={this.handleChange}
                          ></input>
                          <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.emailError}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="checkout__order">
                      <h4>Your Order</h4>
                      <div class="checkout__order__products">
                        Products <span>Total</span>
                      </div>
                      <ul>
                        {cart.map((item) => (
                          <li>
                            {item.title} <span>₹{item.price * item.count}</span>
                          </li>
                        ))}
                      </ul>

                      <div class="checkout__order__total">
                        Total <span>₹{total}</span>
                      </div>
                      <button
                        type="submit"
                        class="site-btn"
                        onSubmit={displayRazorpay}
                      >
                        Pay Using RazorPay
                      </button>
                      <button
                        type="submit"
                        class="site-btn"
                        onSubmit={this.handleSubmit}
                      >
                        Pay using Cash on Delivery
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* </section> */}
        </>
      );
    }
  }
}

export default Payment;
