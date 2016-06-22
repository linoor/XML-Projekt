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
            amount: 0,
            rate: 0
        }
    },

    handleChange() {
        let url = `http://api.fixer.io/latest?base=${this.state.firstSelect}`;
        $.get(url, results => {
            this.setState({rate: results.rates[this.state.secondSelect]});
        })
    },

    reverse() {
        let firstSelect = this.state.firstSelect;
        this.setState({
            firstSelect: this.state.secondSelect,
            secondSelect: firstSelect
        }, this.handleChange)
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
        let result = (this.state.rate * this.state.amount).toFixed(2);

        let firstOptions = this.state.currencies.filter(s => s !== this.state.secondSelect);
        let secondOptions = this.state.currencies.filter(s => s !== this.state.firstSelect);

        return (
            <div className="">
                <div onChange={this.handleChange} className="form-group">
                  <div className="row">
                      <div className="col-xs-3 col-xs-offset-2">
                          <CurrencyInput selected={this.state.firstSelect}
                                         txt="From:"
                                         currencies={firstOptions}
                                         update={(val) => {this.setState({firstSelect: val})}} />
                      </div>
                      <div className="col-xs-2 text-center">
                          <Reverser onClick={this.reverse} />
                      </div>
                      <div className="col-xs-3">
                          <CurrencyInput selected={this.state.secondSelect}
                                         txt="To:"
                                         currencies={secondOptions}
                                         update={(val) => {this.setState({secondSelect: val})}} />
                      </div>
                  </div>
                  <div className="row">
                     <div className="col-xs-8 col-xs-offset-2">
                         <NumberInput value={this.state.amount} update={(val) => this.setState({amount: val})} />
                     </div>
                  </div>
                    <div className="row">
                        <div className="col-xs-8 col-xs-offset-2 text-center">
                            <Results result={result} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

let CurrencyInput = React.createClass({

    handleClick() {
        this.props.update(this.refs.select.value);
    },

    render() {
        let options = this.props.currencies.map(c => {
            return <option value={c}>{c}</option>
        });

        return (
            <div>
              <label>{this.props.txt}</label>
              <select onChange={this.handleClick} value={this.props.selected} className="form-control" ref="select">
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
            <div id="result">
                {this.props.result}
            </div>
        )
    }
})

let Reverser = React.createClass({
    render() {
        return (
            <div>
                <span id="reverser" onClick={this.props.onClick} className="glyphicon glyphicon-refresh"/>
            </div>
        )
    }
})
