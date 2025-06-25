import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SingleArticle () {
    //get the articels_id from url
    const {article_id} = useParams();

    //state to hold the article data
    const [article, SetArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //fetching the articles when the component is loading

    useEffect(() => {
        fetch(`https:project29-05.onrender.com/api/articles/${article_id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch article");
            }
            return res.json();
        })
        .then((data) => {
            setArticle(data.article);
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setIsLoading(false);
        });
    }, [article_id]);

    //showing loading state
    if (isLoading) {
        return <p>Loading article...</p>;
    }

    //show error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    //destructuring article

    const {
        title,
        body,
        author,
        topic,
        created_at,
        votes,
        comment_count,
        article_img_url
    } = article;

    return (
        <article className="single-article">
            <h2>{title}</h2>
            <img src={article_img_url} alt="article" width="400" />
            <p><strong> Author: </strong> {author} </p>
            <p><strong> Topic: </strong> {topic} </p>
            <p><strong> Date: </strong> {new Date(created_at).toLocaleDateString()} </p>
            <p><strong> Votes: </strong> {votes} </p>
            <p><strong> Comments: </strong> {comment_count} </p>
            <p>{body}</p>
        </article>
    );
}

export default SingleArticle;