import React, { useState } from 'react';
import './Team.css';
import TopNav from '../subpageheader/TopNav';

const team = [
  {
    name: 'Ilia Videv',
    position: 'Chief Executive Officer',
    email: 'iv@seetheworld.com',
    phone: '+123456780',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Martin Tomov',
    position: 'Chief Operating Officer',
    email: 'mt@seetheworld.com',
    phone: '+123456789',
    image: 'https://randomuser.me/api/portraits/men/65.jpg'
  },
  {
    name: 'Martin Kolev',
    position: 'Chief Designer',
    email: 'mk@seetheworld.com',
    phone: '+123456781',
    image: 'https://randomuser.me/api/portraits/men/64.jpg'
  },
  {
    name: 'Yoana Yordanova',
    position: 'Chief Marketing Officer',
    email: 'yy@seetheworld.com',
    phone: '+123456789',
    image: 'https://randomuser.me/api/portraits/women/41.jpg'
  },
  {
    name: 'Nikolay Mihov',
    position: 'Chief Visionary',
    email: 'nm@seetheworld.com',
    phone: '+123456781',
    image: 'https://randomuser.me/api/portraits/men/12.jpg'
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
          <p>Email: <a href={`mailto:${member.email}`}>{member.email}</a></p>
          <p>Phone: <a href={`tel:${member.phone}`}>{member.phone}</a></p>
        </div>

        <button onClick={next} className="arrow-btn">→</button>
      </div>
    </div>
    </>
  );
}

export default Team;
