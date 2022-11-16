
const Post = ({post})=> {
  return (
    <div>

      <h2>{post.title}</h2>
      <h4>Author: {post.first_name+" "+post.last_name} {"@"+post.username}</h4>
      <p>{post.body}</p>
    </div>
  )
}

export default Post;