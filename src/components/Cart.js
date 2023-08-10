import React from 'react';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      quantity: 0,
    };
  }
  handleVisible = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };
  subTotal = {};
  render() {
    return (
      <aside className="cart">
        <header onClick={this.handleVisible} className="cart-header">
          <img src="/images/static/bag-icon.png" alt="" />
          <span className="notification">{this.props.cart.length}</span>
        </header>
        {this.state.isVisible ? (
          <div className="cart-box">
            <span onClick={this.handleVisible} className="cross">
              X
            </span>
            <header className="text-center box-header">
              <img src="/images/static/bag-icon.png" alt="" />
              <span>{this.props.cart.length}</span>
              <h3>Cart</h3>
            </header>
            <ul>
              {this.props.cart.map((item, i) => (
                <li>
                  <img
                    src={`/images/static/products/${item.sku}_2.jpg`}
                    alt=""
                  />
                  <h6 className="tshirt-style">{item.style}</h6>
                  <h5 className="tshirt-title">{item.title}</h5>
                  <span className="print-q">
                    Print Quantity:{item.quantity}
                  </span>
                  <strong className="cart-price">${item.price}</strong>
                  <button onClick={() => this.props.increment(item)}>+</button>
                  <button
                    disabled={item.quantity === 1 ? true : false}
                    onClick={() => this.props.decrement(item)}
                  >
                    -
                  </button>
                  <strong onClick={() => this.props.delete(i)}>X</strong>
                </li>
              ))}
            </ul>
            <footer className="flex footer">
              <h5>Subtotoal</h5>
              <h6 className="total-price">
                $
                {this.props.cart.reduce(
                  (acc, cv) => acc + cv.price * cv.quantity,
                  0
                )}
              </h6>
              <button
                className="check-btn"
                onClick={() =>
                  alert(
                    this.props.cart.reduce(
                      (acc, cv) => acc + cv.price * cv.quantity,
                      0
                    )
                  )
                }
              >
                Checkout
              </button>
            </footer>
          </div>
        ) : (
          ''
        )}
      </aside>
    );
  }
}

export default Cart;