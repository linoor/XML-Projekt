import React from 'react';

let apiKey = 'aGYvbFTWY2mshdTiXDkj9iMe40Zlp1cPS6bjsn1PhRVzEBHpuL';

export default React.createClass({
  render() {
    return(
      <div>
          <div className="row">
              <Jumbotron message="Welcome to the finance dashboard!" />
          </div>
          <div className="row">
              <CurrencyChanger />
          </div>
      </div>
    )
  }
});

let Jumbotron = React.createClass({
    render() {
        return (
            <div className="jumbotron text-center">
                <h1 className="display-3">{this.props.message}</h1>
                <p className="lead">Change some input fields to generate results</p>
            </div>
        )
    }
});

let CurrencyChanger = React.createClass({
    getInitialState() {
        return {
            currencies: [],
            firstSelect: 'PLN',
            secondSelect: 'EUR'
        }
    },

    componentWillMount () {
        let crossOrigin = 'https://crossorigin.me/';
        let url = 'http://api.fixer.io/latest';
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            dataType: 'json',
            success: data => {
               let all = (Object.keys(data.rates) + "," + [data.base]).split(',');
               this.setState({currencies: all})
            },
            error: function(err) { alert(err); },
        });
    },

    render () {
        return (
            <div>
                <div className="form-group">
                  <CurrencyInput selected={this.state.firstSelect}
                                 txt="From:"
                                 currencies={this.state.currencies}
                                 update={(val) => {
                                    this.setState({firstSelect: val})
                                  }} />
                  <CurrencyInput selected={this.state.secondSelect}
                                 txt="To:"
                                 currencies={this.state.currencies}
                                 update={(val) => {
                                    this.setState({secondState: val})
                                  }} />
                </div>
            </div>
        )
    }
});

let CurrencyInput = React.createClass({

    handleClick() {
        this.props.update(this.refs.select.selected);
    },

    render() {
        let options = this.props.currencies.map(c => {
            return this.props.selected === c ? <option selected>{c}</option> : <option>{c}</option>;
        });

        return (
            <div>
              <label>{this.props.txt}</label>
              <select onClick={this.handleClick} className="form-control" ref="select">
                  {options}
              </select>
            </div>
        )
    }
});
