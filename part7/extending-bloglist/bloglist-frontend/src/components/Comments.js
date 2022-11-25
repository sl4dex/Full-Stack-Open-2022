import { React, useState} from "react"
import blogService from "../services/blogs"

const Comments = ({ blog }) => {
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState(blog.comments)

    async function addComment(e) {
        e.preventDefault()
        const token = JSON.parse(localStorage.getItem("loggedBlogUser")).token
        const r = await blogService.comment(blog.id, comment, token)
        setComments(r.comments)
        setComment('')
    }

    function writingComment(e) {
        setComment(e.target.value)
    }

    return (
        <div>
            <h3>comments</h3>
            <form onSubmit={addComment}>
                <input type="text" name="comment" value={comment} onChange={writingComment} />
                <button type="submit" >add comment</button>
            </form>
            <ul>
                {comments.map(
                    (comment, i) => <li key={i}>{comment}</li>
                )}
            </ul>
        </div>
    )
}

export default Comments