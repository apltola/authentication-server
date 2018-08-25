import React, { Component } from 'react';

import '../styles/sass/demo.scss';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <div>ASYNC DEMO PAGE WITH CODE SPLITTING <span>🚧</span></div>
        <div className='sass-demo'>
          this is styled with sass
        </div>
      </div>
    )
  }
}
