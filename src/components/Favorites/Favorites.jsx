import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useCart } from '../../contexts/CartContext'
import './Favorites.css'

const Favorites = () => {
  const { favoriteItems, removeFavorite, clearAllFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearAllFavorites();
    }
  };

  const handleAddToCart = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
  };

  // Empty state
  if (favoriteItems.length === 0) {
    return (
      <div className="favorites-container">
        <div className="favorites-header">
          <h1>My Favorites</h1>
          <p>Save your favorite products here</p>
        </div>
        
        <div className="empty-favorites">
          <div className="empty-favorites-icon">♥</div>
          <h2>No Favorites Yet</h2>
          <p>Start adding products to your favorites to see them here!</p>
          <Link to="/" className="browse-products-btn">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  // With favorites
  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <p>Your saved products ({favoriteItems.length})</p>
      </div>

      <div className="favorites-actions">
        <span className="favorites-count">
          {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'}
        </span>
        <button 
          onClick={handleClearAll}
          className="clear-favorites-btn"
        >
          Clear All
        </button>
      </div>

      <div className="favorites-grid">
        {favoriteItems.map(item => (
          <div key={item.id} className="favorite-item">
            <button 
              onClick={() => removeFavorite(item.id)}
              className="remove-favorite-btn"
              title="Remove from favorites"
            >
              ×
            </button>
            
            <img 
              src={item.thumbnail} 
              alt={item.title}
              className="favorite-item-image"
            />
            
            <div className="favorite-item-details">
              <h3>{item.title}</h3>
              <p className="favorite-item-price">${item.price}</p>
              
              <div className="favorite-item-actions">
                <Link 
                  to={`/products/${item.id}`}
                  className="view-product-btn"
                >
                  View Details
                </Link>
                <button 
                  className="add-to-cart-from-favorites"
                  onClick={(e) => handleAddToCart(item, e)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites