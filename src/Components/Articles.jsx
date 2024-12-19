import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("searchTerm");

  useEffect(() => {
    const fetchArticles = async () => {
      const ARTICLES_API = `https://northcoders-project-week-app.onrender.com/api/articles${searchTerm ? `?author=${encodeURIComponent(searchTerm)}` : ""}`;
      try {
        const res = await axios.get(ARTICLES_API);
        setArticles(res.data.articles);
      } catch (err) {
        console.error("Error fetching articles:", err.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchArticles();
  }, [searchTerm]);

  if (isLoading) {
    return <p>Loading Articles, Please wait...</p>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div id="article-text">Articles</div>
          {articles.map((article) => (
            <div key={article.article_id} className="col-md-4 mb-4">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={article.article_img_url}
                  alt={article.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>
                    <strong>Author:</strong> {article.author} <br />
                    <strong>Topic:</strong> {article.topic}
                  </Card.Text>
                  <Button variant="primary" as={Link} to={`/articles/${article.article_id}`}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
