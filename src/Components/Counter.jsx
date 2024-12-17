import { useState } from "react";
import axios from "axios";

export default function Counter({ initialVotes, articleId, commentId }) {
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState(null);

  const handleVote = async (voteChange) => {
    setError(null);
    const updatedVotes = votes + voteChange; 
    setVotes(updatedVotes);

    try {
      let endpoint = "";
      if (commentId) {
        endpoint = `https://northcoders-project-week-app.onrender.com/api/comments/${commentId}`;
      } else if (articleId) {
        endpoint = `https://northcoders-project-week-app.onrender.com/api/articles/${articleId}`;
      }

      await axios.patch(endpoint, { inc_votes: voteChange });
    } catch (err) {
      setVotes(votes); 
      setError("Failed to update votes. Please try again.");
      console.error("Error:", err.message);
    }
  };

  return (
    <div>
      <h3>Votes: {votes}</h3>
      <button onClick={() => handleVote(1)} aria-label="Upvote" className="vote-button">
        👍
      </button>
      <button onClick={() => handleVote(-1)} aria-label="Downvote" className="vote-button">
        👎
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
