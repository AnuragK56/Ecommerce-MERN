import React, { Component } from "react";
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
  const data = await fetch("http://localhost:5000/razorpay", {
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
  render() {
    return (
      <div>
        <h2>Payment component</h2>
        <button onClick={displayRazorpay}>Make payment</button>
      </div>
    );
  }
}

export default Payment;
