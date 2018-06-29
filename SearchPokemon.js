

class SearchPokemon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '', suggestions: [], namesList: props.namesList};
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);

  }

  onChange(event, {newValue}) {
    this.setState({value: newValue});
  }

  onSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({suggestions: []});
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    console.log(inputValue, inputLength);
    return inputLength === 0 ? [] : this.state.namesList.filter(name=>{
      return name.slice(0, inputLength) === inputValue;
    });
  }

  renderSuggestion(suggestion) {
    return (<div>{suggestion}</div>);
  }

  submitHandler(e) {
    e.preventDefault();
    this.props.fetchByName(this.state.value);
  }

  render() {

    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Search for a pokemon...',
      value: this.state.value,
      onChange: this.onChange
    };
    
    //<input className="form-control" type="text" />
    return (
      <div>
        <form className ="search-form" onSubmit = {this.submitHandler.bind(this)}>
          <Autosuggest
            suggestions = {suggestions}
            onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
            onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
            getSuggestionValue = {(x)=>x}
            renderSuggestion = {this.renderSuggestion}
            inputProps = {inputProps}
          />
          <submit className="btn hidden-sm-down">
            <span className="glyphicon glyphicon-search"></span>
          </submit>
        </form>
      </div> 
    );
  } 
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// var declarations will only exist globally where explicitly defined
window.SearchPokemon = SearchPokemon;

