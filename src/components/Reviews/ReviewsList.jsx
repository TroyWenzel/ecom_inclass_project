import React from 'react';
import './ReviewsList.css';
import RatingStars from '../RatingStars';

const ReviewsList = ({ reviews }) => {
  // Handle case where reviews might not exist or be empty
    if (!reviews || reviews.length === 0) {
        return (
        <div className="reviews-section">
            <h3 className="reviews-title">Customer Reviews</h3>
            <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
        </div>
        );
    }

    return (
        <div className="reviews-section">
        <h3 className="reviews-title">Customer Reviews ({reviews.length})</h3>
        <div className="reviews-list">
            {reviews.map((review, index) => (
            <div key={index} className="review-card">
                <div className="review-header">
                <div className="reviewer-info">
                    <span className="reviewer-name">{review.reviewerName}</span>
                    <span className="reviewer-email">{review.reviewerEmail}</span>
                </div>
                <div className="review-rating">
                    <RatingStars rating={review.rating} />
                </div>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">
                {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
                </span>
            </div>
            ))}
        </div>
        </div>
    );
};

export default ReviewsList;