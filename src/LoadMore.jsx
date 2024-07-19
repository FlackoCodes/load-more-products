import { useState, useEffect } from "react";

function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setcount] = useState([]);

  async function fetchProducts(){
    try {
        setLoading(true)
        const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0: count * 20}`)
        const data = await res.json()
        console.log(data);
    } catch (error) {
        console.log('error fetching products', error);
    }
  }  

  useEffect(()=>{
    fetchProducts()
  },[])

  return <div className="container">LoadMore</div>;
}

export default LoadMore;
