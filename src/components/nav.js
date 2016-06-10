import React from 'react'
import {Link} from 'react-router';

export default React.createClass({

  isActive(page) {
    return this.props.location === page;
  },

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Dashboard</a>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li className={this.isActive('weather') ? 'active' : ''}><Link to="/weather">Weather</Link></li>
            <li><Link to="/page2">Page 2</Link></li>
          </ul>
        </div>
      </div>
        </nav>
    )
  }
})
