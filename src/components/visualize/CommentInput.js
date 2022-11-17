import {useState} from 'react';
import axios from 'axios';

const CommentInput = ({toggleWriteComment, userInfo, visible, toggle})=>{
  const [commentInput, setCommentInput] = useState('')
  //onsubmit
  const commentOnSubmit = (e)=>{
    e.preventDefault()
    if (commentInput.length < 1) {
      alert('body cannot be empty');
      return;
    }
    let body = {user_id: userInfo.id, post_id: visible[1].data[0].id, body: commentInput};
    console.log(body);
    axios.post('/comments', body)
    .then(res=>{
      console.log(res.data);
      let params = { post_id: visible[1].data[0].id }
      axios.get('/comments', { params })
        .then(res => {
          let data = [...visible];
          console.log('1',data);
          data[1].data[1]= res.data;
          console.log('2',data);
          toggle(data[1], true)
        })
        .catch(err => {
          console.log(err);
        })
        .then(()=>{
          toggleWriteComment();
        })
        .catch(err=>{
          console.log(err);
        })
    })
    .catch(err=>{
      console.log(err);
    })

  }
  // onchange
  const commentOnChange = (e)=>{
    setCommentInput(e.target.value);
  }
  return (
    <div>
    <form onSubmit={commentOnSubmit}>
      <label>comment:
      <textarea placeholder="write what you want" type='text' cols="40" rows="5" value={commentInput} onChange={commentOnChange}></textarea>
      </label>
      <input type="submit"></input>
      <button onClick={toggleWriteComment}>go back</button>
    </form>
  </div>
  )
}

export default CommentInput;