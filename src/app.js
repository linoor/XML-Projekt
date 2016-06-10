import React from 'react';

// Components
import Nav from './components/nav.js';

const App = React.createClass({
  getInitialState() {
      return {
          backgroundStyle: {}
      }
  },

  changeBackground() {
      let backgroundImageSrc = `http://loremflickr.com/${window.screen.availWidth}/${window.screen.availHeight}/nature`;
      let backgroundStyle = {
          backgroundImage: `url(${backgroundImageSrc})`,
          backgroundSize: `${window.screen.availWidth}px ${window.screen.availHeight}px`,
          backgroundRepeat: 'no-repeat'
      };
      this.setState({backgroundStyle: backgroundStyle})
  },

  render() {
    return (
        <div style={this.state.backgroundStyle}>
            <div className="col-xs-10 col-xs-offset-1">
                <Nav />

                {React.cloneElement(this.props.children, {changeBackground: this.changeBackground})}
            </div>
        </div>
    );
  }
});

export default App;
