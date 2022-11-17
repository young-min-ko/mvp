
const Post = ({post})=> {
  return (
    <div className="post">
      <h2 className="post-title">{post.title}</h2>
      <p className='post-username'>{post.first_name+" "+post.last_name}</p>
      <h4 className="post-author">{"@"+post.username}</h4>
      <pre className="post-body">{post.body}</pre>
    </div>
  )
}

export default Post;