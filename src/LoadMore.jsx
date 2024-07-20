import { useState, useEffect } from "react";

function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setcount] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(false)

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
        setProducts(results.products);
      }
      setLoading(false);
    } catch (error) {
      console.log("error fetching products", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  if (loading) return <div>Loading products ... please wait</div>;
  return (
    <div className="container">
      <div className="product-container">
        {products && products.length
          ? products.map((product) => (
              <div className="product" key={product.id}>
                <img src={product.thumbnail} alt={product.description} />
                <p>{product.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="btn-container">
        <button onClick={() => setcount(count + 1)} className="btn">
          Load More products
        </button>
      </div>
    </div>
  );
}

export default LoadMore;
