import React from 'react';
import data from '../data.json';
import Sizes from './Size';
import Product from './Product';
import Cart from './Cart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      select: 'select',
      sortedFilteredArray: [],
      activeSize: [],
    };
  }
  handleSize = (size) => {
    let array = [];
    if (this.state.activeSize.includes(size)) {
      array = this.state.activeSize.filter((v) => v !== size);
    } else {
      array = [...this.state.activeSize, size];
    }
    this.setState({ activeSize: array }, () => this.sortData())
  };
  handleSort = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value}, () => this.sortData());
  };
  handleAddToCart = (item) => {
    let arr = this.state.cart;
    let itemFound = arr.find((ele) => ele.id === item.id);
    if (itemFound) {
      itemFound.quantity = itemFound.quantity + 1;
    } else {
      item.quantity = 1;
      arr.push(item);
    }
    this.setState(
      {
        cart: arr,
      },
      () => {
        console.log(this.state.cart);
      }
    );
  };
  handleIncrement = (item) => {
    let val = this.state.cart;
    let valFound = val.find((elm) => elm.id === item.id);
    if (valFound) {
      valFound.quantity = valFound.quantity + 1;
    } else {
      item.quantity = 1;
    }
    this.setState({
      cart: val,
    });
  };
  handleDecrement = (item) => {
    let val = this.state.cart;
    let valFound = val.find((elm) => elm.id === item.id);
    if (valFound) {
      valFound.quantity = valFound.quantity - 1;
    } else {
      item.quantity = 1;
    }
    this.setState({
      cart: val,
    });
  };

  handleRemoveToCart = (i) => {
    let cart = this.state.cart;
    this.setState(() => {
      return cart.splice(i, 1);
    });
  };
  sortData = () => {
    const value = this.state.select;
    let allProduct = data;
    let filterProduct = allProduct;
    if (this.state.activeSize.length > 0) {
      filterProduct = allProduct.filter((product) =>
        product.availableSizes.some((size) =>
          this.state.activeSize.includes(size)
        )
      );
      this.setState({
        sortedFilteredArray: filterProduct,
      })
    }
    if (value === 'LowestToHighest') {
      filterProduct.sort((a, b) => a.price - b.price);
      this.setState({
        sortedFilteredArray: filterProduct,
      });
    }
    if (value === 'HighestToLowest') {
      filterProduct.sort((a, b) => b.price - a.price);
      this.setState({
        sortedFilteredArray: filterProduct,
      });
    }
    if(value === 'select'){
        this.setState({
            sortedFilteredArray: filterProduct,
        })
    }
  };
  render() {
    let sizes = [...new Set(data.map((item) => item.availableSizes).flat())];
    let displayProduct = this.state.sortedFilteredArray.length === 0 ? data : this.state.sortedFilteredArray;
    return (
      <>
        <Sizes
          sizes={sizes}
          activeSize={this.state.activeSize}
          handleSize={this.handleSize}
        />
        <Product
          total={displayProduct.length}
          data={displayProduct}
          onChange={this.handleSort}
          addItem={this.handleAddToCart}
        />
        <Cart
          increment={this.handleIncrement}
          decrement={this.handleDecrement}
          delete={this.handleRemoveToCart}
          cart={this.state.cart}
        />
      </>
    );
  }
}

export default App;