import React from "react";

function ArticleCard({ article }) {
    const { title, author, topic, created_at, votes, comment_count, article_img_url } = article;

    const formattedDate = new Date(created_at).toLocaleDateString('en-GB');

    return (
        <div className="article-card">
            <img src={article_img_url} alt={title} className="article-image" />
            <h2>{title}</h2>
            <p>Author: {author}</p>
            <p>Topic: {topic}</p>
            <p>Date: {formattedDate}</p>
            <p>Votes: {votes}</p>
            <p>Comments: {comment_count}</p>
        </div>
    );
}

export default ArticleCard;