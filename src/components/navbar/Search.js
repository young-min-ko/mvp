import {useState} from 'react';
import axios from 'axios';

const Search = ({setCurrentPage, currentPage}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // onchange
  const searchOnChange = (e) => {
    setSearchTerm(e.target.value);
  }
  // onclick
  const searchOnClick = () =>{
    console.log(searchTerm);
    let body = {search: searchTerm};
    axios.post('/search', body)
    .then(res=>{
      console.log(res.data);
      let currentPageCopy = currentPage.slice();
      currentPageCopy[2] = res.data;
      setCurrentPage(currentPageCopy);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <>
    <label className="search">
      <input className="search-input" placeholder="search" type="text" value={searchTerm} onChange={searchOnChange}></input>
    <button onClick={searchOnClick}>search</button>
    </label>
    </>
  )
}

export default Search;