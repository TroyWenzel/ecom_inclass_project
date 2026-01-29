import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Step 1: Create the favorites context
const FavoritesContext = createContext();

// Step 2: Create hook to consume/use our context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  return context;
};

// Step 3: Favorites Provider component
export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const storedFavorites = localStorage.getItem("my-favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Store favorites changes to local storage when they're made
  useEffect(() => {
    localStorage.setItem("my-favorites", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  // Check if item is in favorites
  const isFavorite = (id) => {
    return favoriteItems.some((item) => item.id === id);
  };

  // Toggle favorite (add if not present, remove if present)
  const toggleFavorite = (product, event) => {
    // Prevent event bubbling to avoid clicking into card details
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const existingItem = favoriteItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Remove from favorites
      const newFavorites = favoriteItems.filter((item) => item.id !== product.id);
      setFavoriteItems(newFavorites);
      toast.info(`Removed ${product.title} from favorites`);
    } else {
      // Add to favorites
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        brand: product.brand,
        rating: product.rating,
        description: product.description,
      };
      setFavoriteItems((prevItems) => [...prevItems, newItem]);
      toast.success(`Added ${product.title} to favorites!`);
    }
  };

  // Remove item from favorites
  const removeFavorite = (id) => {
    const itemToRemove = favoriteItems.find((item) => item.id === id);
    const newFavorites = favoriteItems.filter((item) => item.id !== id);
    setFavoriteItems(newFavorites);
    
    if (itemToRemove) {
      toast.warning(`Removed ${itemToRemove.title} from favorites`);
    }
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    setFavoriteItems([]);
    toast.info("All favorites cleared");
  };

  // Get total number of favorites
  const getTotalFavorites = () => {
    return favoriteItems.length;
  };

  const value = {
    favoriteItems,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
    isFavorite,
    getTotalFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};