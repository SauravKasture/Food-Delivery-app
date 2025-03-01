import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  // Access cart context
  const { addToCartHandler } = useContext(CartContext);

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items based on search query
  const filteredItems = menuItems.filter((item) =>
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

  // Add item to cart using CartContext
  const handleAddToCart = async (menuItemId) => {
    try {
      await addToCartHandler(menuItemId, 1); // Add one quantity of the item
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Error adding item to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  if (loading) return <p>Loading menu items...</p>;
  if (error) return <p className="text-danger">{error}</p>;

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
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-danger">₹{item.price}</p>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => handleAddToCart(item._id)}
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