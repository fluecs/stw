import React, { useState, useEffect } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    icon: "✈️",
    title: "500+ Destinations",
    desc: "Worldwide coverage with trusted partners for every journey",
  },
  {
    icon: "👥",
    title: "100,000+ Happy Travelers",
    desc: "Join a growing community of satisfied explorers",
  },
  {
    icon: "⭐",
    title: "4.9 Average Rating",
    desc: "Top-rated by travelers just like you",
  },
  {
    icon: "📅",
    title: "50,000 Annual Trips",
    desc: "Helping thousands experience the world every year",
  },
  {
    icon: "💰",
    title: "Best Prices Guaranteed",
    desc: "Affordable adventures without compromising quality",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cardData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentCard = cardData[index];

  return (
    <section id="home" className="hero">
      <div className="glass-blur hero-sec"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1>Discover Your Next Adventure</h1>
          <div className="hero-goals">
            <p>
              <bold>See The World</bold> makes it easy to discover and book
              unique places to stay, exciting activities, and local experiences
              all in one place. Whether you're planning a weekend getaway or a
              dream trip, we connect you with trusted providers to create a
              smooth, personalized travel experience. Let us help you travel
              better, smarter, and with confidence.
            </p>
          </div>
          <form id="searchForm" className="hero-search-bar" onSubmit={e => {
            e.preventDefault();
            if (searchValue.trim()) {
              navigate(`/stw/locations?search=${encodeURIComponent(searchValue.trim())}`);
            }
          }}>
            <input
              type="text"
              id="searchInput"
              name="search"
              placeholder="Book a place"
              required
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <button type="submit" className="search-btn">
              {/* Placeholder for search icon */}
              <span role="img" aria-label="search">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </button>
          </form>
        </div>
        <div className="hero-image">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.title}
              className="floating-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="card-icon"
                role="img"
                aria-label="icon"
                style={{ fontSize: "3rem", marginRight: "2rem" }}
              >
                {currentCard.icon}
              </span>
              <div className="card-content">
                <div className="card-title">{currentCard.title}</div>
                <div className="card-desc">{currentCard.desc}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
