import React, {Component} from 'react';
import {KEY} from './../hide';

import SearchInput from './grandchildren/SearchInput';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: "",
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchWalmartSearch = this.fetchWalmartSearch.bind(this);
        this.setSearchResults = this.setSearchResults.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this);
    }

    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value});
        console.log(this.state[name]);
        if(this.state[name]) {
            this.fetchWalmartSearch(this.state[name])
        }
        event.preventDefault();
    }

    setSearchResults(results) {
    this.setState({results})
    console.log("setSearchResults() called")
    console.log(this.state.results)
}
    componentDidMount(){
        // const {query} = this.state;
        // this.fetchWalmartSearch(query)
    }

    fetchWalmartSearch(query) {
        fetch(`https://cors.now.sh/https://api.walmartlabs.com/v1/search?apiKey=${KEY}&query=${query}&format=json`)
            .then(response => response.json())
            // .then(result => console.log(result));
            .then(result => this.setSearchResults(result.items));
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.fetchWalmartSearch(this.state.query);
    }

    /*renderDropDown(data) {
        return (
            <div className="field">
                <p className="control">
                    <span className="select">
                    <select>
                        <option>Enter New Search</option>
                        {
                            data.map((e,i)=>{
                               return <option key={i} value={i}>{e.name}</option>
                            })
                        }
                    </select>
                    </span>
                </p>
            </div>
        )
    }*/
    renderDropDown(data) {
        return (
            <datalist id="resultItems">
                <span clasName="control">
                    <select>
                    {
                        data.map((e,i)=>{
                            return <option key={i} value={e.name}/>
                        })
                    }
                </select>
                </span>
                
            </datalist>
                       
        )
    }

    render() {
        const {results} = this.state;
        return (
            <div>
                <form className="field is-horzontal" onSubmit={this.handleSubmit}>
                    <div className="field-body is-grouped">
                        <div className="control is-expanded">
                             <SearchInput    
                                placeholder="Search Query"
                                list="resultItems"
                                type="text"
                                value={this.state.query}
                                onChange={this.onInputChange.bind(this)}
                                name="query"
                            />
                            {
                                results.length > 0 ? 
                                this.renderDropDown(results)             
                                : 
                               null

                            }
                        </div>
                        <button className="control button" type="submit">Submit</button>

                   
                    </div>
                    
                </form>


            </div>
        )
    }
}
