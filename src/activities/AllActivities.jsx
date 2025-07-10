import React, { useEffect, useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faBuilding,
  faArrowRight,
  faFire
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function AllActivities() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://seetheworld-4ojo.onrender.com/api/act/list")
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
    <section id="activities" class="popular">
      <div class="glass-blur"></div>
      <h1 class="section-title">Activities</h1>
      <div class="section-divider"></div>
      <div class="locations infinite-scroll">
        {places.map((place, idx) => (
          <Link
            className="place place-large"
            to={`/stw/act?id=${place.id}`}
            key={place.id || idx}
          >
            <div>
              <div class="place-full">
                <img src={place.img} />
              </div>
              <div class="place-cover"></div>
              <p class="title2">{place.name}</p>
						  {place.top ? <span class="rating"><FontAwesomeIcon icon={faFire} /><p> Popular</p></span> : ""}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
