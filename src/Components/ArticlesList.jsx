import { useState } from "react";
import { Link } from "react-router-dom";

export default function ArticlesList() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Link to="/articles" className="button-54">
        View All Articles
      </Link>
    </>
  );
}
