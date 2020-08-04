import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: null,
      login: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  fetchdata() {
    fetch("http://localhost:5000/adminpanel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((result) => {
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              token: result,
            })
          );
        });
      }
    });
    this.setState({ login: true });
    console.log(this.state);
  }
  handlesubmit = (event) => {
    if (this.state.username !== "" && this.state.password !== "") {
      this.fetchdata();
      console.log("Data ", this.state);
    }
  };
  render() {
    if (!this.state.login) {
      return (
        <div className="container">
          {/* <form
          class="col-lg-6 col-md-6 form-signin"
          style={{ margin: "0 auto" }}
        > */}
          <img
            class="mb-4"
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          ></img>
          <div style={{ fontSize: 12, color: "red" }}>{this.state.invalid}</div>
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label class="sr-only">Username</label>
          <input
            type="text"
            name="username"
            class="form-control"
            placeholder="Username "
            onChange={this.handleInputChange}
            value={this.state.email}
          ></input>
          <label class="sr-only">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          ></input>
          <button
            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
            // to="/dashboard"
            onClick={this.handlesubmit}
          >
            SIGN IN
          </button>
          <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
          {/* </form> */}
        </div>
      );
    } else {
      return (
        <>
          <Link to="/adminpanel" class="primary-btn">
            Open Adminpanel
          </Link>
        </>
      );
    }
  }
}

export default Login;
