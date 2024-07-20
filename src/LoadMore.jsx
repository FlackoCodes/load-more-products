import { useState, useEffect } from "react";

function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setcount] = useState([]);

  async function fetchProducts(){
    try {
        setLoading(true)
        const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0: count * 20}`)
        if (res && res.products && res.products.length) {
            setProducts(res.products)
        }
    } catch (error) {
        console.log('error fetching products', error);
    }
  }  

  useEffect(()=>{
    fetchProducts()
  },[])

  if (loading) return <div>Loading products ... please wait</div>
  return <div className="container">LoadMore</div>;
}

export default LoadMore;
