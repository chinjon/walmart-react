import React, {Component} from 'react';
import {KEY} from './../hide';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: "",
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchWalmartSearch = this.fetchWalmartSearch.bind(this)
        this.setSearchResults = this.setSearchResults.bind(this)
    }

    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value});
        event.preventDefault();
    }

    setSearchResults(results) {
    this.setState({results})
    console.log("setSearchResults() called")
    console.log(this.state.results)
    }

    fetchWalmartSearch(query,) {
        fetch(`https://cors.now.sh/https://api.walmartlabs.com/v1/search?apiKey=${KEY}&query=${query}&format=json`)
            .then(response => response.json())
            // .then(result => console.log(result));
            .then(result => this.setSearchResults(result.items));
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.query)
        this.fetchWalmartSearch(this.state.query);
    }

    render() {
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                <SearchInput
                    placeholder="Search Query"
                    type="text"
                    value={this.state.query}
                    onChange={this.onInputChange.bind(this)}
                    name="query"
                />
                <p>
                    <button type="submit">Submit</button>
                </p>
                </form>
            </div>
        )
    }
}


class SearchInput extends Component {
    render() {
        return (
        <input
            placeholder={this.props.placeholder}
            type={this.props.type}
            name={this.props.name}
            onChange={this.props.onChange}
        />)
    }
}


/*class AdvancedSearch extends Component {
    render() {
        return (
            <span>
                <SearchInput placeholder="Brand Name"/>
                <SearchInput placeholder="Results"/>
            </span>
        )
    }
}*/