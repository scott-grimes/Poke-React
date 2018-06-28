class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pokemonList:[],
      selected:{}
    }

  }

  componentWillMount() {



  }


  render(){
    return(
    <div>
      <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search /> 
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

const versionName = 'yellow';
const languageName = 'en';






const fetchPokemonList = function fetchPokemonList(generation) {
  return new Promise(function(resolve,reject){

    generation = 1;
    const idOf = (x) => c = x.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');

    fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
      .then(result   => result.json())
      .then(x => {
        return x.pokemon_species.map(el => {
          return { id: idOf(el), name: el.name };
        });
      })
      .then( x => { resolve(x); });

  })
  
}

const fetchPokemon = function fetchPokemon(id){

  return new Promise(function(resolve,reject){
    var pokemon = {};

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((x) => x.json())
    .then((x) => {
      console.log(x);
      pokemon.name = x.name;
      pokemon.image = x.sprites.front_default;
      pokemon.types = x.types.map(x => x.type.name);
      return fetch(x.species.url)
    })
    .then(speciesInfo => speciesInfo.json() )
    .then(speciesInfo => {
      console.log(speciesInfo)
      pokemon.flavorText = speciesInfo.flavor_text_entries.filter((x) => x.language.name === 'en' && x.version.name === 'yellow')[0].flavor_text;
      resolve(pokemon);
    });

  });
  
  
};


window.App = App;
window.fetchPokemon = fetchPokemon;
window.fetchPokemonList = fetchPokemonList;

ReactDOM.render( <App />,document.getElementById('app'));