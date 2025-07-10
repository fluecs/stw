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
import Team from "./team/Team";

export default function App() {
  return (
    <AuthProvider>
      <div className="app-root">
        <Routes>
          <Route path="/stw/" element={ <Home /> } />
          <Route path="/stw/locations" element={ <Locations />} />
          <Route path="/stw/activities" element={ <ActivitiesPage />} />
          <Route path="/stw/login" element={ <LoginPage />} />
          <Route path="/stw/register" element={ <RegisterPage />} />
          <Route path="/stw/view" element={ <ViewPage /> } />
          <Route path="/stw/book" element={ <BookPage /> } />
          <Route path="/stw/act" element={ <ActPage /> } />
          <Route path="/stw/bookings" element={ <BookingsPage /> } />
          <Route path="/stw/team" element={ <Team /> } />
        </Routes>
      </div>
    </AuthProvider>
  )
}