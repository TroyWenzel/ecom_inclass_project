import "./ProductList.css"
import ProductCard from "../ProductCard/ProductCard"

const ProductList = ({ products }) => {
  // Add this safety check
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="no-products-message">
        <p>No products to display</p>
        <p>Try searching for something different</p>
      </div>
    );
  }

  return (
    <div className="card-list">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductList