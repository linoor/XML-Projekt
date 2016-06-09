import React from 'react';

// Components
import Nav from './components/nav.js';

const App = React.createClass({
  render() {
    return (
      <div className="col-xs-10 col-xs-offset-1">
        <Nav />

        {this.props.children}
      </div>
    );
  }
});

export default App;
