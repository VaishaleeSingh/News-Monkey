// src/components/NewsItem.js
import React from "react";

export default function NewsItem(props) {
  const { title, description, imageUrl, newsUrl, author, date, source, mode } = props;

  // explicit readable colors depending on mode
  const isDark = mode === "dark";
  const textColor = isDark ? "#ffffff" : "#0b1220"; // white for dark, near-black for light
  const descColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(11,18,32,0.85)";
  const metaColor = isDark ? "rgba(255,255,255,0.65)" : "rgba(11,18,32,0.6)";

  // glass class chosen by mode, and inline background fallback
  const glassClass = isDark ? "glass-dark" : "glass-light";
  const glassBgInline = isDark
    ? { background: "linear-gradient(135deg, rgba(10,10,12,0.55), rgba(20,20,22,0.35))" }
    : { background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,250,250,0.8))" };

  // button colors (contrast)
  const buttonStyle = {
    background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.9)",
    color: isDark ? "#fff" : "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 10,
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
  };

  // safe values
  const safeTitle = title || "Title not available";
  const safeDesc = description || "No description available.";
  const safeImage =
    imageUrl ||
    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
  const safeDate = date ? new Date(date).toLocaleString() : "Unknown date";
  const safeSource = (source && (source.name || source)) || "Unknown";

  return (
    <div className="news-card-wrap my-3">
      <article
        className={`glass-card ${glassClass}`}
        aria-label={safeTitle}
        style={{
          ...glassBgInline,
          borderRadius: 14,
          overflow: "hidden",
          minHeight: 360,
        }}
      >
        <div className="card-image-wrap" style={{ position: "relative", height: 200 }}>
          <img
            src={safeImage}
            alt={safeTitle}
            className="card-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 450ms cubic-bezier(.2,.9,.2,1)",
            }}
          />
          <span
            className="source-badge"
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              padding: "6px 10px",
              borderRadius: 999,
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#fff",
              background: "rgba(220,38,38,0.95)",
              boxShadow: "0 6px 18px rgba(2,6,23,0.18)",
            }}
          >
            {safeSource}
          </span>
        </div>

        <div className="card-body" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          <h3
            className="card-title"
            style={{
              margin: 0,
              lineHeight: 1.2,
              fontSize: "1.05rem",
              fontWeight: 700,
              color: textColor,
              textShadow: isDark ? "0 1px 0 rgba(0,0,0,0.35)" : "none",
            }}
          >
            {safeTitle.length > 100 ? `${safeTitle.slice(0, 100)}...` : safeTitle}
          </h3>

          <p
            className="card-desc"
            style={{
              margin: 0,
              fontSize: "0.95rem",
              color: descColor,
              flex: 1,
            }}
          >
            {safeDesc.length > 140 ? `${safeDesc.slice(0, 140)}...` : safeDesc}
          </p>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <small style={{ color: metaColor }}>
              By {author || "Unknown"} • {safeDate}
            </small>

            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-read"
              style={buttonStyle}
            >
              Read More →
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
