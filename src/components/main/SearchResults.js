const SearchResults = ({setCurrentPage, result, currentPage})=>{
  // on click
  const resultOnClick = () =>{
    console.log('why break?', );
    setCurrentPage([result.name, result.id, []]);
  }
  return (
    <div className="search-result" onClick={resultOnClick}>
      <h1>{result.name}</h1>
    </div>
  )
}

export default SearchResults;