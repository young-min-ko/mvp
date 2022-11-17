import React from 'react';
import ReactDOM from 'react-dom';
import Post from '../main/Post.js';
import Comments from '../main/Comments.js';
import CommentInput from './CommentInput.js';
import { useState } from 'react';

const container = document.getElementById('root');

const Visualize = ({ visible, toggle, userInfo }) => {
  const [writeComment, setWriteComment] = useState(false);

  const toggleWriteComment = ()=>{
    setWriteComment(!writeComment);
  }
  return (
    visible[0] ? ReactDOM.createPortal(
      <div className="visualize">
        <div className="visualize-pop">
          {visible[1].type === 'post' ?
            <div className="post">
              <h2 className="post-title">{visible[1].data[0].title}</h2>
              <p className='post-username'>{visible[1].data[0].first_name + " " + visible[1].data[0].last_name}</p>
              <h4 className="post-author">{"@" + visible[1].data[0].username}</h4>
              <pre className="post-body">{visible[1].data[0].body}</pre>
            </div>
            : null}
          <button onClick={toggle}>close</button>
          <button onClick={toggleWriteComment}>add comment</button>
          {writeComment ? <CommentInput toggleWriteComment={toggleWriteComment} userInfo={userInfo} visible={visible} toggle={toggle}/> :null}
          {visible[1].type === 'post' && !writeComment ? visible[1].data[1].map(comment => {
            return <Comments comment={comment} />;
          }) : null}
        </div>
        <div className="visualize-overlay"></div>
      </div>
      , container) : null
  )
  // }
}

export default Visualize;