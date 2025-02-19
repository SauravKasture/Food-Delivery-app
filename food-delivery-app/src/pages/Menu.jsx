import React, { useState } from "react";
import Foodcard from "../components/Foodcard";

const foodItems = [
  // 🥦 Vegetarian
  { id: 1, name: "Paneer Butter Masala", category: "Vegetarian", price: 250, img: "https://imgs.search.brave.com/zokFzOhSiCrW4U9-fYm4dNn-q3dopKq9rigZf63SGOg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzY0Lzc3Lzgw/LzM2MF9GXzc2NDc3/ODA3M19TVzNtM1Q3/OTQ0WUtySmtTOVFW/TkxPTmYxUWxzc2Jp/Mi5qcGc" },
  { id: 2, name: "Chole Bhature", category: "Vegetarian", price: 150, img: "https://imgs.search.brave.com/nDz8DpbkxmQN784MB-5eQUTtVPYdStyETsi1E3zzVFQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzIzLzAyLzU4/LzM2MF9GXzkyMzAy/NTg5Ml9GS0hXM2Fm/dG9jckVmOU9Id0Fx/SjJTdTlrb1JwMWV5/cS5qcGc" },
  { id: 3, name: "Dal Tadka", category: "Vegetarian", price: 180, img: "https://imgs.search.brave.com/4MR6EP1PAfSJ6f9iP3eIz-_usRJMN6og7i9oNy4wi-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9kYWwtdGFka2Et/cGhvdG8td2l0aC1t/dXN0YXJkLXNlZWQt/Y3JhY2tsZV8xMDM2/OTk4LTMyODg4Ny5q/cGc_c2VtdD1haXNf/aHlicmlk" },

  // 🍗 Non-Vegetarian
  { id: 4, name: "Chicken Biryani", category: "Non-Vegetarian", price: 350, img: "https://imgs.search.brave.com/adfDVS0lfcbZkrU3qUd3lefQvizEFZVyDGXEn5Sph6M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTEy/NjUyOTI0My9waG90/by9jaGlja2VuLWJp/cnlhbmktYS1kaXNo/LWF0LWluZGlhbi1r/aXRjaGVuLWF0LXlh/dS1tYS10ZWktMjRv/Y3QxNC0wNm5vdmVt/YmVyMjAxNC1sZWFk/LWZlYXR1cmUtMy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/Q2FKNXpPRW9acXhW/RlJaZmsyZ25oMGcx/bDQyNEJ1enBRZzdp/bkF5RGN0TT0" },
  { id: 5, name: "Mutton Rogan Josh", category: "Non-Vegetarian", price: 450, img: "https://imgs.search.brave.com/ntXb1tbbI2jkDZZWWHoX1PN5CwQ3B2QFHvb8eHXeP3o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/bXV0dG9uLXJvZ2Fu/LWpvc2gtdjAtNXN5/azFoc2wwejFkMS5q/cGc_d2lkdGg9NjQw/JmNyb3A9c21hcnQm/YXV0bz13ZWJwJnM9/NDRiOWY4OGExODgz/M2ZhY2Q3ZWRkYWM3/ZjE2OWNlOTdjZjQw/NmUzZQ" },
  { id: 6, name: "Fish Curry", category: "Non-Vegetarian", price: 300, img: "https://imgs.search.brave.com/tAweLdszcZqs-wDIGpTIe0q9zzuMy_hK6_g6BvbKOJE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jaHVjaGktbWFj/a2VyZWwtY3Vycnkt/ZnJpZWQtZmlzaC1z/dHlsZS10aGFpLWZv/b2RfNDI5NDItNTU3/LmpwZz9zZW10PWFp/c19oeWJyaWQ" },

  // 🍰 Indian Sweets
  { id: 7, name: "Gulab Jamun", category: "Indian Sweets", price: 80, img: "https://imgs.search.brave.com/PEk88bsmh8CMIYOfar5-gkj9tLB78kaXbGbOG8wg9gg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTIx/MzY4MDEzL3Bob3Rv/L2d1bGFiLWphbXVu/LTEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUNETldoMHk0/VVozbHdxMl9nUDNy/U2RQSzNaSF9EUnJi/QVdxc3F0TFQ4MFk9" },
  { id: 8, name: "Rasgulla", category: "Indian Sweets", price: 90, img: "https://imgs.search.brave.com/LL5bzIoMOGiCKvQMIv6xCSYGRRSvvwjquWw1n8fOvV4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzc5LzcxLzAx/LzM2MF9GXzEwNzk3/MTAxOTJfeU9kNUlu/eU1OTlE5ZlJDQ0F5/TXY0YW9GT3AweWhx/dDMuanBn" },
  { id: 9, name: "Kaju Katli", category: "Indian Sweets", price: 250, img: "https://imgs.search.brave.com/5ngbKpC7jcf_Dsfz_dO92knPymZKQKEIoQzu8VJpcls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzI0Lzg0LzIz/LzM2MF9GXzkyNDg0/MjM4MF9PeFVsNlhn/YkdOdHZRTnc5ak1G/TjRna1BqYjFyQUV1/VC5qcGc" },

  // 🥤 Drinks
  { id: 10, name: "Masala Chai", category: "Drinks", price: 40, img: "https://imgs.search.brave.com/yPRuJhOjnesHOIvPIwM-CA7EPuXAXEgiOZzFHKBbZMA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tYXNhbGEtY2hh/aS10ZWEtaG90LWlu/ZGlhbi1iZXZlcmFn/ZS13aXRoLXNwaWNl/c18xMTg2MzEtMjQ4/MC5qcGc_c2VtdD1h/aXNfaHlicmlk" },
  { id: 11, name: "Mango Lassi", category: "Drinks", price: 60, img: "https://t3.ftcdn.net/jpg/04/81/63/02/240_F_481630267_WccN0GoEqqFyDGbNIMvOynrHfbSRbiTE.jpg" },
  { id: 12, name: "Cold Coffee", category: "Drinks", price: 120, img: "https://imgs.search.brave.com/K_JF98Rh1jHyTsen9Ciyn0haa3GBLxYkRW3zv7zOpjw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzU5Lzg3LzY1/LzM2MF9GXzk1OTg3/NjU0MF9ZWjBvdkFS/allZWFg1Z3MwMGF0/NFd0SXl5SjkxTFh1/aS5qcGc" },
];

// Pagination settings
const itemsPerPage = 4;

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter food items by category
  const filteredItems = selectedCategory === "All"
    ? foodItems
    : foodItems.filter(item => item.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Explore Our Menu 🍽️</h2>

      {/* Category Filter */}
      <div className="text-center mb-3">
        {["All", "Vegetarian", "Non-Vegetarian", "Indian Sweets", "Drinks"].map(category => (
          <button key={category} className={`btn mx-2 ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"}`} onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}>
            {category}
          </button>
        ))}
      </div>

      {/* Food Items Display */}
      <div className="d-flex flex-wrap justify-content-center">
        {displayedItems.map(item => (
          <Foodcard key={item.id} name={item.name} price={item.price} img={item.img} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-outline-secondary mx-1" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>⬅️ Prev</button>
        <span className="px-3">Page {currentPage} of {totalPages}</span>
        <button className="btn btn-outline-secondary mx-1" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next ➡️</button>
      </div>
    </div>
  );
};

export default Menu;
