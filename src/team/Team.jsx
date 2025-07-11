import React, { useState } from 'react';
import './team.css';
import TopNav from '../subpageheader/TopNav';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';

const team = [
  {
    name: 'Ilia Videv',
    position: 'Chief Executive Officer',
    email: 'iv@seetheworld.com',
    phone: '+359 88 647 3921',
    image: 'ilia.jpg'
  },
  {
    name: 'Martin Tomov',
    position: 'Chief Operating Officer',
    email: 'mt@seetheworld.com',
    phone: '+359 98 205 7834',
    image: 'tomov.jpg'
  },
  {
    name: 'Martin Kolev',
    position: 'Chief Designer',
    email: 'mk@seetheworld.com',
    phone: '+359 88 931 4756',
    image: 'kolev.jpg'
  },
  {
    name: 'Yoana Yordanova',
    position: 'Chief Marketing Officer',
    email: 'yy@seetheworld.com',
    phone: '+359 98 742 1598',
    image: 'joana.jpg'
  },
  {
    name: 'Nikolay Mihov',
    position: 'Chief Visionary',
    email: 'nm@seetheworld.com',
    phone: '+359 88 517 9043',
    image: 'niki.jpg'
  }
];

function Team() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + team.length) % team.length);
  const next = () => setIndex((index + 1) % team.length);

  const member = team[index];

  return (
    <>
        <TopNav />

    <div className="team-container">
      <h2>Meet Our Team</h2>
      <hr className="underline" />

      <div className="carousel">
        <button onClick={prev} className="arrow-btn">←</button>

        <div className="profile">
          <img src={member.image} alt={member.name} className="profile-pic" />
          <h3>{member.name}</h3>
          <p>Position: {member.position}</p>
          <p>Email: <Link to={`mailto:${member.email}`}>{member.email}</Link></p>
          <p>Phone: <Link to={`tel:${member.phone}`}>{member.phone}</Link></p>
        </div>

        <button onClick={next} className="arrow-btn">→</button>
      </div>
    </div>

      <Footer />
    </>
  );
}

export default Team;
