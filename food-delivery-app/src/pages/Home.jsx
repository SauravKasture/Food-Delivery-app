import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center text-white py-5" style={{ 
        background: "linear-gradient(to right, #ff6a00, #ee0979)", 
        minHeight: "60vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div>
          <h1 className="fw-bold display-4">🍕 Hungry? Order Now! 🍔</h1>
          <p className="lead">Delicious food delivered hot & fresh to your doorstep. 🍽️</p>
          <Link to="/menu" className="btn btn-danger btn-lg mt-3">Explore Menu</Link>
        </div>
      </section>

      {/* Food Categories */}
      <section className="container my-5 text-center">
        <h2 className="fw-bold">🍽️ Browse By Category</h2>
        <p>Find your favorite meals easily!</p>
        <div className="row">
          {[
            { name: "Vegetarian", img: "https://imgs.search.brave.com/Ta8JJCtD5Yq7nWvN0vw7DoeIysbRlq7GR_V6BpioBXc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9vZGFuZHdpbmUu/Y29tL3RobWIvM0lu/ajdHUnZuejM1Ukxr/U2ZVSXJLSXJXM1VF/PS8xNTAweDAvZmls/dGVyczpub191cHNj/YWxlKCk6bWF4X2J5/dGVzKDE1MDAwMCk6/c3RyaXBfaWNjKCkv/dGFka2EtZGFsLXdp/dGgtcm90aS1GVC1S/RUNJUEUwMTIxLTg1/NDNhNDg2NGI0NTRk/ZmFiMmY4Y2RjNWI3/MmM3YzVmLmpwZw" },
            { name: "Non-Vegetarian", img: "https://imgs.search.brave.com/HS3pnbZs1eMEtHBVgaNz1kYjH_dp_KQD_Co-eLpXs5k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLm5k/dHZpbWcuY29tL2kv/MjAxOC0wMS9mcmll/ZC1jaGlja2VuXzY5/Nng0MDBfNTE1MTQ4/Nzc5MTkuanBn" },
            { name: "Indian Sweets", img: "https://imgs.search.brave.com/JSYEeJpEHZGH9GbuiRaM-4EHyhz9peOuotwDhEY674A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzc1LzEx/L2MxLzc1MTFjMWU0/NDljYmYzZjc3NzEw/OTZlYzdjMmYzNTkz/LmpwZw" },
            { name: "Drinks", img: "https://imgs.search.brave.com/Y9D2lCfSZNbhS7EVEjtsiqPUhKn53fUomXgEHAsXJds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzgzLzQzLzM1/LzM2MF9GXzgzNDMz/NTk0XzB4bzBNNHI4/V1BKRnFWa3RGVXU3/dWJrbjgzMXQ0a3B1/LmpwZw" }
          ].map((category, index) => (
            <div key={index} className="col-md-3 d-flex">
              <div className="card shadow-sm w-100" style={{ height: "100%" }}>
                <img 
                  src={category.img} 
                  className="card-img-top" 
                  alt={category.name} 
                  style={{ height: "200px", objectFit: "cover" }} // Fixes uneven card sizes
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{category.name}</h5>
                  <Link to="/menu" className="btn btn-outline-danger mt-auto">Explore</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold">🔥 Special Offers</h2>
          <p>Don't miss out on our best deals!</p>
          <div className="row">
            {[
              { name: "Family Feast", price: "₹499", img: "https://images.unsplash.com/photo-1595650248893-df56f2066e04?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Party Platter", price: "₹899", img: "https://images.unsplash.com/photo-1519691548119-14735e4a11c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Dessert Combo", price: "₹349", img: "https://plus.unsplash.com/premium_photo-1664392008694-9533ca88aada?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGVzc2VydCUyMENvbWJvfGVufDB8fDB8fHww" }
            ].map((offer, index) => (
              <div key={index} className="col-md-4 d-flex">
                <div className="card shadow-sm w-100" style={{ height: "100%" }}>
                  <img 
                    src={offer.img} 
                    className="card-img-top" 
                    alt={offer.name} 
                    style={{ height: "200px", objectFit: "cover" }} // Fixes image scaling
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{offer.name}</h5>
                    <p className="text-danger fw-bold">{offer.price}</p>
                    <button className="btn btn-danger mt-auto">Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta-section text-center text-white py-5" style={{
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      }}>
        <h2 className="fw-bold">🚀 Order Your Favorite Meal Now!</h2>
        <p>Get delicious food delivered to your doorstep with just one click.</p>
        <Link to="/menu" className="btn btn-light btn-lg">Browse Menu</Link>
      </section>
    </div>
  );
};

export default Home;
