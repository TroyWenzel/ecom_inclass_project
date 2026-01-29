import { useCart } from "../../contexts/CartContext"
import CartItemCard from "../CartItemCard/CartItemCard"
import "./Cart.css"
import { Link } from "react-router-dom"

const Cart = () => {
  const { cartItems, total, clearCart, getTotalQuantity } = useCart()

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart()
    }
  }

  return (
    <div className="cartContainer">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 && (
          <button onClick={handleClearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        )}
      </div>
      
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItemCard product={item} key={item.id}/>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Items ({getTotalQuantity()}):</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart