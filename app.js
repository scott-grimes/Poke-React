class App extends React.Component {

  constructor(props) {
    super(props);


  }




  render(){
    return();
  }

}

const versionName = 'yellow';
const languageName = 'en';

fetchPokemonList(generation) {
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

fetchPokemon(id){
  return new Promise(function(resolve,reject){
    var pokemon = {};

    fetch(`https://pokeapi.co/api/v2/pokemon/$(id)`).then((x) => x.json()).then((x) => {
      pokemon.name = x.name;
      pokemon.image = x.sprites.front_default;
      pokemon.types = x.types.map(x => x.type.name);
      const speciesURL = x.species.url;
      return fetch(x.species.url)
    })
      .then((speciesInfo) => {
        pokemon.flavorText = speciesInfo.flavor_text_entries.filter((x) => x.language.name === 'en' && x.version.name === 'yellow')[0].flavor_text;
        resolve(pokemon);
      })

  }
  });
  
}


window.App = App;
ReactDOM.