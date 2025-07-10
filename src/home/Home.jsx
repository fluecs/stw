import '../App.css';

import TopNav from "../header/TopNav";
import Hero from "../hero/Hero";
import Popular from "../popular/Popular";
import Activities from "../activities/Activities";
import Contact from "../contact/Contact";
import Footer from "../footer/Footer";

export default function Home() {
  return (
    <>
    <TopNav />
      <Hero />
	    <Popular />
	    <Activities />
	    <Contact />    
	    <Footer />    
    </>
  )
}