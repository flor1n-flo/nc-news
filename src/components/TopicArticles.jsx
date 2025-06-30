import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


function TopicArticles() {
    const { topic_slug } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //fetch articles filtered by topics
    useEffect(() => {
        axios
            .get(`https://project29-05.onrender.com/api/articles?topic=${topic_slug}`)
            .then((response) => {
                setArticles(response.data.articles);
                setIsLoading(false);
            });
    }, [topic_slug]);

    if (isLoading) {
        return <p> Loading articles for topic: {topic_slug}... </p>;
    }

    return (
        <section>
            <h2> Articles on topic: {topic_slug}</h2>
            <ul>
                {articles.map((article) => (
                    <li key={article.article_id}>
                        <h3>{article.title}</h3>
                        <p>By: {article.author}</p>
                    </li>
                ))}
            </ul>
        </section>
    );

 }

 export default TopicArticles;