import React from "react";
import { Link } from "react-router-dom";


function ArticleCard({ article }) {
    const { article_id, title, author, topic, created_at, votes, comment_count, article_img_url } = article;

    const formattedDate = new Date(created_at).toLocaleDateString('en-GB');

    return (
        <div className="article-card">
            <Link to={`/articles/${article_id}`} style={{textDecoration: "none", color: "inherit" }}>
                <img src={article_img_url} alt="article" width="400" />
                <h2>{title}</h2>
                <p><strong>Topic:</strong> {topic}</p>
                <p><strong>Author:</strong> {author}</p>
                <p><strong>Votes:</strong> {votes}</p>
                <p><strong>Comments:</strong> {comment_count}</p>
                <p><strong>Date:</strong> {new Date(created_at).toLocaleDateString()}</p>
            </Link>
        </div>
    );
}

export default ArticleCard;