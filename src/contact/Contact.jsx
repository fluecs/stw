import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section id="contact" class="contacts">
      <h2 class="section-title">Get In Touch</h2>
      <div class="section-divider"></div>
      <div class="contact-content">
        <div class="contact-info">
          <h3 style={{textAlign: 'center'}}>Connect to our staff</h3>
          <p>
            Need help with the site or have a question about your booking? Our team is here to assist you! Whether you need support with a booking issue, payment problem, or just want to share your travel dreams, we're just a message away.
          </p>
          <div class="contact-details">
            <div class="contact-item">
              <i>
                <FontAwesomeIcon icon={faPhone} />
              </i>
              <div>
                <h4>Phone</h4>
                <p>+359 98 833 4413</p>
              </div>
            </div>
            <div class="contact-item">
              <i>
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
              <div>
                <h4>Email</h4>
                <p>ilciliadev@gmail.com</p>
              </div>
            </div>
            <div class="contact-item">
              <i>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </i>
              <div>
                <h4>Address</h4>
                <p>Sofia 1700, Akad. Stefan Mladenov Street, №1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-divider"></div>
      <div class="see-more-holder">
        <Link className="see-more" to="/team">
          Meet the Team&nbsp;&nbsp;
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </section>
  );
}
