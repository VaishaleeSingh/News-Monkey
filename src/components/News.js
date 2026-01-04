// src/components/News.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default function News(props) {
  const { pageSize, country, category, apiKey, mode } = props;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // initial full-load state
  const [loadingMore, setLoadingMore] = useState(false); // append state for infinite scroll
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const isFetchingRef = useRef(false);
  const observerRef = useRef(null);

  const getProvider = (key) => {
    if (!key) return "unknown";
    const lower = key.toLowerCase();
    // simple heuristic: GNews tokens are often shorter or contain '_'
    if (lower.length < 32 || lower.includes("_")) return "gnews";
    return "newsapi";
  };

  const callUrl = async (url) => {
    try {
      const res = await fetch(url);
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("JSON parse error:", e);
        data = { error: "Invalid JSON response" };
      }
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      console.error("Fetch error:", err);
      return { ok: false, error: err.message || "Fetch failed" };
    }
  };

  // Stable URL builders wrapped in useCallback to satisfy hook dependencies
  const buildNewsApiUrl = useCallback(
    (key, pageNumber) => {
      const base = "https://newsapi.org/v2/top-headlines";
      const params = [
        `country=${encodeURIComponent(country)}`,
        `category=${encodeURIComponent(category)}`,
        `page=${encodeURIComponent(pageNumber)}`,
        `pageSize=${encodeURIComponent(pageSize)}`,
        `apiKey=${encodeURIComponent(key)}`,
      ].join("&");
      return `${base}?${params}`;
    },
    [country, category, pageSize]
  );

  const buildGNewsUrl = useCallback(
    (key, pageNumber, includeCategory = true) => {
      const base = "https://gnews.io/api/v4/top-headlines";
      const params = [];
      if (includeCategory && category && category !== "general") {
        params.push(`category=${encodeURIComponent(category)}`);
      }
      if (country) {
        params.push(`country=${encodeURIComponent(country)}`);
      }
      params.push(`max=${encodeURIComponent(pageSize)}`);
      params.push(`page=${encodeURIComponent(pageNumber)}`);
      params.push(`apikey=${encodeURIComponent(key)}`);
      return `${base}?${params.join("&")}`;
    },
    [country, category, pageSize]
  );

  /**
   * Stable fetchNews function wrapped with useCallback so we can safely
   * use it in other hooks' dependency arrays (no lint warnings).
   *
   * Dependencies: apiKey, buildNewsApiUrl, buildGNewsUrl
   */
  const fetchNews = useCallback(
    async (pageNumber = 1, { append = false } = {}) => {
      // Prevent duplicate fetches
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      // When appending, show loadingMore; otherwise show main loading UI
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const key = apiKey || process.env.REACT_APP_NEWS_API_KEY || "";
      if (!key) {
        const msg = "No API key provided. Set REACT_APP_NEWS_API_KEY in .env or pass apiKey prop.";
        setError(msg);
        setArticles([]);
        setTotalResults(0);
        setLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
        return;
      }

      const provider = getProvider(key);
      let result;

      try {
        if (provider === "gnews") {
          // Try with category first (if applicable)
          let url = buildGNewsUrl(key, pageNumber, true);
          result = await callUrl(url);

          // If failed / no articles, retry without category
          if (!result.ok || !result.data?.articles || result.data.articles.length === 0) {
            url = buildGNewsUrl(key, pageNumber, false);
            result = await callUrl(url);
          }

          if (result.ok && result.data?.articles) {
            const newArticles = result.data.articles;
            setArticles((prev) => (append ? [...prev, ...newArticles] : newArticles));
            setTotalResults(Number(result.data.totalArticles || newArticles.length) || newArticles.length);
            setPage(pageNumber);
            setLoading(false);
            setLoadingMore(false);
            isFetchingRef.current = false;
            return;
          }
        } else {
          // newsapi.org
          const url = buildNewsApiUrl(key, pageNumber);
          result = await callUrl(url);

          if (result.ok && result.data?.articles) {
            const newArticles = result.data.articles;
            setArticles((prev) => (append ? [...prev, ...newArticles] : newArticles));
            setTotalResults(Number(result.data.totalResults || newArticles.length) || newArticles.length);
            setPage(pageNumber);
            setLoading(false);
            setLoadingMore(false);
            isFetchingRef.current = false;
            return;
          }
        }

        // If here, something went wrong or there were no articles
        let errorMessage = "No articles available for this category and country combination.";
        if (result?.data) {
          if (result.data.message) errorMessage = result.data.message;
          else if (result.data.error) errorMessage = typeof result.data.error === "string" ? result.data.error : result.data.error.message || JSON.stringify(result.data.error);
          else if (result.data.errors) errorMessage = JSON.stringify(result.data.errors);
        } else if (result?.error) {
          errorMessage = result.error;
        }

        console.error("Error fetching news:", errorMessage);
        setError(errorMessage);
        setArticles([]);
        setTotalResults(0);
        setLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
      } catch (e) {
        console.error("Unexpected fetch error:", e);
        setError("Unexpected error while fetching news.");
        setLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    },
    [apiKey, buildNewsApiUrl, buildGNewsUrl]
  );

  // Initial load and when fetchNews (stable) changes
  useEffect(() => {
    fetchNews(1, { append: false });
    // cleanup on dependency change: disconnect observer to avoid stale observers
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNews]);

  // Update document title when category/country/page changes
  useEffect(() => {
    const capCategory = category.charAt(0).toUpperCase() + category.slice(1);
    document.title = `${capCategory} - ${country.toUpperCase()} - NewsWorld`;
  }, [category, country, page]);

  // IntersectionObserver to detect when last article is visible -> load next page
  const lastArticleRef = useCallback(
    (node) => {
      // disconnect previous observer
      if (observerRef.current) observerRef.current.disconnect();

      // if loading or no node, do nothing
      if (loading || loadingMore) return;

      const maxPage = Math.max(1, Math.ceil(totalResults / pageSize) || 1);
      if (page >= maxPage) return; // no more pages

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isFetchingRef.current) {
              // fetch next page and append
              fetchNews(page + 1, { append: true });
            }
          });
        },
        { root: null, rootMargin: "200px", threshold: 0.1 } // prefetch before fully visible
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, page, totalResults, pageSize, fetchNews]
  );

  const categoryEmojis = {
    general: '📰',
    business: '💼',
    entertainment: '🎬',
    sports: '⚽',
    technology: '💻',
    health: '🏥',
    science: '🔬'
  };

  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 my-3 my-md-4">
      <div className="hero-section">
        <h1 className="hero-title">
          {categoryEmojis[category] || '📰'} Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
        </h1>
        <p className="hero-subtitle">
          Stay updated with the latest news from around the world
        </p>
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="alert alert-danger fade-in responsive-alert" role="alert">
          <strong className="alert-title">⚠️ Error:</strong>
          <span>{error}</span>
          <small className="alert-meta">
            Country: {country.toUpperCase()} | Category: {category}
          </small>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="alert alert-warning fade-in responsive-alert" role="alert">
          <strong className="alert-title">📭 No articles found</strong>
          <span>No articles found for this category and country combination.</span>
          <small className="alert-meta">
            Try selecting a different country or category.
          </small>
        </div>
      )}

      <div className="row g-3 g-md-4">
        {!error &&
          articles.map((article, index) => {
            const isLast = index === articles.length - 1;
            return (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-4"
                key={article.url || article.link || index}
                ref={isLast ? lastArticleRef : null}
              >
                <NewsItem
                  title={article.title || article.name || ""}
                  description={article.description || article.content || ""}
                  imageUrl={article.urlToImage || article.image}
                  newsUrl={article.url || article.link}
                  author={article.author}
                  date={article.publishedAt || article.published_at || article.publishedAt}
                  source={article.source && (article.source.name || article.source)}
                  mode={mode}
                />
              </div>
            );
          })}
      </div>

      {/* bottom spinner while loading more items */}
      {loadingMore && (
        <div className="d-flex justify-content-center my-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}

News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
  apiKey: "",
  mode: "light",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
  mode: PropTypes.string,
};
