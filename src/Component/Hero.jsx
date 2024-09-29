// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import lobbyPic from "../assets/LuxStayHero.jpg";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${lobbyPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to LuxStay</h1>
          <p className="mb-5">
            Experience the best stays at LuxStay with our exclusive room
            options.
          </p>
          <Link to="/rooms">
            <button className="btn btn-primary">Explore Rooms</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
