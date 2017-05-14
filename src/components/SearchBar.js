import React, {Component} from 'react';
import Radium from 'radium';
import {KEY} from './../hide.js';

import SearchInput from './grandchildren/SearchInput';

const style = {
    searchBar:{
        marginTop: "5em",
        border: "solid #000 1px",
        padding: "3em",
        borderRadius: "10px",
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advancedSearch: false,
            query: "",
            results: "",
            selectDropdown: ""
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchWalmartSearch = this.fetchWalmartSearch.bind(this);
        this.setSearchResults = this.setSearchResults.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this);
        this.handleSendToLocalStorage = this.handleSendToLocalStorage.bind(this);
        this.grabSelectItemFromArr = this.grabSelectItemFromResults.bind(this);
        this.setToLocalStorage = this.setToLocalStorage.bind(this);
    }

    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value});
        console.log(`state set for ${name}`, this.state[name]);

        if(target.value) {
            this.fetchWalmartSearch(this.state[name])
        }
        event.preventDefault();
    }
   

    setSearchResults(results) {
        const trimmedResults = results.map((e)=>{
                let newObj = {
                    name: e.name,
                    itemId: e.itemId,
                    category: e.categoryPath,
                    img: e.thumbnailImage,
                    price: e.salePrice,
                    msrp: e.msrp || 0,
                    reviews: {
                        rating: e.customerRating || 0,
                        numReviews: e.numReviews || 0
                    },
                    url: e.productUrl
                }
                return newObj;
            })
            this.setState({results: trimmedResults});
    }

    fetchWalmartSearch(query) {
        fetch(`https://cors.now.sh/https://api.walmartlabs.com/v1/search?apiKey=${KEY}&query=${query}&format=json`)
            .then(response => response.json())
            .then(result => this.setSearchResults(result.items));
    }

    handleSendToLocalStorage = event => {
        event.preventDefault();
        const {results, query} = this.state;
        console.log("handleSendToLocalStorage() fired");
        let storeItem = this.grabSelectItemFromResults(results, query);
        console.log(storeItem);
        this.setToLocalStorage(storeItem);
    }

    setToLocalStorage(item){
        const stashedItems = JSON.parse(localStorage.getItem("walmartStash"));
        if(stashedItems) {
            const newArr = stashedItems.concat(item);
            localStorage.setItem("walmartStash", JSON.stringify(newArr));
        } else {
            localStorage.setItem("walmartStash", JSON.stringify(item))
        }
        
    }

    grabSelectItemFromResults(data, userSelect) {
        console.log(userSelect);
        let foundItem = data.filter((e)=>{
            return e.name === userSelect
        })
        return foundItem
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("value is ", this.state.query)
    }

    renderDropDown(data) {
        return (
            <datalist id="resultItems" value={this.state.selectDropdown}>
                <span className="control">
                    <select onChange={this.onInputChange.bind(this)} name="selectDropdown" value={this.state.selectDropdown}>
                        {
                            data.map((e,i)=>{
                                return <option data-itemId={e.itemId} key={i} value={e.name}/>
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
            <div style={style.searchBar}>
                <form className="field is-horzontal" onSubmit={this.handleSubmit}>
                    <div className="field-body">
                        <div className="field">
                             <p className="control is-expanded">
                             <SearchInput    
                                placeholder="Search Query"
                                list="resultItems"
                                type="text"
                                value={this.state.query}
                                onChange={this.onInputChange.bind(this)}
                                name="query"
                            />
                            {
                                results.length > 0 ? this.renderDropDown(results): null
                            }
                            </p>
                        </div>
                       <div className="field">
                       <p className="control is-expanded">
                            <SearchInput />
                        </p>
                       </div>
                        
                        <button className="control button is-primary" type="submit" onClick={this.handleSendToLocalStorage.bind(this)}>Save Item</button>               
                    </div>
                    
                </form>


            </div>
        )
    }
}

export default Radium(SearchBar);