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

  render() {
    return (
      <div className="quote">
        <p>{this.state.quote.content}</p>
        &mdash; {this.state.quote.title}
      </div>
    )
  }
})
