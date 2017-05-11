import React, { Component } from 'react';

import SearchBar from './components/SearchBar';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: ''
    };
  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default App;
