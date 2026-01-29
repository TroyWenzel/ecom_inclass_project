import { useFavorites } from "../../../contexts/FavoritesContext";
import "./FavoriteButton.css";

const FavoriteButton = ({ product, size = "medium" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product?.id);

  const handleClick = (e) => {
    toggleFavorite(product, e);
  };

  return (
    <button
      className={`favorite-btn favorite-btn-${size} ${isProductFavorite ? "is-favorite" : ""}`}
      onClick={handleClick}
      title={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isProductFavorite ? "❤️" : "🤍"}
    </button>
  );
};

export default FavoriteButton;