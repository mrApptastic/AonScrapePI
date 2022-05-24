import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderView from './Header';
import PageView from './Page';
import './style.css';

interface AppProps {}

interface AppState {
  book: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      book: '01fftd',
    };
    this.bookChangeEvent = this.bookChangeEvent.bind(this);
  }

  bookChangeEvent(event) {
    this.setState({ book: event });
    // alert(event);
  }

  render() {
    return (
      <div>
        <HeaderView />
        <PageView changeBook={this.bookChangeEvent} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
