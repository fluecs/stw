import {React, useState, useEffect} from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faBuilding,
  faArrowRight,
  faFire
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SearchAndFilterBar from "./SearchAndFilterBar";
import { useSearchParams } from "react-router-dom";

export default function AllDest() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("recommended");
  const [searchParams] = useSearchParams();

  // Set searchValue from ?search= param on mount
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchValue(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("https://seetheworld-4ojo.onrender.com/api/list")
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

  const filteredAndSortedPlaces = places
    .filter(place => place.title.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.pricePerPerson - b.pricePerPerson;
      } else if (sortOrder === "desc") {
        return b.pricePerPerson - a.pricePerPerson;
      } else if (sortOrder === "oldest") {
        return (a.id || 0) - (b.id || 0);
      } else if (sortOrder === "newest") {
        return (b.id || 0) - (a.id || 0);
      } else {
        // recommended: top=true first, then others
        if (a.top === b.top) return 0;
        if (a.top) return -1;
        if (b.top) return 1;
        return 0;
      }
    });

  return (
    <section id="destinations" className="popular">
      <h1 className="section-title">All Tourist Destinations</h1>
      <div className="section-divider"></div>
      <SearchAndFilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        sortOptions={[
          { value: "recommended", label: "Recommended" },
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
          { value: "asc", label: "Price: Ascending" },
          { value: "desc", label: "Price: Descending" }
        ]}
      />
      <div className="section-divider"></div> 

      <div className="locations">
        {filteredAndSortedPlaces.map((place, idx) => (
          <Link
            className="place"
            to={`/view?id=${place.id}`}
            key={place.id || idx}
          >
            <div>
              <div className="place-top">
                <img src={place.imageURL} alt={place.title} />
              </div>
              <p className="title">{place.title}</p>
              <p className="desc">{place.description}</p>
			  {place.top ? <span class="rating"><FontAwesomeIcon icon={faFire} /><p> Popular</p></span> : ""}
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
    </section>
  );
}
