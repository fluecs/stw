import '../App.css';

import TopNav from "../subpageheader/TopNav";
import Hero from "../hero/Hero";
import Popular from "../popular/Popular";
import Activities from "../activities/Activities";
import Contact from "../contact/Contact";
import Footer from "../footer/Footer";
import AllDest from '../alldestinations/AllDest';

export default function Locations() {
  return (
    <>
    <TopNav />   
	<AllDest /> 
	<Footer />
    </>
  )
}