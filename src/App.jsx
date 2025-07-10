import './App.css'
import TopNav from "./header/TopNav";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Locations from "./location/Locations";
import ActivitiesPage from "./pages/ActivitiesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewPage from "./pages/ViewPage";
import BookPage from "./pages/BookPage";
import ActPage from "./pages/ActPage";
import BookingsPage from "./pages/BookingsPage";

export default function App() {
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
          <Route path="/team" element={ <BookingsPage /> } />
        </Routes>
      </div>
    </AuthProvider>
  )
}