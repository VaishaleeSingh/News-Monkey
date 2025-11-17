import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";

export default function App() {
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [mode, setMode] = useState("light");
  const [country, setCountry] = useState("us"); // Add country state

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "white";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  return (
    <Router>
      <Navbar mode={mode} toggleMode={toggleMode} country={country} setCountry={setCountry} />

      <Routes>
        <Route path="/" element={<News key={`general-${country}`} pageSize={pageSize} country={country} category="general" apiKey={apiKey} mode={mode} />} />
        <Route path="/business" element={<News key={`business-${country}`} pageSize={pageSize} country={country} category="business" apiKey={apiKey} mode={mode} />} />
        <Route path="/entertainment" element={<News key={`entertainment-${country}`} pageSize={pageSize} country={country} category="entertainment" apiKey={apiKey} mode={mode} />} />
        <Route path="/sports" element={<News key={`sports-${country}`} pageSize={pageSize} country={country} category="sports" apiKey={apiKey} mode={mode} />} />
        <Route path="/technology" element={<News key={`technology-${country}`} pageSize={pageSize} country={country} category="technology" apiKey={apiKey} mode={mode} />} />
        <Route path="/health" element={<News key={`health-${country}`} pageSize={pageSize} country={country} category="health" apiKey={apiKey} mode={mode} />} />
        <Route path="/science" element={<News key={`science-${country}`} pageSize={pageSize} country={country} category="science" apiKey={apiKey} mode={mode} />} />
      </Routes>
    </Router>
  );
}