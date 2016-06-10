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
           <div className="col-xs-3 smallinfo">
               <div className="well">
                   <span>{this.props.name}</span>
                   <i className={classes}></i>
               </div>
           </div>
       )
   }
});

let Weather = React.createClass({

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
                  <SmallInfo name="Wind" class="wi wi-direction-up" />
                  <SmallInfo name="Moon Phase" class="wi wi-moon-waxing-crescent-4" />
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
