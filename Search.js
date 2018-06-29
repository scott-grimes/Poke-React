

const Search = (props)=> (<div className="search-bar form-inline">
  <SearchPokemon namesList={props.namesList} fetchByName={props.fetchByName} />
  <select>{Object.keys(props.generations).map((game, i)=> (<option key = {i} value = {game}>{game}</option> ) ) }</select>
</div>);


// In the ES6 spec, files are "modules" and do not share a top-level scope
// var declarations will only exist globally where explicitly defined
window.Search = Search;

