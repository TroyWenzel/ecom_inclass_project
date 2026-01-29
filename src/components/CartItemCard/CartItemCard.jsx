import './CartItemCard.css'
import { useCart } from '../../contexts/CartContext'

const CartItemCard = ({product}) => {
    const { incrementQuantity, decrementQuantity, removeItem } = useCart()
    
    const handleIncrement = (e) => {
        e.stopPropagation()
        incrementQuantity(product.id)
    }
    
    const handleDecrement = (e) => {
        e.stopPropagation()
        decrementQuantity(product.id)
    }
    
    const handleRemove = (e) => {
        e.stopPropagation()
        removeItem(product.id)
    }

    return (
        <div className='cartItemCard'>
        <div className="left">
            <img src={product.thumbnail} alt={product.title} />
            <div className="card-info">
            <h4>{product.title}</h4>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price}</p>
            <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
            </div>
        </div>
        <div className="right">
            <div className="quantity-controls">
            <button 
                onClick={handleDecrement}
                disabled={product.quantity <= 1}
                className="quantity-btn"
            >
                −
            </button>
            <span className="quantity">{product.quantity}</span>
            <button 
                onClick={handleIncrement}
                className="quantity-btn"
            >
                +
            </button>
            </div>
            <button 
            onClick={handleRemove}
            className="remove-btn"
            >
            Remove
            </button>
        </div>
        </div>
    )
}

export default CartItemCard