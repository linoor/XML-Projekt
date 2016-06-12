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
      if (sessionStorage.getItem('content') === null ||
          sessionStorage.getItem('author') === null ||
          sessionStorage.getItem('background') === null) {
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
              sessionStorage.setItem('content', content);
              sessionStorage.setItem('author', author);
              sessionStorage.setItem('background', background);
              document.body.style.backgroundImage = `url(${this.state.background})`;
          });
      } else {
          this.setState({
              content: sessionStorage.getItem('content'),
              author: sessionStorage.getItem('author'),
              background: sessionStorage.getItem('background'),
          });
          document.body.style.backgroundImage = `url(${sessionStorage.getItem('background')})`;
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
