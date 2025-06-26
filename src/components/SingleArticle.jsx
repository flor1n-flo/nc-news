import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function SingleArticle () {
    //get the articels_id from url
    const {article_id} = useParams();

    //state to hold the article data
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //state to hold the comments
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);

    //state for vote handling
    const [voteChange, setVoteChange] = useState(0);
    const [voteError, setVoteError] = useState(null);

    //add a new comment 
    const handleCommentPosted = (newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };


    //fetching the articles when the component is loading
    useEffect(() => {
        fetch(`https://project29-05.onrender.com/api/articles/${article_id}`)
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


    //fetch comments data
    useEffect(() => {
        fetch(`https://project29-05.onrender.com/api/articles/${article_id}/comments`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch comments");
            }
            return res.json()
        })
        .then((data) => {
            setComments(data.comments);
            setCommentsLoading(false);
        })
        .catch((err) => {
            console.log("Comments error", err);
            setCommentsLoading(false);
        });
    }, [article_id])


    //handle the button vote
    const handleVote = (inc) => {
        setVoteChange((prev) => prev + inc);
        setVoteError(null);
        
        fetch(`https://project29-05.onrender.com/api/articles/${article_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({inc_votes: inc}),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("FAiled to update vote");
            }
            return res.json();
        })
        .catch((err) => {
            setVoteChange((prev) => prev - inc);
            setVoteError("Failed to update vote, PLease try again.");
        });
    };

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
            <p><strong> Votes: </strong> {votes + voteChange} </p>

            {/*votebuttons*/}
            <button onClick = {() => handleVote(1)}>  Vote Up </button>
            <button onClick = {() => handleVote(-1)}> Vote Down </button>

            {/*Vote fails, display error message*/}
            {voteError && <p style={{color: "red"}} >{voteError}</p>}

            {/*Comment Form*/}
            <CommentForm article_id = {article_id} onCommentPosted = {handleCommentPosted} />
  

            <section className="comments-section">
                <h3>Comments</h3>
                {commentsLoading ? (<p>Loading comments...</p>) : comments.length === 0 ? (<p>No coment yet.</p>) : (comments.map((comment) =>
                    (<CommentCard key={comment.comment_id} comment={comment}/>))
                )}
            </section>

        </article>
    );
}

export default SingleArticle;