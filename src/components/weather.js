import React from 'react';

let apiKey = "1b8ccc12e5520e98f5f03b4cdcd4ac9f";

let data = {
    temp: 74,
    unit: 'celsius',
    city: 'Kraków',
    wind: 'se'
};

let SmallInfo = React.createClass({
   render() {
       let classes = `${this.props.class} push-right`;

       return (
               <button type="button" className="btn btn-default smallinfo">
                   <span>{this.props.name}</span>
                   <i className={classes}></i>
               </button>
       )
   }
});

let Weather = React.createClass({

  getInitialState() {
      return {
          data: null
      }
  },

  componentWillMount() {
  },

  render() {
      let unit = this.props.data.unit === 'celsius' ? 'C' : 'F';
      let windClass = `wi wi-towards-n`;

      return (
          <div className="text-center">
              <div className="row city">
                  <span>{this.props.data.city}</span>
              </div>
              <div className="row temp">
                      <i className="icon wi wi-day-sunny"></i>
                      <span className="">{this.props.data.temp}</span>
                      <span className="">°{unit}</span>
              </div>
              <div className="row">
                  <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                      <SmallInfo name="Wind" class="wi wi-direction-up" />
                      <SmallInfo name="Humidity" class="wi wi-humidity" />
                      <SmallInfo name="Moon Phase" class="wi wi-moon-waxing-crescent-4" />
                  </div>
              </div>
          </div>
      )
  }
});

let Jumbotron = React.createClass({
   render() {
       return (
           <div className="jumbotron text-center">
               <h1 className="display-3">Welcome to the weather dashboard!</h1>
               <p className="lead">Change some input fields to generate results</p>
           </div>
       )
   }
});

export default React.createClass({
  getInitialState() {
      return {
          data, null
      };
  },

  componentWillMount() {
      if (localStorage.getItem('data') === null) {
          navigator.geolocation.getCurrentPosition(geoposition => {
              this.setState({coords: geoposition.coords});
              let coords = geoposition.coords;
              let lat = Math.round(coords.latitude);
              let lon = Math.round(coords.longitude);
              let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`;
              $.get(url, (results) => {
                 this.setState({data: results});
                 localStorage.setItem('data', results)
              });
          });
      } else {
        this.setState({data: localStorage.getItem('data')});
      }
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
