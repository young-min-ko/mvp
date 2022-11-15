import {useState} from 'react';

const WritePost = ()=> {
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
    e.preventDefault();
    console.log(postInput[0],postInput[1]);
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
      {/* <button onClick={onClickGoBack}>go back</button> */}
    </form>
  </div>
  )
}

export default WritePost;