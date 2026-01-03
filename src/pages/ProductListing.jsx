import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../style/ProductListing.css";
import { getUserName } from "../utils/auth"; 

const ProductListing = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserNameState] = useState("Karan");

  useEffect(() => {
    const storedUserName = getUserName();
    if (storedUserName) {
      setUserNameState(storedUserName);
    }
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await api.get("/m/restaurant?city_id=118&&");
      
      if (response.data.status === "Success" && response.data.data?.results) {
        setRestaurants(response.data.data.results);
      } else {
        setError("Failed to load restaurants");
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to load restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const formatAddress = (address) => {
    if (!address || address === "null") return "Address not available";
    
    const parts = address;
    return parts || address;
  };

  const getMockRestaurantDetails = (id) => {
    const ratings = [4.2, 4.5, 4.0, 4.8, 3.9, 4.6];
    const deliveryTimes = ["15-20 min", "20-25 min", "25-30 min", "10-15 min", "30-35 min", "35-40 min"];
    const distances = ["1.2 km", "2.5 km", "3.8 km", "0.8 km", "4.2 km", "5.0 km"];
    const cuisines = [
      "Multi-cuisine, Fast Food", 
      "North Indian, Chinese", 
      "Italian, Continental",
      "South Indian, Street Food",
      "Bakery, Desserts",
      "Cafe, Beverages"
    ];
    const prices = ["₹200 for one", "₹350 for one", "₹450 for one", "₹150 for one", "₹500 for one", "₹180 for one"];
    
    const index = id % 6;
    
    return {
      rating: ratings[index],
      deliveryTime: deliveryTimes[index],
      distance: distances[index],
      cuisine: cuisines[index],
      price: prices[index],
      reviewCount: `${Math.floor(Math.random() * 10) + 1}k+ reviews`
    };
  };

  if (loading) {
    return (
      <div className="product-listing-container">
        <div className="loading-spinner">Loading restaurants...</div>
      </div>
    );
  }

  return (
    <div className="product-listing-container">
      <div className="product-header">
        <div className="header-left">
          <h1 className="user-name">{userName}</h1>
          <p className="welcome-text">Let's explore this evening</p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="category-section">
        <h2 className="section-title">Your taste</h2>
        <div className="category-tag">
          <span className="tag-icon">🥬</span>
          <span className="tag-text">VEGGIE FRIENDLY LATENESS</span>
        </div>
      </div>

      <div className="divider"></div>

      <div className="restaurants-section">
        <h2 className="section-title">Popular Ones</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="restaurants-list">
          {restaurants.map((restaurant) => {
            const details = getMockRestaurantDetails(restaurant.restaurant_id);
            
            return (
              <div key={restaurant.restaurant_id} className="restaurant-card">
                <div className="restaurant-image-container">
                  <img 
                    src={restaurant.logo || "/assets/product-default.png"} 
                    alt={restaurant.restaurant_name}
                    className="restaurant-image"
                    onError={(e) => {
                      e.target.src = "https://kints.co.in/twenty-nineteen/img/defaults/product-default.png";
                    }}
                  />
                  <div className="rating-badge">
                    <span className="rating-star">★</span>
                    <span className="rating-value">{details.rating}</span>
                  </div>
                </div>
                
                <div className="restaurant-details">
                  <div className="restaurant-header">
                    <h3 className="restaurant-name">{restaurant.restaurant_name}</h3>
                    <span className="delivery-time">{details.deliveryTime}</span>
                  </div>
                  
                  <p className="restaurant-cuisine">{details.cuisine}</p>
                  <p className="restaurant-location">{formatAddress(restaurant?.address_complete)}</p>
                  
                  <div className="restaurant-footer">
                    <div className="restaurant-stats">
                      <span className="review-count">{details.reviewCount}</span>
                      <span className="distance">{details.distance}</span>
                    </div>
                    <div className="restaurant-price">
                      {details.price}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;