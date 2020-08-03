import React, { Component } from "react";
import Orderplaced from "./section/Orderplaced";
import ConfirmDetails from "./section/ConfirmDetails";
import CustomerDetails from "./section/CustomerDetails";
import PaymentOptions from "./section/PaymentOptions";

export class Checkout extends Component {
  state = {
    step: 1,
    firstname: "",
    lastname: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    phonenumber: "",
    email: "",
    firstnameError: "",
    lastnameError: "",
    addressError: "",
    cityError: "",
    stateError: "",
    emailError: "",
    phonenumberError: "",
    pincodeError: "",
    orderId: "",
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
  //Proceed to Next Step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  addOrderId=(order)=>{
    this.setState({orderId:order});
  }
  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };
  render() {
    const { step } = this.state;
    const {
      firstname,
      lastname,
      address,
      state,
      city,
      pincode,
      phonenumber,
      email,
      firstnameError,
      lastnameError,
      addressError,
      cityError,
      stateError,
      emailError,
      phonenumberError,
      pincodeError,
      orderId,
    } = this.state;
    const values = {
      firstname,
      lastname,
      address,
      state,
      city,
      pincode,
      phonenumber,
      email,
      firstnameError,
      lastnameError,
      addressError,
      cityError,
      stateError,
      emailError,
      phonenumberError,
      pincodeError,
      orderId,
    };
    switch (step) {
      default:
      case 1:
        return (
          <CustomerDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            validate={this.validate}
            values={values}
          />
        );
      case 2:
        return (
          <>
            <ConfirmDetails
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />
          </>
        );

      case 3:
        return (
          <>
            <PaymentOptions
              values={values}
              nextStep={this.nextStep}
              addOrderId={this.addOrderId}
            ></PaymentOptions>
          </>
        );
      case 4:
        return (
          <>
            <Orderplaced values={values} />
          </>
        );
    }
  }
}

export default Checkout;
