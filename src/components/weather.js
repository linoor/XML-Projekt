import React from 'react';

let apiKey = "1b8ccc12e5520e98f5f03b4cdcd4ac9f";

let data = {
    temp: 74,
    unit: 'celsius',
    city: 'Kraków',
    wind: 'se'
};

let Weather = React.createClass({

  render() {
      let unit = this.props.data.unit === 'celsius' ? 'C' : 'F';

      return (
          <div>
              <div className="row">
                  <div className="cols-xs-6 col-xs-offset-3 temp">
                      <i className="icon wi wi-day-sunny"></i>
                      <span className="">{this.props.data.temp}</span>
                      <span className="">°{unit}</span>
                  </div>
              </div>
              <div className="row">
                  asd
              </div>
          </div>
      )
  }
});

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
          coords: null
      };
  },

  componentWillMount() {
      navigator.geolocation.getCurrentPosition(geoposition => {
        this.setState({coords: geoposition.coords});
      })
  },

  render() {
    return(
        <div>
            <Jumbotron />
            <Weather data={data} />
        </div>
    )
  }
});
