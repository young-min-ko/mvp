import axios from 'axios';
import useModal from '../visualize/useModal.js';
import Visualize from '../visualize/Visualize.js';

const Post = ({ post, userInfo }) => {
  const { toggle, visible } = useModal();
  // onclick
  const onClickPost = () => {
    let params = { post_id: post.id }
    axios.get('/comments', { params })
      .then(res => {
        let data = { type: 'post', data: [post, res.data] };
        console.log(data, visible[0]);
        toggle(data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <>
      <div className="post" onClick={onClickPost}>
        <h2 className="post-title">{post.title}</h2>
        <p className='post-username'>{post.first_name + " " + post.last_name}</p>
        <h4 className="post-author">{"@" + post.username}</h4>
        <pre className="post-body">{post.body}</pre>
      </div>
      <Visualize toggle={toggle} visible={visible} userInfo={userInfo}/>
    </>
  )
}

export default Post;