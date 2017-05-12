import React, { Component } from 'react';

import Hero from './components/Hero';
import Search from './components/Search';
import SearchBar from './components/SearchBar';
import UserResults from './components/UserResults';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localItems: []
    };
    // this.storeItemLocal = this.storeItemLocal.bind(this)
  }

  // storeItemLocal(e){
  //   e.preventDefault();
  //   this.state.localItems.push(item);
  //   this.setState({localItems: this.state.localItems});
  // }

  render() {
    return (
      <div>
        <Hero/>
        <Search>
          <SearchBar/>
          <UserResults />
        </Search>
      </div>
    );
  }
}

export default App;
