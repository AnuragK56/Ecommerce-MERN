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
      product: product._id,
      quantity: product.count,
    }));
    console.log(
      "Creating a cash on delivery order for " + this.props.values.firstname
    );

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
      key: "rzp_test_xfqXHG772xVSUH", // Enter the Key ID generated from the Dashboard
      name: "The Salon Shop",
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
      product: product._id,
      quantity: product.count,
    }));
    console.log(
      "Creating a cash on delivery order for " + this.props.values.firstname
    );
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
          <button type="submit" class="site-btn" onClick={this.payrazorpay}>
            Pay Using RazorPay
          </button>
          <button type="submit" class="site-btn" onClick={this.paycod}>
            Pay using Cash on Delivery
          </button>
        </>
      );
    } else {
      paid = (
        <button type="submit" class="site-btn" onClick={this.continue}>
          Order Details
        </button>
      );
    }
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
            {paid}
          </div>
        </div>
      </>
    );
  }
}

export default PaymentOptions;