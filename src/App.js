import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

import axios from 'axios';

import MenuBar from './components/MenuBar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.walmartlabs.com/v1/search?apiKey=ymvvan7nrev6tffvye9cjdyd&&query=jeans&format=json`)
    .then(res =>{
      console.log("axios fired");
      console.log(res.data)
      this.setState({items: res.data})
    })
  }


  render() {
    return (
      <div>
        <MenuBar />
      </div>
    );
  }
}


const SearchInput = () =>(
  <Input focus placeholder="Search..." />
)




export default App;
