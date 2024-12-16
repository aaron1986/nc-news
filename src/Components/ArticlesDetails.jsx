import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ArticleDetail() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`https://northcoders-project-week-app.onrender.com/api/articles/${articleId}`);
                setArticle(response.data.article);
            } catch (err) {
                setError("Error fetching article.");
                console.error(err);
            }
        };
        fetchArticle();
    }, [articleId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!article) {
        return <p>Loading article details...</p>;
    }

    return (
        <div className='article-title'>
            <h1>{article.title}</h1>
            <p><strong>Author:</strong> {article.author}</p>
            <p><strong>Topic:</strong> {article.topic}</p>
            <img src={article.article_img_url} alt={article.title} style={{ maxWidth: "400px" }} />
            <p>{article.body}</p>
        </div>
    );
}
