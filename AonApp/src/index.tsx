import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import DataView from './Data';
import HeaderView from './Header';
import PageView from './Page';
import MainView from './MainView';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <HeaderView />
        <PageView />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
