import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ArticleDetail() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [voteError, setVoteError] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [posting, setPosting] = useState(false);
    const [postError, setPostError] = useState(null);
    const [postSuccess, setPostSuccess] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState({}); 

    useEffect(() => {
        const fetchArticleAndComments = async () => {
            try {
                const articleRes = await axios.get(
                    `https://northcoders-project-week-app.onrender.com/api/articles/${articleId}`
                );
                setArticle(articleRes.data.article);

                const commentsRes = await axios.get(
                    `https://northcoders-project-week-app.onrender.com/api/articles/${articleId}/comments`
                );
                setComments(commentsRes.data.comments);
            } catch (err) {
                console.error("Error fetching article or comments:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleAndComments();
    }, [articleId]);

    const handleVote = async (voteChange) => {
        if (!article) return;
        const originalVotes = article.votes;
        setArticle({ ...article, votes: article.votes + voteChange });
        setVoteError(null);

        try {
            await axios.patch(
                `https://northcoders-project-week-app.onrender.com/api/articles/${articleId}`,
                { inc_votes: voteChange }
            );
        } catch (err) {
            console.error("Error updating votes:", err);
            setVoteError("Failed to update votes.");
            setArticle({ ...article, votes: originalVotes });
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        setPostError(null);
        setPostSuccess(false);

        if (!newComment.trim()) {
            setPostError("Comment cannot be empty.");
            return;
        }

        setPosting(true);

        try {
            const res = await axios.post(
                `https://northcoders-project-week-app.onrender.com/api/articles/${articleId}/comments`,
                { body: newComment, username: "grumpy19" }
            );

            setComments((prevComments) => [res.data.comment, ...prevComments]);
            setNewComment("");
            setPostSuccess(true);
        } catch (err) {
            console.error("Error posting comment:", err);
            setPostError("Failed to post comment. Please try again.");
        } finally {
            setPosting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        setDeleteLoading((prev) => ({ ...prev, [commentId]: true }));

        try {
            await axios.delete(
                `https://northcoders-project-week-app.onrender.com/api/comments/${commentId}`
            );

            setComments((prevComments) =>
                prevComments.filter((comment) => comment.comment_id !== commentId)
            );
        } catch (err) {
            console.error("Error deleting comment:", err);
            alert("Failed to delete comment. Please try again.");
        } finally {
            setDeleteLoading((prev) => ({ ...prev, [commentId]: false }));
        }
    };

    if (isLoading) return <p>Loading Please wait...</p>;

    return (
        <div className="article-detail">
            {article && (
                <div>
                    <h1>{article.title}</h1>
                    <p><strong>Topic:</strong> {article.topic}</p>
                    <p><strong>Author:</strong> {article.author}</p>
                    <p><strong>Body:</strong> {article.body}</p>
                    <p>
                        <strong>Votes:</strong> {article.votes}
                        <button onClick={() => handleVote(1)}>👍</button>
                        <button onClick={() => handleVote(-1)}>👎</button>
                        {/* Window key and Full-Stop(Period) at the same time */}
                    </p>
                    {voteError && <p style={{ color: "red" }}>{voteError}</p>}
                </div>
            )}

            <div className="comments-container">
                <h2>Comments</h2>

                <form onSubmit={handleSubmitComment} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment here..."
                        disabled={posting}
                    ></textarea>
                    <button className="button-54" type="submit" disabled={posting}>Post Comment</button>
                </form>
                {postError && <p style={{ color: "red" }}>{postError}</p>}
                {postSuccess && <p style={{ color: "green" }}>Comment posted successfully!</p>}

                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.comment_id} className="comment-card">
                            <p><strong>Author:</strong> {comment.author}</p>
                            <p>{comment.body}</p>
                            <p><small>{new Date(comment.created_at).toLocaleDateString()}</small></p>
                            {comment.author === "grumpy19" && (
                                <button className="button-50"
                                    onClick={() => handleDeleteComment(comment.comment_id)}
                                    disabled={deleteLoading[comment.comment_id]}
                                >
                                    {deleteLoading[comment.comment_id] ? "Deleting..." : "Delete"}
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No comments available for this article.</p>
                )}
            </div>
        </div>
    );
}
