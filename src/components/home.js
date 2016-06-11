import React from 'react'
import {Link} from 'react-router';

export default React.createClass({

  getInitialState() {
      return {
          content: '',
          author: '',
          background: 'lol',
      }
  },

  componentWillMount() {
      let quoteSrc = 'http://quotes.rest/qod.json?';
      if (localStorage.getItem('content') === null ||
          localStorage.getItem('author') === null ||
          localStorage.getItem('background') === null) {
          $.get(quoteSrc, (results) => {
              let quote = results.contents.quotes[0];
              let content = quote.quote;
              let author = quote.author;
              let background = quote.background;
              this.setState({
                  content: content,
                  author: author,
                  background: background,
              });
              localStorage.setItem('content', content);
              localStorage.setItem('author', author);
              localStorage.setItem('background', background);
              document.body.style.backgroundImage = `url(${this.state.background})`;
          });
      } else {
          this.setState({
              content: localStorage.getItem('content'),
              author: localStorage.getItem('author'),
              background: localStorage.getItem('background'),
          });
          document.body.style.backgroundImage = `url(${localStorage.getItem('background')})`;
      }

      let height = window.innerHeight;
      let width = window.innerWidth;
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
        &mdash; {this.state.author}
      </div>
    )
  }
})
