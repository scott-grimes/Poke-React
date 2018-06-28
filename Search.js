var Search = (props) => (
  <div className="search-bar form-inline">
  <form className ="search-form" onSubmit = {(event) => { event.preventDefault(); props.buildFetch();}}>
    <input className="form-control" type="text" />
    <submit className="btn hidden-sm-down">
      <span className="glyphicon glyphicon-search"></span>
    </submit>
    </form>
  </div> 
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
