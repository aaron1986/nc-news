import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ArticlesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate(`/articles`);
  };

  return (
    <>
      <button className="button-54" onClick={handleViewAll}>
        View All Articles
      </button>
    </>
  );
}
