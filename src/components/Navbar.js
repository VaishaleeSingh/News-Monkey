import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default function Navbar(props) {
  const countries = [
    { code: "in", name: "India", flag: "🇮🇳" },
    { code: "us", name: "United States", flag: "🇺🇸" },
    { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "jp", name: "Japan", flag: "🇯🇵" },
    { code: "cn", name: "China", flag: "🇨🇳" },
    { code: "br", name: "Brazil", flag: "🇧🇷" },
    { code: "ru", name: "Russia", flag: "🇷🇺" },
    { code: "it", name: "Italy", flag: "🇮🇹" },
    { code: "mx", name: "Mexico", flag: "🇲🇽" },
    { code: "za", name: "South Africa", flag: "🇿🇦" },
  ];

  const selectedCountry = countries.find(c => c.code === props.country) || countries[0];

  const navbarStyle = props.mode === 'dark' 
    ? { 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        color: '#fff'
      }
    : { 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
        color: '#000'
      };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} fixed-top`} style={navbarStyle}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: '1.6rem' }}>
          📰 NEWS Monkey
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">General</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/business">Business</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/entertainment">Entertainment</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/sports">Sports</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/technology">Technology</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/health">Health</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/science">Science</NavLink></li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Country Selector Dropdown */}
            <div className="dropdown">
              <button
                className={`btn btn-sm btn-${props.mode === 'dark' ? 'outline-light' : 'outline-dark'} dropdown-toggle d-flex align-items-center gap-2`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span style={{ fontSize: '1.2rem' }}>{selectedCountry.flag}</span>
                <span className="d-none d-md-inline">{selectedCountry.name}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {countries.map(country => (
                  <li key={country.code}>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => props.setCountry(country.code)}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{country.flag}</span>
                      <span>{country.name}</span>
                      {country.code === props.country && <span className="ms-auto text-primary">✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dark Mode Toggle */}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                onChange={props.toggleMode}
                checked={props.mode === 'dark'}
                id="darkModeSwitch"
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                {props.mode === "light" ? "🌙" : "☀️"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  mode: PropTypes.string,
  toggleMode: PropTypes.func,
  country: PropTypes.string,
  setCountry: PropTypes.func,
};

Navbar.defaultProps = {
  mode: "light",
  country: "us",
};