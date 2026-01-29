import { useState, useEffect } from "react"
import ProductList from "../ProductList/ProductList"
import "./ProductSearch.css";

const ProductSearch = () => {
  const [search, setSearch] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  
  // Changed to a regular constant since it's never modified
  const categories = ['phone', 'laptop', 'fragrance', 'kitchen', 'food', 'home'];

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      setSearchSubmitted(trimmedSearch);
      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [trimmedSearch, ...prev.filter(s => s !== trimmedSearch)];
        return newHistory.slice(0, 5);
      });
    }
  }

  const handleSearchClick = (term) => {
    setSearch(term);
    setSearchSubmitted(term);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = `https://dummyjson.com/products?limit=12`;
        if (searchSubmitted) {
          url = `https://dummyjson.com/products/search?q=${searchSubmitted}`;
        }
        
        const response = await fetch(url);
        const productsData = await response.json();
        setProducts(productsData.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [searchSubmitted]);

  return (
    <div className="product-search-container">
      <div className="search-hero">
        <h1 className="search-title">Find Your Perfect Product</h1>
        <p className="search-subtitle">Search from thousands of products with our smart search</p>
        
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-container">
            <div className="search-icon">🔍</div>
            <input 
              type="text" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="What are you looking for today?"
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
          
          <div className="search-suggestions">
            <span className="suggestions-title">Popular categories:</span>
            {categories.slice(0, 6).map((category) => (
              <button 
                key={category}
                type="button"
                className="suggestion-chip"
                onClick={() => handleSearchClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </form>

        {searchHistory.length > 0 && (
          <div className="search-history">
            <div className="history-header">
              <span>Recent searches</span>
              <button 
                type="button" 
                className="clear-history-btn"
                onClick={() => setSearchHistory([])}
              >
                Clear all
              </button>
            </div>
            <div className="history-chips">
              {searchHistory.map((term, index) => (
                <button 
                  key={index}
                  type="button"
                  className="history-chip"
                  onClick={() => handleSearchClick(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="search-results-section">
        <div className="results-header">
          <h2 className="results-title">
            {searchSubmitted 
              ? `Search results for "${searchSubmitted}"` 
              : "Popular Products"}
          </h2>
          {searchSubmitted && (
            <button 
              className="clear-search-btn"
              onClick={() => {
                setSearchSubmitted("");
                setSearch("");
              }}
            >
              Clear search
            </button>
          )}
          {products.length > 0 && !isLoading && (
            <span className="results-count">{products.length} products found</span>
          )}
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Searching products...</p>
          </div>
        ) : products.length === 0 && searchSubmitted ? (
          <div className="no-results">
            <div className="no-results-icon">😕</div>
            <h3>No products found for "{searchSubmitted}"</h3>
            <p>Try searching with different keywords or browse our popular products</p>
            <button 
              className="browse-all-btn"
              onClick={() => setSearchSubmitted("")}
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  )
}

export default ProductSearch;