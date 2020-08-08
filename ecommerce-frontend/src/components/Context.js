import React, { Component } from "react";
export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [],
    cart: [],
    total: 0,
  };

  fetchData = async () => {
    fetch("http://localhost:5000/getproducts", {})
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
    console.log("Fetching data ");
  };
  componentDidMount() {
    this.fetchData();
  }

  addcart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every((item) => {
      return item._id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });
      this.setState({ cart: [...cart, ...data] });
    } else {
      alert("The product is already in the cart ");
    }
  };
  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };
  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id && item.stock != item.count) {
        item.count = item.count + 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };
  removeitem = (id) => {
    if (window.confirm("Do you really want to delete this  product ?")) {
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item._id === id) {
          item.count = 1;
          cart.splice(index, 1);
        }
      });
      this.setState({ cart: cart });
      this.getTotal();
    }
  };
  emptycart = () => {
    this.setState({ cart: [], total: 0 });
  };
  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };
  render() {
    const { products, cart, total } = this.state;
    const {
      addcart,
      increase,
      reduction,
      removeitem,
      getTotal,
      emptycart,
    } = this;
    return (
      <DataContext.Provider
        value={{
          products,
          addcart,
          cart,
          increase,
          reduction,
          removeitem,
          total,
          getTotal,
          emptycart,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
