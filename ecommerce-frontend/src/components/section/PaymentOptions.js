import React, { Component } from "react";
import { DataContext } from "../Context";

//Loading Razerpay Script
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

export class PaymentOptions extends Component {
  abortcontroller = new AbortController();
  static contextType = DataContext;
  state = {
    orderId: "",
    payment: "",
  };
  //Proceed to next page i.e. Order Details
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  //Function For Razorpay to generate Order Id and save data to database and to display Razorpay
  async displayRazorpay() {
    //Creating cart with product id and quantity
    const tempcart = this.context.cart.map((product) => ({
      productid: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: product.count,
    }));
    // console.log(
    //   "Creating a cash on delivery order for " + this.props.values.firstname
    // );

    //Creating Order details
    const data1 = {
      customer: {
        firstname: this.props.values.firstname,
        lastname: this.props.values.lastname,
        address: this.props.values.address,
        state: this.props.values.state,
        city: this.props.values.city,
        pincode: this.props.values.pincode,
        phonenumber: this.props.values.phonenumber,
        email: this.props.values.email,
      },
      cart: tempcart,
      paymentmethod: "Razorpay",
      total: this.context.total,
    };
    const res = await loadRazerpay();
    if (!res) {
      alert("Razorpay SDK Failed to load.Check your Internet connection");
      return;
    }

    //Making Post request to Backend to get Razorpay order_id
    const data2 = await fetch("http://localhost:5000/createorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data1),
    }).then((t) => t.json());
    // console.log(data2.createdorder);
    // console.log(
    //   "Data" +
    //     data2.createdorder.razorpay_order_id +
    //     " " +
    //     data2.createdorder.amount
    // );
    const options = {
      currency: data2.createdorder.currency,
      amount: data2.createdorder.amount,
      key: "rzp_test_ID", // Enter the Key ID generated from the Dashboard
      name: "The Shop",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data2.createdorder.razorpay_order_id,
      prefill: {
        name: this.props.values.firstname + this.props.values.lastname,
        email: this.props.values.email,
      },
      theme: {
        color: "#F37254",
      },
      handler: function (response) {
        alert("Payment was Successful");
        this.setState({ payment: "Success" });
        this.setState({ orderId: data2.createdorder.order_id });
        this.props.addOrderId(this.state.orderId);
      }.bind(this),
    };
    const paymentoption = new window.Razorpay(options);
    paymentoption.open();
  }

  //Function fcalled when Razorpay is clicked
  paycod = (e) => {
    e.preventDefault();
    this.cashonDelivery();
    this.setState({ payment: "Success" });
  };
  //Function called when Razorpay is clicked
  payrazorpay = (e) => {
    e.preventDefault();
    this.displayRazorpay();
  };

  //Function For COD to generate Order Id and save data to database
  async cashonDelivery() {
    const tempcart = this.context.cart.map((product) => ({
      productid: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: product.count,
    }));
    // console.log(
    //   "Creating a cash on delivery order for " + this.props.values.firstname
    // );
    const data = {
      customer: {
        firstname: this.props.values.firstname,
        lastname: this.props.values.lastname,
        address: this.props.values.address,
        state: this.props.values.state,
        city: this.props.values.city,
        pincode: this.props.values.pincode,
        phonenumber: this.props.values.phonenumber,
        email: this.props.values.email,
      },
      cart: tempcart,
      paymentmethod: "COD",
      total: this.context.total,
    };

    await fetch(
      "http://localhost:5000/createorder",
      // { signal: this.abortcontroller.signal },
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((t) => t.json())
      .then((data) => this.setState({ orderId: data.createdorder.orderid }));
    this.props.addOrderId(this.state.orderId);
  }
  render() {
    const { cart, total } = this.context;
    let paid;
    if (this.state.payment === "") {
      paid = (
        <>
          <div className="row">
            <div className="col-6">
              <button
                type="submit"
                className="btn site-btn  btn-lg btn-block"
                onClick={this.payrazorpay}
                style={{ fontSize: "18px" }}
              >
                UPI/ CARD/ NETBANKING
                <br></br>
                <small style={{ fontSize: "10px" }}>(Razorpay)</small>
              </button>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn site-btn  btn-lg btn-block"
                onClick={this.paycod}
                style={{ fontSize: "18px" }}
              >
                COD
                <br></br>
                <small style={{ fontSize: "10px" }}>(Cash on Delivery)</small>
              </button>
            </div>
          </div>
        </>
      );
    } else {
      paid = (
        <button
          type="submit"
          className="btn site-btn  btn-lg btn-block"
          onClick={this.continue}
        >
          Order Details
        </button>
      );
    }
    return (
      <>
        <div className="container">
          <div className="banner">
            <p className="banner-text">Payment Options</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6" style={{ margin: " 0 auto" }}>
          <div className="checkout__order">
            <h4>Your Order</h4>
            <div className="checkout__order__products">
              Products <span>Total</span>
            </div>
            <ul>
              {cart.map((item) => (
                <li>
                  {item.title} <span>₹{item.price * item.count}</span>
                </li>
              ))}
            </ul>

            <div className="checkout__order__total">
              Total <span>₹{total}</span>
            </div>
          </div>
          {paid}
        </div>
      </>
    );
  }
}

export default PaymentOptions;
