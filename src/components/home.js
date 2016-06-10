import React from 'react'
import {Link} from 'react-router';

export default React.createClass({

  getInitialState() {
      return {
          quote: {
              content: 'A goal is a dream with a deadline.',
              title: 'Napoleon Hill'
          }
      }
  },

  componentWillMount() {
      let height = document.documentElement.clientHeight + 400;
      let backgroundSrc = `http://loremflickr.com/${window.screen.availWidth}/${height}/nature`;
      console.log(backgroundSrc)
      document.body.style.backgroundImage = `url(${backgroundSrc})`;
      document.body.style.backgroundSize = `${window.screen.availWidth}px ${window.screen.availHeight}px`;
      document.body.style.backgroundRepeat = 'no-repeat';
  },

  componentWillUnmount() {
      document.body.style.backgroundImage = '';
  },

  render() {

    return (
      <div className="quote">
        <p>{this.state.quote.content}</p>
        &mdash; {this.state.quote.title}
      </div>
    )
  }
})
