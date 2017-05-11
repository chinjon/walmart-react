import React, {Component} from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ""
        }
        this.onInputChange = this
            .onInputChange
            .bind(this);
    }

    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value});
        event.preventDefault();
    }

    fetchWalmartSearch(query) {
        fetch(`https://api.walmartlabs.com/v1/search?apiKey=ymvvan7nrev6tffvye9cjdyd&query=${query}s&format=json`)
            .then(response => response.json())
            .then(result => console.log(result));
    }

    handleSubmit(e) {
        e.preventDefault();

    }

    render() {
        return (
            <div >
                <SearchInput placeholder="Search Query"/>
                <AdvancedSearch/>
            </div>
        )
    }
}

class AdvancedSearch extends Component {
    render() {
        return (
            <span>
                <SearchInput placeholder="Brand Name"/>
                <SearchInput placeholder="Results"/>
            </span>
        )
    }
}

class SearchInput extends Component {
    render() {
        return (<input placeholder={this.props.placeholder}/>)
    }
}
