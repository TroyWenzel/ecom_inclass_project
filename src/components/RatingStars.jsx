import React from 'react';

const RatingStars = ({ rating = 0 }) => {
  // Simple star display without external library
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
        <div style={{ 
        display: 'flex', 
        gap: '2px',
        alignItems: 'center'
        }}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
            <span key={`full-${i}`} style={{ color: '#ffd700', fontSize: '18px' }}>★</span>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
            <span style={{ color: '#ffd700', fontSize: '18px' }}>☆</span>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
            <span key={`empty-${i}`} style={{ color: '#ccc', fontSize: '18px' }}>★</span>
        ))}
        
        <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666' }}>
            ({rating})
        </span>
        </div>
    );
};

export default RatingStars;