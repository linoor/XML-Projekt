import React from 'react';

let apiKey = "1b8ccc12e5520e98f5f03b4cdcd4ac9f";


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
          data: {
              name: ``,
              main: {
                  humidity: 0,
                  pressure: 0
              },
              sys: {
                  sunrise: 0,
                  sunset: 0
              },
              weather: [{
                  description: ``,
                  id: 800
              }],
              wind: {
                  speed: 0,
                  deg: 90
              }
          }
      };
  },

  componentWillMount() {
      if (sessionStorage.getItem(`data`) === null) {
          navigator.geolocation.getCurrentPosition(geoposition => {
              this.setState({coords: geoposition.coords});
              let coords = geoposition.coords;
              let lat = Math.round(coords.latitude);
              let lon = Math.round(coords.longitude);
              let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`;
              $.get(url, (results) => {
                 this.setState({data: results});
                 let data = JSON.stringify(results);
                 sessionStorage.setItem(`data`, data);
              });
          });
      } else {
        let data = $.parseJSON(sessionStorage.getItem(`data`));
        this.setState({data: data});
      }
  },

  render() {
    let data = $.parseJSON(sessionStorage.getItem(`data`)) || this.state.data;
    return(
        <div>
            <Jumbotron />
            <Weather data={data} />
        </div>
    )
  }
});

let Weather = React.createClass({

    getInitialState() {
        return {
            data: null,
            unit: 'fahrenheit',
        }
    },

    componentWillMount() {
        this.setState({
            unit: this.props.data.unit === 'celsius' ? 'C' : 'F'
        })
    },

    updateUnit(unit) {
        let newUnit = unit === 'F' ? 'celsius' : 'fahrenheit';
        console.log(unit);
        console.log(newUnit);
        this.setState({unit: newUnit})
    },

    render() {
        let humidity = `${this.props.data.main.humidity}%`;
        let pressure = `${this.props.data.main.pressure} hPa`;
        let sunriseTime = new Date(this.props.data.sys.sunrise * 1000).toTimeString();
        let sunrise = `${sunriseTime}`;
        let sunsetTime = new Date(this.props.data.sys.sunset * 1000).toTimeString();
        let sunset = `${sunsetTime}`;
        let description = this.props.data.weather[0].description;

        let degrees = Math.round(this.props.data.wind.deg);
        let windDirection = `wi wi-wind`;
        let windSpeed = this.props.data.wind.speed;
        let windInfo = `${windSpeed} km/h`;

        let mainIcon = `icon wi wi-owm-${this.props.data.weather[0].id}`;

        return (
            <div className="text-center">
                <div className="row city">
                    <p>{this.props.data.name}</p>
                </div>
                <div className="row temp">
                    <i className={mainIcon}></i>
                    <span className="">{this.props.data.main.temp}</span>
                    <TempUnit unit={this.state.unit} updateUnit={this.updateUnit}/>
                    <p>{description}</p>
                </div>
                <div className="row">
                    <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                        <SmallInfo name={windInfo} class={windDirection} degrees={degrees}/>
                        <SmallInfo name={humidity} class="wi wi-humidity" />
                        <SmallInfo name={pressure} class="wi wi-barometer" />
                    </div>
                    <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                        <SmallInfo name={sunrise} class="wi wi-sunrise" />
                        <SmallInfo name={sunset} class="wi wi-sunset" />
                    </div>
                </div>
            </div>
        )
    }
});

function getWindStyles (degrees) {
    return {
        WebkitTransform: `rotate(${degrees})`,
        MozTransform: `rotate(${degrees}deg)`,
        MsTransform: `rotate(${degrees}deg)`,
        OTransform: `rotate(${degrees}deg)`,
        transform: `rotate(${degrees}deg)`
    };
}

let TempUnit = React.createClass({
    handleClick () {
        console.log(this.refs.unit.textContent);
       this.props.updateUnit(this.refs.unit.textContent);
    },

    render() {
        let unit = this.props.unit === 'celsius' ? 'C' : 'F';
        return <span onClick={this.handleClick} ref="unit">{unit}</span>
    }
})

let SmallInfo = React.createClass({
    render() {
        let classes = `${this.props.class} push-right`;
        let style = this.props.degrees !== null ? getWindStyles(this.props.degrees) : {};
        let unit = this.props.unit === 'fahrenheit' ? 'F' : 'C';

        return (
            <button type="button" className="btn btn-default smallinfo">
                <i className={classes} style={style}></i>
                <span>{this.props.name}</span>
            </button>
        )
    }
});
