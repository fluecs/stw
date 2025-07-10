import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TopNav from '../subpageheader/TopNav';
import Footer from '../footer/Footer';
import '../App.css';

export default function BookingsPage() {
  const { fetchBookings } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      const result = await fetchBookings();
      
      if (result.success) {
        // Process bookings with the place data already included
        const processedBookings = result.bookings.map(booking => {
          const startDate = new Date(booking.startDate);
          const endDate = new Date(startDate);
          // Assuming place.days exists, if not we'll need to fetch it
          const days = booking.place?.days || 1;
          endDate.setDate(startDate.getDate() + days);
          
          return {
            ...booking,
            startDateFormatted: startDate.toLocaleDateString(),
            endDateFormatted: endDate.toLocaleDateString(),
            totalPrice: booking.people * (booking.place?.pricePerPerson + 0.99 || 0)
          };
        });
        setBookings(processedBookings);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    loadBookings();
  }, [fetchBookings]);

  return (
    <>
      <TopNav />
      <section className="popular">
        <h1 className="section-title">My Bookings</h1>
        <div className="section-divider"></div>
        {loading ? (
          <div className="loading">Loading bookings...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : bookings.length === 0 ? (
          <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>No bookings found.</div>
        ) : (
          <div className="locations">
            {bookings.map((booking, idx) => (
              <div className="place" key={booking.id || idx} style={{cursor: 'default'}}>
                <div>
                  <div className="place-top">
                    <img src={booking.place?.imageURL} alt={booking.place?.title} />
                  </div>
                  <p className="title">{booking.place?.title || 'Unknown Place'}</p>
                  <div style={{margin: '1.75rem', marginTop: '1rem'}}>
                    <p style={{margin: '0.5rem 0', color: '#666'}}>
                      📅 {booking.startDateFormatted} - {booking.endDateFormatted}
                    </p>
                    <p style={{margin: '0.5rem 0', color: '#666'}}>
                      👥 {booking.people} people
                    </p>
                    <p style={{margin: '0.5rem 0', color: '#666'}}>
                      🏠 {booking.suite}
                    </p>
                    <p style={{margin: '0.5rem 0', color: '#666'}}>
                      💰 €{booking.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
} 