import {useState} from 'react';
import axios from 'axios';

const WritePost = ({userInfo, setShowMain, currentPage, getPosts})=> {
  const [postInput, setPostInput] = useState(['', ''])

  // onChange
  const postOnChange = (e)=>{

    let index;
    console.log(e.target.placeholder, e.target.value);
    if (e.target.placeholder === 'title') {
      index = 0;
    }
    if (e.target.placeholder === 'write what you want') {
      index = 1;
    }
    let postInputCopy = postInput.slice();
    postInputCopy[index] = e.target.value;
    setPostInput(postInputCopy);
  }
  // onsubmit
  const postOnSubmit = (e)=>{
    if (postInput[0].length < 1) {
      alert('title cannot be empty');
      return;
    }
    if (postInput[1].length < 1) {
      alert('body cannot be empty');
      return;
    }
    e.preventDefault();
    let body = {...userInfo};
    body.community_id = currentPage[1];
    body.title =postInput[0];
    body.body = postInput[1];
    axios.post('/addpost', body)
    .then(res=>{
      console.log(res.data);
      setShowMain([false, true, false])
    })
    .catch(err=>{
      console.log(err.response.data);
    })
    .then(()=>{
      getPosts();
    })
    .catch((err)=>{
      alert('erro fetching posts');
    })
    console.log(postInput[0],postInput[1]);
  }
  // onclick
  const buttonOnClick = ()=>{
    setShowMain([false, true, false]);
  }
  return (
    <div>
    <form onSubmit={postOnSubmit}>
      <label> title:
        <input placeholder="title" type="text" value={postInput[0]} onChange={postOnChange}></input>
      </label>
      <label>body:
      <textarea placeholder="write what you want" type='text' cols="40" rows="5" value={postInput[1]} onChange={postOnChange}></textarea>
      </label>
      <input type="submit"></input>
      <button onClick={buttonOnClick}>go back</button>
    </form>
  </div>
  )
}

export default WritePost;