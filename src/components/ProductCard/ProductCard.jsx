import "./ProductCard.css"
import AddToCart from "../AddToCart/AddToCart"
import { useNavigate } from "react-router-dom"
import RatingStars from "../RatingStars"
import FavoriteButton from "../Favorites/FavoritesButton/FavoriteButton"

const ProductCard = ({product}) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Only navigate if the click wasn't on the AddToCart button or FavoriteButton
    if (!e.target.closest('.add-to-cart-btn') && !e.target.closest('.favorite-btn')) {
      navigate(`/products/${product?.id}`);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card-header">
        <FavoriteButton product={product} size="small" />
      </div>
      <img 
        src={product?.thumbnail} 
        alt={product?.title}
        className="product-card-image"
      />
      <h3 className="product-card-title">{product?.title}</h3>
      <h4 className="product-card-brand">{product?.brand}</h4>
      <div className="product-card-rating">
        <RatingStars rating={product?.rating} />
      </div>
      <p className="product-card-price">${product?.price}</p>
      <AddToCart product={product}/>
    </div>
  )
}

export default ProductCard