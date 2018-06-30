

class Search extends React.Component {
  
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }
  
  change (event) {
    console.log(event.target.value);
    this.props.updateGameSelection(event.target.value);
  }
  
  render() {
    return (<div className="search-bar form-inline">
      <SearchPokemon namesList={this.props.namesList} fetchByName={this.props.fetchPokemonByName} />
      <select onChange={this.change}>{Object.keys(this.props.generations).map((game, i)=> (<option key = {i} value = {game}>{game}</option> ) ) }</select>
    </div>);
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// var declarations will only exist globally where explicitly defined
window.Search = Search;

