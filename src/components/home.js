import React from 'react'
import {Link} from 'react-router';

export default React.createClass({

  getInitialState() {
      return {
          content: '',
          title: ''
      }
  },

  componentWillMount() {
      let quoteSrc = 'http://quotes.rest/qod.json?';
      $.get(quoteSrc, (results) => {
          let quote = results.contents.quotes[0];
          this.setState({
              content: quote.quote,
              title: quote.author
          });
          document.body.style.backgroundImage = `url(${quote.background})`;
      });

      let height = window.innerHeight;
      let width = window.innerWidth;
      let backgroundSrc = `http://loremflickr.com/${width}/${height}/nature`;
      //document.body.style.backgroundImage = `url(${backgroundSrc})`;
      document.body.style.backgroundSize = `${width}px ${height}px`;
      document.body.style.backgroundRepeat = 'no-repeat';
  },

  componentWillUnmount() {
      document.body.style.backgroundImage = '';
  },

  render() {

    return (
      <div className="quote">
        <p>{this.state.content}</p>
        &mdash; {this.state.title}
      </div>
    )
  }
})
