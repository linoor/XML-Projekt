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
            secondSelect: 'EUR',
            amount: 0
        }
    },

    handleChange() {
        let url = `http://api.fixer.io/latest?base=${this.state.firstSelected}`;
        $.get(url, results => {
            this.setState({rate: results.rates[this.state.secondSelect]});
        })
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
        let result = 15.56;

        return (
            <div>
                <div onChange={this.handleChange} className="form-group">
                  <CurrencyInput selected={this.state.firstSelect}
                                 txt="From:"
                                 currencies={this.state.currencies}
                                 update={(val) => {this.setState({firstSelect: val})}} />
                  <CurrencyInput selected={this.state.secondSelect}
                                 txt="To:"
                                 currencies={this.state.currencies}
                                 update={(val) => {this.setState({secondState: val})}} />
                  <NumberInput value={this.state.amount} update={(val) => this.setState({amount: val})} />
                  <Results result={result} />
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
              <select onChange={this.handleClick} className="form-control" ref="select">
                  {options}
              </select>
            </div>
        )
    }
});

let NumberInput = React.createClass({

    handleChange() {
     this.props.update(this.refs.input.value)
    },

    render() {
        return (
            <div class="input-group">
              <input onChange={this.handleChange}
                     type="number"
                     type="text" className="form-control" placeholder="Amount"
                     ref="input"
                     value={this.props.value} />
            </div>
        )
    }
})

let Results = React.createClass({
    render() {
        return (
            <div className="text-center">
                {this.props.result}
            </div>
        )
    }
})
