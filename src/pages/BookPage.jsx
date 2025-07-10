import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopNav from '../subpageheader/TopNav';
import Footer from '../footer/Footer';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBuilding } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export default function BookPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [startDate, setStartDate] = useState('');
  const [suite, setSuite] = useState('');
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [place, setPlace] = useState(null);
  const [placeLoading, setPlaceLoading] = useState(true);
  const [payment, setPayment] = useState({ name: '', card: '', exp: '', cvc: '' });
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    setPlaceLoading(true);
    fetch(`https://seetheworld-4ojo.onrender.com/api/place/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlace(data);
        setPlaceLoading(false);
      })
      .catch(() => setPlaceLoading(false));
    // Set startDate to today if not already set
    if (!startDate) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      setStartDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to book.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('https://seetheworld-4ojo.onrender.com/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, startDate, suite, people })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Booking successful!');
      } else {
        setMessage(data.message || 'Booking failed.');
      }
    } catch (err) {
      setMessage('Network error.');
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <>
        <TopNav />
        <section className="popular view-main-card" style={{marginBottom: '0rem', marginTop: '2rem', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <h2 style={{color: '#266d9d', textAlign: 'center'}}>You must be signed in to book a stay.</h2>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNav />
      <section className="popular view-main-card book-page-flex">
        <div className="place">
          {placeLoading ? (
            <div className="loading">Loading preview...</div>
          ) : place ? (
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
          ) : (
            <div className="error-message">Place not found.</div>
          )}
        </div>
        <div className="book-form-col">
          <h2 className="section-title">Booking & Payment</h2>
          <form onSubmit={handleSubmit} className="book-form">
            <label className="book-label">Start Date</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="book-input"
            />
            <label className="book-label">Suite Type</label>
            <select
              required
              value={suite}
              onChange={e => setSuite(e.target.value)}
              className="book-input"
            >
              <option value="" disabled>Select a suite</option>
              {place && place.suites && place.suites.map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>
            <label className="book-label">Number of People</label>
            <input
              type="number"
              min="1"
              required
              value={people}
              onChange={e => setPeople(Number(e.target.value))}
              className="book-input"
            />
            <div className="book-label" style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>
              Total: <b>€{Math.round(people * (place ? place.pricePerPerson + 0.99 : 0) * 100) / 100}</b>
            </div>
            <label className="book-label">Payment Information</label>
            <input
              type="text"
              placeholder="Name on Card"
              value={payment.name}
              onChange={e => setPayment({...payment, name: e.target.value})}
              className="book-input"
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              value={payment.card}
              onChange={e => setPayment({...payment, card: e.target.value})}
              className="book-input"
              required
            />
            <div className="book-row">
              <input
                type="text"
                placeholder="MM/YY"
                value={payment.exp}
                onChange={e => setPayment({...payment, exp: e.target.value})}
                className="book-input"
                required
              />
              <input
                type="text"
                placeholder="CVC"
                value={payment.cvc}
                onChange={e => setPayment({...payment, cvc: e.target.value})}
                className="book-input"
                required
              />
            </div>
            <button className="book-now-btn" type="submit" disabled={loading}>{loading ? 'Booking...' : 'Book Now'}</button>
          </form>
          {message && <div className={`book-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
        </div>
      </section>
      <Footer />
    </>
  );
} 