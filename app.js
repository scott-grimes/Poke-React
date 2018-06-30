class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ids: {},
      selectedPokemon: {},
      names: [],
      versionName: 'yellow',
      generations: window.generations
    };

    this.fetchPokemonByName = this.fetchPokemonByName.bind(this);
    this.updateGameSelection = this.updateGameSelection.bind(this);
  }

  componentWillMount() {
    const list = window.defaultList;
    this.setState({
      selectedPokemon: window.defaultPokemon,
      ids: idsFromList(list),
      names: namesFromList(list)
    });
  }

  updateGameSelection(name) {
   
    const generationId = window.generations[name];
    const currPokmeonName = this.state.selectedPokemon.name;
    
    
    window.fetchPokemonListByGenerationId(generationId)
      .then(list => {
        
        this.setState(
          { ids: idsFromList(list), names: namesFromList(list), versionName: name },
          () => { 
            
            if (!this.state.names.includes(currPokmeonName) ) { this.fetchPokemonByName(this.state.names[0]); } 
          }
        );
      })
      .catch(err => console.log(err));

    
  }

  fetchPokemonByName(name) {
    if (name !== '' && !this.state.names.includes(name)) {
      alert('Pokemon Not Found');
      return;
    }
    this.setState({ selectedPokemon: {} });
    console.log(name, this.state.ids[name]);
    window.fetchPokemonById(this.state.ids[name], this.state.versionName).then(response => {
      if (response.detail && response.detail === 'Not Found') {
        console.log('Pokemon ' + name + ' Not Found');
      }
      this.setState({ selectedPokemon: response });
    });
  }

  render() {
    return <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search generations={this.state.generations} namesList={this.state.names} updateGameSelection={this.updateGameSelection} fetchPokemonByName={this.fetchPokemonByName} />
        </div>
      </nav>
      <div className="row">
        <div className="col-md-5">
          <PokeCenter pokemon={this.state.selectedPokemon} />
        </div>
      </div>
    </div>;
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


const fetchPokemonListByGenerationId = function fetchPokemonListByGenerationId(id) {
  return new Promise(function(resolve, reject) {
    const idOf = x =>
      x.url
        .replace('https://pokeapi.co/api/v2/pokemon-species/', '')
        .replace('/', '');

    fetch(`https://pokeapi.co/api/v2/generation/${id}/`)
      .then(result => result.json())
      .then(x => {
        return x.pokemon_species.map(el => {
          return { id: idOf(el), name: el.name };
        });
      })
      .then(x => {
        resolve(x);
      })
      .catch(err=>reject(err));
  }).catch(err=>console.log(err));
};

const fetchPokemonById = function fetchPokemonById(id, versionName = 'yellow') {

  return new Promise(function(resolve, reject) {
    var pokemon = {};

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(x => x.json())
      .then(x => {
        console.log(x);
        pokemon.name = x.name;
        pokemon.image = x.sprites.front_default;
        pokemon.types = x.types.map(x => x.type.name);
        return fetch(x.species.url);
      })
      .then(speciesInfo => speciesInfo.json())
      .then(speciesInfo => {
        pokemon.flavorText = speciesInfo.flavor_text_entries.filter(
          x => x.language.name === 'en' && ( x.version.name === versionName || versionName.split('-').includes( x.version.name))
        )[0].flavor_text;
        resolve(pokemon);
      })
      .catch(err=>{ return console.log(err); });
  }).catch(err => console.log(err));
};


window.App = App;
window.fetchPokemonById = fetchPokemonById;
window.fetchPokemonListByGenerationId = fetchPokemonListByGenerationId;

ReactDOM.render( <App />, document.getElementById('app'));