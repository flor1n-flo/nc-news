//display individual comments component and add a delete button for deleting comments
function CommentCard({ comment, currentUser, onDelete }) {

    //destructure the comment object
    const {comment_id, body, author, votes, created_at} = comment;

    //handle the delete status and errors
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    //handle delete comments requests
    const handleDelete = () => {
        setIsDeleting(true);
        setDeleteError(null);

        //delete rquest send to backend api
        fetch(`https://project29-05.onrender.com/api/comments/${comment_id}`, {
            method: "DELETE"
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to delete comment");
            }
            onDelete(comment_id);
        })
        .catch((err) => {
            setDeleteError("Could not delete comment");
            setIsDeleting(false);
        });
    };

    return (
        <div className="comment-card">
            <p><strong> {author} </strong> comented on {new Date(created_at).toLocaleDateString()} </p>
            <p> {body} </p>
            <p><strong> Votes: </strong> {votes} </p>
        

            {/* show the delete button*/}
            {currentUser === author && (< button onClick={handleDelete} disabled = {isDeleting} > {isDeleting ? "Deleting..." : "Delete"} </button>)}
            {deleteError && <p style = {{color: "red" }}> {deleteError} </p>}
        </div>
    );
}

export default CommentCard;