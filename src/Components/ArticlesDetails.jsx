import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ArticleDetail() {
    const { articleId } = useParams(); 
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticleAndComments = async () => {
            try {
                // articles API
                const articleRes = await axios.get(`https://northcoders-project-week-app.onrender.com/api/articles/${articleId}`);
                setArticle(articleRes.data.article);

                // comments API
                const commentsRes = await axios.get(`https://northcoders-project-week-app.onrender.com/api/articles/${articleId}/comments`);
                setComments(commentsRes.data.comments);
            } catch (err) {
                console.error("Error fetching article or comments:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleAndComments();
    }, [articleId]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="article-detail">
            {article && (
                <div>
                    <h1>{article.title}</h1>
                    <p><strong>Topic:</strong> {article.topic}</p>
                    <p><strong>Author:</strong> {article.author}</p>
                    <p><strong>Body:</strong> {article.body}</p>
                    <p><strong>Votes:</strong> {article.votes}</p>
                </div>
            )}

           
            <div className="comments-container">
            <h2>Comments</h2>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.comment_id} className="comment-card">
                            <p><strong>Author:</strong> {comment.author}</p>
                            <p>{comment.body}</p>
                            <p><strong>Votes:</strong> {comment.votes}</p>
                            <p><small>{new Date(comment.created_at).toLocaleDateString()}</small></p>
                        </div>
                    ))
                ) : (
                    <p>No comments available for this article.</p>
                )}
            </div>
        </div>
    );
}
