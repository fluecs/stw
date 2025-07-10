import './App.css'
import TopNav from "./header/TopNav";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./home/Home";
import Locations from "./location/Locations";
import ActivitiesPage from "./pages/ActivitiesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewPage from "./pages/ViewPage";
import BookPage from "./pages/BookPage";
import ActPage from "./pages/ActPage";
import BookingsPage from "./pages/BookingsPage";
import Team from "./team/Team";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger shortcuts if not typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Alt+1 - Homepage
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        console.log('Alt+1 pressed - navigating to home');
        navigate('/');
      }
      
      // Alt+2 - Destinations
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        console.log('Alt+2 pressed - navigating to destinations');
        navigate('/locations');
      }
      
      // Alt+3 - Activities
      if (e.altKey && e.key === '3') {
        e.preventDefault();
        console.log('Alt+3 pressed - navigating to activities');
        navigate('/activities');
      }
      
      // Alt+4 - Bookings (only if logged in)
      if (e.altKey && e.key === '4') {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Alt+4 pressed - navigating to bookings');
          navigate('/bookings');
        } else {
          console.log('Alt+4 pressed but user not logged in');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  
  return (
    <AuthProvider>
      <div className="app-root">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/locations" element={ <Locations />} />
          <Route path="/activities" element={ <ActivitiesPage />} />
          <Route path="/login" element={ <LoginPage />} />
          <Route path="/register" element={ <RegisterPage />} />
          <Route path="/view" element={ <ViewPage /> } />
          <Route path="/book" element={ <BookPage /> } />
          <Route path="/act" element={ <ActPage /> } />
          <Route path="/bookings" element={ <BookingsPage /> } />
          <Route path="/team" element={ <Team /> } />
        </Routes>
      </div>
    </AuthProvider>
  )
}
