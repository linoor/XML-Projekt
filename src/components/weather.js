import React from 'react';

let Jumbotron = React.createClass({
   render() {
       return (
           <div className="jumbotron">
               <h1 className="display-3">Welcome to the weather dashboard!</h1>
               <p className="lead">Change some input fields to generate results</p>
           </div>
       )
   }
});

export default React.createClass({
  getInitialState() {
      return {
        coords: null,
      };
  },

  componentWillMount() {
      navigator.geolocation.getCurrentPosition(coords => {
        this.setState({coords: {latitude: coords.latitude, longitude: coords.longitude}});
      })
  },

  render() {
      console.log(this.state.coords);
    return(
        <div>
            <Jumbotron />
        </div>
    )
  }
});
