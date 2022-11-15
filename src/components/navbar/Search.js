import {useState} from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // onchange
  const searchOnChange = (e) => {
    setSearchTerm(e.target.value);
  }
  // onclick
  const searchOnClick = () =>{
    console.log(searchTerm);
    alert(searchTerm);
  }
  return (
    <>
    <label>
      <input placeholder="search" type="text" value={searchTerm} onChange={searchOnChange}></input>
    <button onClick={searchOnClick}>search</button>
    </label>
    </>
  )
}

export default Search;