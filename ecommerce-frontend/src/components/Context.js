import React, { Component } from "react";
export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [
      {
        _id: "1",
        title: "Disposable Mask",
        src: "https://www.fda.gov/files/surgical-mask.jpg",
        description:
          "3 layer filteration system Inner layer: Cotton layer fabic with anti-bacterial finish  Middle layer: Meltblown fabric that filters particles Outer layer: Cotton woven fabric Special features:  Bacterial filtration Anti-microbial finish  Breathable  Washable Soft knit fabric on both inner and outer layer Reusable Anti-dust ",
        price: 100,
        count: 1,
      },
      {
        _id: "2",
        title: "Disposable Sheild",
        src: "https://www.fda.gov/files/surgical-mask.jpg",
        description:
          "3 layer filteration system Inner layer: Cotton layer fabic with anti-bacterial finish  Middle layer: Meltblown fabric that filters particles Outer layer: Cotton woven fabric Special features:  Bacterial filtration Anti-microbial finish  Breathable  Washable Soft knit fabric on both inner and outer layer Reusable Anti-dust ",
        price: 200,
        count: 1,
      },
      {
        _id: "3",
        title: "Disposable PPE",
        src: "https://www.fda.gov/files/surgical-mask.jpg",
        description:
          "3 layer filteration system Inner layer: Cotton layer fabic with anti-bacterial finish  Middle layer: Meltblown fabric that filters particles Outer layer: Cotton woven fabric Special features:  Bacterial filtration Anti-microbial finish  Breathable  Washable Soft knit fabric on both inner and outer layer Reusable Anti-dust ",
        price: 500,
        count: 1,
      },
      {
        _id: "4",
        title: "Disposable Shoes",
        src: "https://www.fda.gov/files/surgical-mask.jpg",
        description:
          "3 layer filteration system Inner layer: Cotton layer fabic with anti-bacterial finish  Middle layer: Meltblown fabric that filters particles Outer layer: Cotton woven fabric Special features:  Bacterial filtration Anti-microbial finish  Breathable  Washable Soft knit fabric on both inner and outer layer Reusable Anti-dust ",
        price: 400,
        count: 1,
      },
      {
        _id: "5",
        title: "Disposable Gloves",
        src: "https://www.fda.gov/files/surgical-mask.jpg",
        description:
          "3 layer filteration system Inner layer: Cotton layer fabic with anti-bacterial finish  Middle layer: Meltblown fabric that filters particles Outer layer: Cotton woven fabric Special features:  Bacterial filtration Anti-microbial finish  Breathable  Washable Soft knit fabric on both inner and outer layer Reusable Anti-dust ",
        price: 300,
        count: 1,
      },
    ],
    cart: [],
    total:0
  };
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
    this.getTotal()
  };
  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count = item.count + 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal()
  };
  removeitem = (id) => {
    if (window.confirm("Do you really want to delete this  product ?")){
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item._id === id) {
          item.count = 1;
          cart.splice(index, 1);
        }
      });
      this.setState({ cart: cart });
      this.getTotal()
    }
  };
  getTotal=()=>{
    const{cart}=this.state;
    const res =cart.reduce((prev,item)=>{
      return prev+ (item.price*item.count);
    },0)
    this.setState({total:res})
  }
  render() {
    const { products, cart,total } = this.state;
    const { addcart, increase, reduction, removeitem,getTotal} = this;
    return (
      <DataContext.Provider
        value={{ products, addcart, cart, increase, reduction, removeitem,total,getTotal }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
