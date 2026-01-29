import { useEffect, useState } from "react"
import ProductList from "../components/ProductList/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // In-class practice
  // API Call on page load to the all products endpoint on the dummyjson API
  // set a state variable 'products' to the data returned from the api call

  // UseEffect - Do something after the screen updates
  // useEffect(() => {
     // code to run AFTER render
  // }, []); //Empty dependency Array means this will only fire upon component mount (only first render)

  useEffect(()=>{
    
    const fetchProducts = async () => {
      try{
        const response = await fetch("https://dummyjson.com/products?limit=10");
        const productData = await response.json();
        setProducts(productData.products);
        setLoading(false)
      } catch (error){
        console.log(error);
      }
    }

    fetchProducts();

  },[]);

  return (
    <>
      {loading && <h3>Loading...</h3>}
      <ProductList products={products} />
    </>
  )
}

export default Home