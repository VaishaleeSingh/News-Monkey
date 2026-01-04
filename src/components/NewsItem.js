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
    background: isDark 
      ? "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 12,
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-block",
    boxShadow: isDark 
      ? "0 4px 14px rgba(102, 126, 234, 0.3)"
      : "0 4px 14px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
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
              padding: "8px 14px",
              borderRadius: 20,
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(185, 28, 28, 0.95) 100%)",
              boxShadow: "0 8px 24px rgba(220, 38, 38, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
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
              lineHeight: 1.4,
              fontSize: "1.15rem",
              fontWeight: 800,
              color: textColor,
              letterSpacing: "-0.02em",
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
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {safeDesc.length > 140 ? `${safeDesc.slice(0, 140)}...` : safeDesc}
          </p>

          <div className="card-footer-meta">
            <small style={{ 
              color: metaColor, 
              fontSize: "0.8rem", 
              fontWeight: 500,
              lineHeight: 1.4
            }}>
              By {author || "Unknown"} • {safeDate}
            </small>

            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-read"
              style={{
                ...buttonStyle,
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px) scale(1.05)";
                e.target.style.boxShadow = isDark 
                  ? "0 8px 24px rgba(102, 126, 234, 0.5)"
                  : "0 8px 24px rgba(102, 126, 234, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = isDark 
                  ? "0 4px 14px rgba(102, 126, 234, 0.3)"
                  : "0 4px 14px rgba(102, 126, 234, 0.4)";
              }}
            >
              Read More →
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
