import React, { Component } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";
export class Details extends Component {
  static contextType = DataContext;
  state = {
    product: [],
  };
  getProduct = () => {
    if (this.props.match.params.id) {
      const res = this.context.products;
      const data = res.filter((item) => {
        return item._id ===  this.props.match.params.id;
      });
      this.setState({ product: data });
    }
  };
  componentDidMount() {
    this.getProduct();
  }
  render() {
    const { product } = this.state;
    return product.map((item) => (
      <div className="Details" key="{item._id}">
        <img src={item.src} alt=""></img>
        <div classname="box">
          <div className="row">
            <h2>{item.title}</h2>
            <span>${item.price}</span>
          </div>
          <p>{item.description}</p>
          <button onClick={() => this.context.addcart(item._id)}>
            ADD TO CART
          </button>
        </div>
      </div>
    ));
  }
}

export default Details;
