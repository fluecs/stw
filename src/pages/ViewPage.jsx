import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import TopNav from '../subpageheader/TopNav';
import Footer from '../footer/Footer';
import '../App.css';

export default function ViewPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No place ID provided.');
      setLoading(false);
      return;
    }
    fetch(`https://seetheworld-4ojo.onrender.com/api/place/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch place');
        return res.json();
      })
      .then(data => {
        setPlace(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not load place.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  console.log(place);
  if (!place) return <div className="error-message">Place not found.</div>;

  return (
    <>
      <TopNav />
      <section className="popular" style={{marginBottom: '10rem'}}>
		<h1 className="section-title" style={{marginBottom: '0'}}>{place.title}</h1>
		<h2 className="section-subtitle">Hosted by {place.host}</h2>
        <div className="section-divider"></div>
		<div className="cover-photo">
			<img src={place.imageURL} alt={place.title}/>
		</div>
		<div className="view-place-info" style={{paddingTop: '.5rem'}}>
			<p className="view-whites">€{place.pricePerPerson}<span className="higher">99</span> Per Person</p>
			<p className="view-whites">{place.days} Days</p>
			<p className="view-whites">Rated {place.rating}/5</p>
		</div>
        <div className="section-divider"></div>
		<h2 className="section-subtitle">Description</h2>
		<div className="text-content">
			<p>{place.description}</p>
		</div>
        <div className="section-divider"></div>
		<h2 className="section-subtitle">Activities</h2>
		<div className="view-place-info">
			{place.activities.map((suite, idx) => (
				<p>{suite}</p>
			))}
		</div>
		<div className="section-divider"></div>
			<h2 className="section-subtitle">Suites</h2>
		<div className="view-place-info">
			{place.suites.map((suite, idx) => (
				<p>{suite}</p>
			))}
		</div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <Link to={`/stw/book?id=${place.id}`} style={{textDecoration: 'none'}}>
          <button className="book-now-btn">Book Now</button>
        </Link>
      </div>
      </section>
      <Footer />
    </>
  );
} 