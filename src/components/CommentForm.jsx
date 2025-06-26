import { useState } from "react";

//submiting a new comment component
function CommentForm({ article_id, onCommentPosted }) {
    const [ username, setUserName ] = useState("");
    const [ body, setBody ] = useState("");
    const [ isPosting, setIsPosting ] = useState(false);
    const [ error, setError ] = useState(null);

    //handling form submision
    const handleSubmision = (e) => {
        e.preventDefault();

        //prevents empty comments
        if (!username.trim() || !body.trim()) {
            setError("Username and comment cannot be empty.");
            return;
        }

        setIsPosting(true);
        setError(null);

        //making a post request to api
        fetch(`https://project29-05.onrender.com/api/articles/${article_id}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, body })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to post a comment");
            }
            return res.json();
        })
        .then((data) => {
            setUserName("");
            setBody("");
            setIsPosting(false);
            onCommentPosted(data.comment);
        })
        .catch((err) => {
            setError(err.message);
            setIsPosting(false);
        });
    };

    return(
        <form onSubmit = {handleSubmision} className = "comment-form" >
            <h3> Post a Comment </h3>
            <input type = "text" placeholder = "Your username" value = {username} onChange = {(e) => setUserName(e.target.value)}/>
            <textarea placeholder = "Your comment" value = {body} onChange = {(e) => setBody(e.target.value)}> </textarea>
            <button type = "submit" disabled = {isPosting}> {isPosting ? "Posting..." : "Post Comment"} </button>
            {error && <p style = {{color: "red"}} > {error} </p>}
        </form>
    );
}

export default CommentForm;