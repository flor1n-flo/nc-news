//display individual comments component

function CommentCard({ comment}) {
    const {author, created_at, body, votes} = comment;

    return (
        <div className="comment-card">
            <p><strong> {author} </strong> comented on {new Date(created_at).toLocaleDateString()} </p>
            <p> {body} </p>
            <p><strong> Votes: </strong> {votes} </p>
        </div>
    );
}

export default CommentCard;