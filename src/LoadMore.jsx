import { useState, useEffect } from "react";

function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setcount] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const results = await res.json();
      if (results && results.products && results.products.length) {
        setProducts((prev) => [...prev, ...results.products]);
        console.log(results);
        setDisablePrev(count === 0);
        setLoading(false);
      }
    } catch (error) {
      console.log("error fetching products", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) setDisableNext(true);
  }, [products]);

  useEffect(() => {
    if (products && products.length < 20) setDisablePrev(true);
  }, [products]);

  if (loading) return <div>Loading products ... please wait</div>;
  return (
    <div className="container">
      <div className="product-container">
        {products && products.length
          ? products.map((product, index) => (
              <div className="product" key={index}>
                <img src={product.thumbnail} alt={product.description} />
                <p>{product.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="btn-container">
        <button
          disabled={disableNext}
          onClick={() => setcount(count + 1)}
          className="btn"
        >
          Load More products
        </button>
        {disableNext ? <p>You have reached 100 products</p> : null}
      </div>
      <button
        disabled={disablePrev}
        onClick={() => setcount(count - 1)}
        className="btn"
      >
        Load More products
      </button>
      {disablePrev ? <p>Click next btn for more</p> : null} 
    </div>
  );
}

export default LoadMore;
