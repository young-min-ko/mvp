
const Comments = ({comment})=>{

  return (
    <div className="post">
    <p className='post-username'>{comment.first_name+" "+comment.last_name}</p>
    <h4 className="post-author">{"@"+comment.username}</h4>
    <pre className="post-body">{comment.body}</pre>
  </div>
  )
}

export default Comments;