// pages/Menu.jsx
import React, { useState } from "react";

const Menu = ({ cartItems, setCartItems }) => {
  // Simulated menu items with images
  const allMenuItems = [
    {
      id: 1,
      name: "Pizza",
      price: 250,
      image: "https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=",
    },
    {
      id: 2,
      name: "Burger",
      price: 150,
      image: "https://imgs.search.brave.com/HaBaP_R8vsp8JC2SPNYx5sYlBskY7KKR6cFTCQklFoc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzYxLzc4LzY5/LzM2MF9GXzU2MTc4/Njk1MV9JZFFidFIw/YmdhM1J6SVNnb2RH/dklSTUZFQnFtamZj/bi5qcGc",
    },
    {
      id: 3,
      name: "Pasta",
      price: 200,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UGFzdGF8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "Sushi",
      price: 300,
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3VzaGl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "Salad",
      price: 100,
      image: "https://via.placeholder.com/150?text=Salad",
    },
    {
      id: 6,
      name: "Sandwich",
      price: 120,
      image: "https://via.placeholder.com/150?text=Sandwich",
    },
    {
      id: 7,
      name: "Steak",
      price: 400,
      image: "https://via.placeholder.com/150?text=Steak",
    },
    {
      id: 8,
      name: "Taco",
      price: 180,
      image: "https://via.placeholder.com/150?text=Taco",
    },
    {
      id: 9,
      name: "Fries",
      price: 80,
      image: "https://via.placeholder.com/150?text=Fries",
    },
    {
      id: 10,
      name: "Ice Cream",
      price: 50,
      image: "https://via.placeholder.com/150?text=Ice+Cream",
    },
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  // Filter items based on search query
  const filteredItems = allMenuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Increase quantity if item already exists in cart
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Add new item to cart
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Our Menu 🍕</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Menu Items */}
      <div className="row">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={item.image} // Use the image URL or imported image
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    width: "100%", // Ensure full width of the card
                    height: "250px", // Fixed height for consistency
                    objectFit: "cover", // Crop images to fit without distortion
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-danger">₹{item.price}</p>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No items found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mt-2">
          Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
        </span>
        <button
          className="btn btn-secondary ms-2"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Menu;