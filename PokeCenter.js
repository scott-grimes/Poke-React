var PokeCenter = ({pokemon}) => {

  if(!pokemon.name){
    return(
      <div>
        Loading...
      </div> 
      )
  }
  

return(
  <div style={{'display': 'grid' , 'gridTemplateColumns': '1fr 1fr'}}>
    <div id="left" style={{'gridColumnStart':'1' , 'gridColumnEnd':'2'}}>
    <img src={pokemon.image}/>
    </div>
    <div id="right" style={{'gridColumnStart':'2' , 'gridColumnEnd':'3'}}>
    <h3>{pokemon.name}</h3>
    {pokemon.types.map((type)=> type+' ')}
    <div>{pokemon.flavorText}</div>
    </div>
  </div>
);

};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.PokeCenter = PokeCenter;
