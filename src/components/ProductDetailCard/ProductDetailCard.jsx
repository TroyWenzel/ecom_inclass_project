import React from 'react';
import './ProductDetailCard.css';
import AddToCart from '../AddToCart/AddToCart';
import RatingStars from '../RatingStars';
import ReviewsList from '../Reviews/ReviewsList';
import FavoriteButton from '../Favorites/FavoritesButton/FavoriteButton';

const ProductDetailCard = ({ product }) => {
  // Make sure the product object exists before trying to access its properties
    if (!product || Object.keys(product).length === 0) {
        return <div>No product data available</div>;
    }

    return (
        <>
            <div className="product-detail-card">
                <div className="product-image-container">
                    <img src={product.thumbnail} alt={product.title} className="product-image" />
                    <div className="product-detail-favorite">
                        <FavoriteButton product={product} size="large" />
                    </div>
                </div>
                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-meta">
                        <span className="product-price">${product.price}</span>
                        <span className="product-discount">{product.discountPercentage}% off</span>
                        <span className="product-rating">
                            <RatingStars rating={product.rating} />
                        </span>
                        <span className="product-stock">{product.stock} in stock</span>
                    </div>
                    
                    <div className="product-brand-category">
                        <span className="product-brand">Brand: {product.brand}</span>
                        <span className="product-category">Category: {product.category}</span>
                    </div>
                    
                    <div className="product-actions" style={{ marginTop: '2rem' }}>
                        <AddToCart product={product} />
                    </div>
                </div>
            </div>
            
            {/* Reviews Section */}
            <ReviewsList reviews={product.reviews} />
        </>
    );
};

export default ProductDetailCard;