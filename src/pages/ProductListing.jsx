import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/ProductListing.css";

const ProductListing = () => {
  const navigate = useNavigate();
  
  const restaurants = [
    {
      id: 1,
      name: "Lazy Bear",
      cuisine: "Cakes, Pastry, Pasta",
      location: "Connaught Place, New Delhi",
      rating: 9.5,
      reviewCount: "2k+",
      distance: "2.5 km",
      deliveryTime: "15-20 min",
      price: "₹150 for one",
      image: "https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Cafe Coffee Day",
      cuisine: "Coffee, Sandwiches, Desserts",
      location: "Rajouri Garden, New Delhi",
      rating: 8.9,
      reviewCount: "1.5k+",
      distance: "3.2 km",
      deliveryTime: "20-25 min",
      price: "₹200 for one",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Pizza Hut",
      cuisine: "Pizza, Pasta, Beverages",
      location: "South Extension, New Delhi",
      rating: 9.2,
      reviewCount: "3k+",
      distance: "4.1 km",
      deliveryTime: "25-30 min",
      price: "₹250 for one",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w-400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Burger King",
      cuisine: "Burgers, Fries, Shakes",
      location: "Hauz Khas, New Delhi",
      rating: 8.7,
      reviewCount: "1.8k+",
      distance: "1.8 km",
      deliveryTime: "10-15 min",
      price: "₹180 for one",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="product-listing-container">
      {/* Header */}
      <div className="product-header">
        <div className="header-left">
          <h1 className="user-name">Karan</h1>
          <p className="welcome-text">Let's explore this evening</p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Category Section */}
      <div className="category-section">
        <h2 className="section-title">Your taste</h2>
        <div className="category-tag">
          <span className="tag-icon">🥬</span>
          <span className="tag-text">VEGGIE FRIENDLY LATENESS</span>
        </div>
      </div>

      <div className="divider"></div>

      {/* Popular Restaurants Section */}
      <div className="restaurants-section">
        <h2 className="section-title">Popular Ones</h2>
        <div className="restaurants-list">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-image-container">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="restaurant-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300/cccccc/969696?text=Restaurant+Image";
                  }}
                />
                <div className="rating-badge">
                  <span className="rating-star">★</span>
                  <span className="rating-value">{restaurant.rating}</span>
                </div>
              </div>
              
              <div className="restaurant-details">
                <div className="restaurant-header">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <span className="delivery-time">{restaurant.deliveryTime}</span>
                </div>
                
                <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                <p className="restaurant-location">{restaurant.location}</p>
                
                <div className="restaurant-footer">
                  <div className="restaurant-stats">
                    <span className="review-count">{restaurant.reviewCount} reviews</span>
                    <span className="distance">{restaurant.distance}</span>
                  </div>
                  <div className="restaurant-price">
                    {restaurant.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;