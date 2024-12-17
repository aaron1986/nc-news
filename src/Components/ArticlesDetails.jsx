import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Counter from "./Counter";

export default function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      setIsLoading(true);
      try {
        // API article
        const articleRes = await axios.get(
          `https://northcoders-project-week-app.onrender.com/api/articles/${articleId}`
        );
        setArticle(articleRes.data.article);

        // API comments 
        const commentsRes = await axios.get(
          `https://northcoders-project-week-app.onrender.com/api/articles/${articleId}/comments`
        );
        setComments(commentsRes.data.comments);
      } catch (err) {
        setError("Error fetching article or comments.");
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleAndComments();
  }, [articleId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="article-detail">
      {article &&  (
        <div>
          <h1>{article.title}</h1>
          <p><strong>Topic:</strong> {article.topic}</p>
          <p><strong>Author:</strong> {article.author}</p>
          <p>{article.body}</p>
          <Counter initialVotes={article.votes} articleId={article.article_id} />
        </div>
      )}

      <div className="comments-container">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="comment-card">
              <p><strong>Author:</strong> {comment.author}</p>
              <p>{comment.body}</p>
              <p><small>{new Date(comment.created_at).toLocaleDateString()}</small></p>
              <Counter
                initialVotes={comment.votes}
                commentId={comment.comment_id}
              />
            </div>
          ))
        ) : (
          <p>No comments available for this article.</p>
        )}
      </div>
    </div>
  );
}
