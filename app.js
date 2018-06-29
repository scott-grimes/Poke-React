class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ids: {},
      selected: {},
      names: [],
      versionName: 'yellow',
      generations: window.generations
    };
    this.fetchByName = this.fetchByName.bind(this);
    this.updateGameSelection = this.updateGameSelection.bind(this);
  }

  componentWillMount() {    
    const list = window.defaultList;
    this.setState({selected: window.defaultPokemon, ids: idsFromList(list), names: namesFromList(list)});
  }

  updateGameSelection(name) {
    this.setState({versionName: name},
      fetchPokemon(name)
        .then(list => {
          this.setState({ ids: idsFromList(list), names: namesFromList(list) },
            () => {this.fetchByName(this.state.selected.name)}
          );
        });
    );
    

  }

  fetchByName(name) {
    
    if (!this.state.names.includes(name)) {
      alert('Pokemon Not Found');
      return;
    }
    this.setState({selected: {}});
    window.fetchPokemon( this.state.ids[name] )
      .then(response =>{
        if (response.detail && response.detail === 'Not Found') { console.log('Not Found'); }
        this.setState({selected: response});
      });
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search generations={this.state.generations} namesList={this.state.names} updateGameSelection={this.updateGameSelection} fetchByName={this.fetchByName}/> 
          </div>
        </nav>
        <div className="row">
          <div className="col-md-5">
            <PokeCenter pokemon={this.state.selected}/>
          </div>
        </div>
      </div>);
  }

}
const languageName = 'en';



const idsFromList = function idsFromList(pokemonList) {
  return pokemonList.reduce((obj, x) => {
    obj[x.name] = x.id;
    return obj;
  }, {});
};

const namesFromList = function namesFromList(pokemonList) {
  return pokemonList.map(x => x.name);
};


const fetchPokemonList = function fetchPokemonList() {
  return new Promise(function(resolve, reject) {

    const generation = generationNumbers[this.state.versionName];
    const idOf = (x) => x.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');

    fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
      .then(result => result.json())
      .then(x => {
        return x.pokemon_species.map(el => {
          return { id: idOf(el), name: el.name };
        });
      })
      .then( x => { resolve(x); });

  });
  
};

const fetchPokemon = function fetchPokemon(id) {

  return new Promise(function(resolve, reject) {
    var pokemon = {};

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((x) => x.json())
      .then((x) => {
        console.log(x);
        pokemon.name = x.name;
        pokemon.image = x.sprites.front_default;
        pokemon.types = x.types.map(x => x.type.name);
        return fetch(x.species.url);
      })
      .then(speciesInfo => speciesInfo.json() )
      .then(speciesInfo => {
        console.log(speciesInfo);
        pokemon.flavorText = speciesInfo.flavor_text_entries.filter((x) => x.language.name === 'en' && x.version.name === 'yellow')[0].flavor_text;
        resolve(pokemon);
      });

  });
  
  
};


window.App = App;
window.fetchPokemon = fetchPokemon;
window.fetchPokemonList = fetchPokemonList;

ReactDOM.render( <App />, document.getElementById('app'));