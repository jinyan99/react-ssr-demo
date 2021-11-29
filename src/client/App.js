import React, {Component, Fragment } from 'react';
import {hot} from 'react-hot-loader/root';
// Components

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>ReactSSR showing</h1>
        <h1>devserver 2局部更新</h1>
      </Fragment>
    )
  }
}

export default hot(App);