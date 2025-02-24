// HeaderBar.jsx
import React from "react";
import { FaLinkedin, fax } from "react-icons/fa";
import "./HeaderBar.css"; // We'll define basic styling below
import { TbBrandX } from "react-icons/tb";

export default function HeaderBar() {
  return (
    <header className="header-bar">
      <div className="logo">simon coelho</div>
      <div className="social-links" style={{ justify: "right" }}>
        {/* LinkedIn icon -> wrap in an <a> tag linking to your profile */}
        <a
          href="https://www.linkedin.com/in/simon-coelho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={34} color="white"/>
        </a>

        {/* Twitter icon -> likewise, link to your Twitter */}
        <a
          href="https://x.com/simon_coelho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TbBrandX size={34} color="white"/>
        </a>
      </div>
    </header>
  );
}