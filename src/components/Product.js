function Product(props) {
    let productData = props.data.map((item) => item);
    return (
      <>
        <header className="product-wrapper flex">
          <h5 className="product-fo">{props.total} prodcts found</h5>
          <label htmlFor="">
            Order by 
            <select className="select"  onChange={props.onChange} name="select" id="">
              <option value="select">Select</option>
              <option value="LowestToHighest">Lowest to Highest</option>
              <option value="HighestToLowest">Highest to Lowest</option>
            </select>
          </label>
        </header>
        <section className="product-wrapper">
          <ul className="prodcut-list">
            {productData.map((product) => (
              <li key={product.id}>
                <p>Free Shipping</p>
                <img
                  src={`/images/static/products/${product.sku}_1.jpg`}
                  alt=""
                />
                <h4>{product.title}</h4>
                <div className="line"></div>
                <strong className="price">${product.price}</strong>
                <div>
                  <button onClick={() => props.addItem(product)}>
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  }
  export default Product;