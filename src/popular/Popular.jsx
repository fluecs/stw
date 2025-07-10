import React, { useEffect, useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faBuilding,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Popular() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://seetheworld-4ojo.onrender.com/api/list?top")
      .then((res) => res.json())
      .then((data) => {
      	setPlaces(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch places", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="destinations" className="popular">
      <h1 className="section-title">Popular Destinations</h1>
      <div className="section-divider"></div>
      <div className="locations">
        {places.map((place, idx) => (
          <Link className="place" to={`/view?id=${place.id}`} key={place.id || idx}>
            <div>
              <div className="place-top">
                <img src={place.imageURL} alt={place.title} />
              </div>
              <p className="title">{place.title}</p>
              <p className="desc">{place.description}</p>
              <span className="price">
                From €{place.pricePerPerson}
                <span className="higher">99</span>
              </span>
              <span className="info">
                <FontAwesomeIcon icon={faCalendar} /> {place.days} days ⋅{" "}
                <FontAwesomeIcon icon={faBuilding} /> {place.host}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="section-divider"></div>
      <div className="see-more-holder">
        <Link className="see-more" to="/locations">
          See More Locations&nbsp;&nbsp;
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </section>
  );
}
