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
  const options = {
    key: "rzp_test_xfqXHG772xVSUH", // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "The Salon Shop",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
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
  