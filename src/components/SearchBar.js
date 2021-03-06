import React, {Component} from 'react';
import Radium from 'radium';
import {KEY} from './../hide.js';

import SearchInput from './grandchildren/SearchInput';
import SelectInput from './grandchildren/SelectInput';

const style = {
    searchBar:{
        marginTop: "1em",
        border: "solid #000 1px",
        padding: "3em",
        borderRadius: "10px",
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advancedSearch: true,
            query: "",
            start: "1",
            numItems: "10",
            results: "",
            sortBy: "relevance",
            advancedSearchOptions: false,
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchWalmartSearch = this.fetchWalmartSearch.bind(this);
        this.setSearchResults = this.setSearchResults.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this);
        this.handleSendToLocalStorage = this.handleSendToLocalStorage.bind(this);
        this.grabSelectItemFromArr = this.grabSelectItemFromResults.bind(this);
        this.setToLocalStorage = this.setToLocalStorage.bind(this);
        this.checkIfAddedAlready = this.checkIfAddedAlready.bind(this);
    }


    onInputChange = event => {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value});

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
                    brandName: "",
                    category: e.categoryPath,
                    img: e.thumbnailImage,
                    upc: e.upc,
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
        const {start,numItems,sortBy} = this.state;
        const endURL = `&sort=${sortBy}&numItems=${numItems}&start=${start}`;
        fetch(`https://cors.now.sh/https://api.walmartlabs.com/v1/search?apiKey=${KEY}&query=${query}${endURL}&format=json`)
            .then(response => response.json())
            .then(result => this.setSearchResults(result.items));
    }

    handleSendToLocalStorage = event => {
        event.preventDefault();
        const {results, query} = this.state;
        let storeItem = this.grabSelectItemFromResults(results, query);
        this.setToLocalStorage(storeItem);
    }

    // onAdvancedClick(event){
    //     this.setState =({sortBy: !this.state.sortBy})
    //     console.log(this.state.sortBy)
    // }

    setToLocalStorage(item){
        const stashedItems = JSON.parse(localStorage.getItem("walmartStash"));
        if(stashedItems) {
            if(!this.checkIfAddedAlready(item)) {
                const newArr = stashedItems.concat(item);
                localStorage.setItem("walmartStash", JSON.stringify(newArr));
                alert(`Item stored!`)
            } else {
                alert('Item already exists!');
            }
        } else {
            localStorage.setItem("walmartStash", JSON.stringify(item))
            alert(`Item stored!`)
        }
    }


    checkIfAddedAlready(item) {
        const localStorageArr = JSON.parse(localStorage.getItem("walmartStash"));

        function checkArr(arrItem,i, arr) {
            return arrItem.itemId === item.itemId
        }
        return localStorageArr.some(checkArr)
    }

    grabSelectItemFromResults(data, userSelect) {
        let foundItem = data.filter((e)=>{
            return e.name === userSelect;
        })
        return foundItem;
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    renderDropDown(data) {
        return (
            <datalist id="resultItems" value={this.state.selectDropdown}>
                <span className="control">
                    <select onChange={this.onInputChange} name="selectDropdown" value={this.state.selectDropdown}>
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
                                <SearchInput 
                                    placeholder="Results"
                                    onChange={this.onInputChange}
                                    value={this.state.numItems}
                                    type="number"
                                    min="0"
                                    max="25"
                                    name="numItems"
                                />
                            </p>
                        </div>
                        <div className="field">
                                <p className="control is-expanded">
                                    <SearchInput 
                                    placeholder="Start At"
                                    onChange={this.onInputChange}
                                    value={this.state.start}
                                    type="number"
                                    min="0"
                                    max="30"
                                    name="start"
                                />
                                </p>
                        </div>
                        <div className="field">
                                <p className="control is-expanded">
                                    <SelectInput 
                                        value={this.state.sortBy}
                                        onChange={this.onAdvancedClick}
                                    />
                                </p>
                        </div>

                            <button 
                                className="control button is-primary" 
                                type="submit" 
                                onClick={this.handleSendToLocalStorage.bind(this)}
                            >
                                Save Item
                            </button>               
                        </div>
                </form>


            </div>
        )
    }
}



export default Radium(SearchBar);