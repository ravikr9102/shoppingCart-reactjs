function Sizes(props) {
    return (
      <aside className="sidebar">
        <h1 className="size-heading">Sizes Available:</h1>
        <ul className="sizes">
          {props.sizes.map((size) => (
            <li 
              key={size}
              className={props.activeSize.includes(size) ? 'active' : ''}
              onClick={() => {
                props.handleSize(size);
              }}
            >
              {size}
            </li>
          ))}
        </ul>
      </aside>
    );
  }
  
  export default Sizes;