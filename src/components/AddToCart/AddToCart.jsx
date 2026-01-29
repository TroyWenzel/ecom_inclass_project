import { useCart } from "../../contexts/CartContext"
import "./AddToCart.css"

const AddToCart = ({ product }) => {
  const { addToCart } = useCart()
  
  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart(product, e);

  }

  return (
    <button 
      onClick={handleAddToCart}
      className="add-to-cart-btn"
    >
      Add to Cart
    </button>
  )
}

export default AddToCart