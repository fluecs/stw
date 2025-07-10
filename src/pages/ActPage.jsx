import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopNav from '../subpageheader/TopNav';
import Footer from '../footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBuilding } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import { Link } from "react-router-dom";

export default function ActPage() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');
	const [places, setPlaces] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!id) return;
		setLoading(true);
		fetch(`https://seetheworld-4ojo.onrender.com/api/act/${id}/places`)
			.then(res => {
				if (!res.ok) throw new Error('Failed to fetch places');
				return res.json();
			})
			.then(data => {
				setPlaces(data || []);
				setLoading(false);
			})
			.catch(() => {
				setError('Could not load places.');
				setLoading(false);
			});
	}, [id]);

	console.log(places)

	return (
		<>
			<TopNav />
			<section className="popular">
				<h1 className="section-title">Activity Places</h1>
				<div className="section-divider"></div>
				{loading ? (
					<div className="loading">Loading...</div>
				) : error ? (
					<div className="error-message">{error}</div>
				) : (
					<div className="locations">
						{places.map((place, idx) => (
							console.log(place)
						))}
						{places.map((place, idx) => (
							<Link to={`/stw/view?id=${place.id}`}>
								<div className="place" key={place.id || idx}>
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
											<FontAwesomeIcon icon={faCalendar} /> {place.days} days &middot;{' '}
											<FontAwesomeIcon icon={faBuilding} /> {place.host}
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</section>
			<Footer />
		</>
	);
} 