import React, {Component, Fragment } from 'react';
import {hot} from 'react-hot-loader/root';
// Components

class App extends Component {
  render() {
    console.log('APP渲染了 -----> ', this.props)
    return (
      <Fragment>
        <h1>ReactSSR showing</h1>
        <h1>devserver 2局部更新</h1>
      </Fragment>
    )
  }
}

App.defaultProps = {
  from: 'client'
}

export default hot(App);