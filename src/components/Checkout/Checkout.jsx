import React, { useState } from 'react'
import { useCart } from "../../contexts/CartContext.jsx";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, total, clearCart } = useCart()
  
  // Calculate totalsrm -rf node_modules
  const subtotal = total
  const shippingCost = subtotal > 50 ? 0 : 5.99 // Free shipping over $50
  const taxRate = 0.08 // 8% tax
  const taxAmount = subtotal * taxRate
  const grandTotal = subtotal + shippingCost + taxAmount
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    
    // Process order (in real app, this would be an API call)
    toast.success(`Order submitted successfully! Total: $${grandTotal.toFixed(2)}. Thank you for your purchase!`)
    console.log('Order details:', { ...formData, orderItems: cartItems, subtotal, shippingCost, taxAmount, grandTotal })
    
    // Clear cart after successful order
    clearCart()
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    })
    
    // Navigate to home page after short delay
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out</p>
          <button 
            onClick={() => navigate('/')}
            className="place-order-btn"
            style={{ maxWidth: '300px', margin: '0 auto' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Street Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main Street"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                required
              />
            </div>
            
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="NY"
                required
              />
            </div>
            
            <div className="form-group">
              <label>ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="10001"
                maxLength="5"
                required
              />
            </div>
          </div>
          
          <h2>Payment Information</h2>
          
          <div className="form-group">
            <label>Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date *</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            
            <div className="form-group">
              <label>CVV *</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="place-order-btn">
            Proceed with Payment - ${grandTotal.toFixed(2)}
          </button>
        </form>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-info">
                  <img src={item.thumbnail} alt={item.title} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Qty: {item.quantity} × ${item.price}</p>
                  </div>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="total-row">
              <span>Tax (8%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout