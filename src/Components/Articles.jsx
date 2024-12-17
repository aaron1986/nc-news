import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("searchTerm");

  useEffect(() => {
    const fetchArticles = async () => {
      const ARTICLES_API = `https://northcoders-project-week-app.onrender.com/api/articles${searchTerm ? `?author=${encodeURIComponent(searchTerm)}` : ""}`;
      {/* If searchTerm is(truthy: results found), it appends ?author=<searchTerm> to the URL. 
          If searchTerm is falsy (no results found), no query string is appended. */}
      try {
        const res = await axios.get(ARTICLES_API);
        setArticles(res.data.articles);
      } catch (err) {
        console.error("Error fetching articles:", err.message);
      }
    };

    fetchArticles();
  }, [searchTerm]);

  return (
        <>
          {searchTerm && <h2>Search Results for: {searchTerm}</h2>}
          <div className="container">
          <ul>
            {articles.map((article) => (
                
              <li key={article.article_id}>
                <strong>Author:</strong> {article.author}
                <br />
                <strong>Title:</strong>{" "}
                <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                <br />
                <strong>Topic:</strong> {article.topic}
                <br />
                <strong>Image:</strong>
                <img
                  src={article.article_img_url}
                  alt={article.title}
                  style={{ width: "100px" }}
                />
                <br />
                </li>
            ))}
          </ul>
          </div>
        </>
      );      
}
