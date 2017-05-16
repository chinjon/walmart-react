import React, {Component} from 'react';
import { fadeInUp } from 'react-animations';

import SearchInput from './grandchildren/SearchInput';

import Radium, {StyleRoot} from "radium";

const style = {
    table: {
        margin: "4em auto",
        border: "solid #000 1px",
        padding: "3em",
        borderRadius: "10px",
    },
    itemImg: {
        width: 50,
        height: 50,
        marginRight: "1.5em"
    },
    fadeInUp: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
    },
    tableItem: {
        padding: "5em"
    },
    externalBtn: {
        marginLeft: "1em",
        clear: "right",
        display: "inline-block"
    }
}

class StoredResults extends Component {
    constructor(props){
        super(props);

        this.state ={
            data: "",
            isSorted: false,
            sortOrder: 0,
            searchUserStorage: "",
            editing: false,
            editTD: null,
        }

        this.renderTable = this.renderTable.bind(this);
        this.getNewItemsArr = this.getNewItemsArr.bind(this);
        this.findItemToDelete = this.findItemToDelete.bind(this);
        this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
        this.updateLocalStorage = this.updateLocalStorage.bind(this);
        this.sortUserArrResults = this.sortUserArrResults.bind(this);
        this.sortFunction = this.sortFunction.bind(this);
        this.handleSortClick = this.handleSortClick.bind(this);
        this.handleUserStorageSearch = this.handleUserStorageSearch.bind(this);
        this.onBrandNameCellClick = this.onBrandNameCellClick.bind(this);
        this.renderRegularTableData = this.renderRegularTableData.bind(this);
        this.renderEditTableData = this.renderEditTableData.bind(this);
        this.saveEditedBrandNameBtn = this.saveEditedBrandNameBtn.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem("walmartStash")) {
            console.log("We found some stuff")
            const stored = JSON.parse(localStorage.getItem("walmartStash"));
            console.log(stored)
            this.setState({
                data: stored
            });
        } else {
            console.log("This stash is empty")
        }
    }

    onDeleteBtnClick = event => {
        const itemId = event.target.value;
        if(itemId) {
            const parsedId = parseInt(itemId,10);
            console.log(parsedId)
            this.updateLocalStorage(this.findItemToDelete(parsedId, this.getNewItemsArr))
        } else {
            console.log("No itemId detected from action")
        }

        this.setState({
            data: JSON.parse(localStorage.getItem("walmartStash"))
        })
    }

    findItemToDelete(item, callback) {
        const {data} = this.state;
        function findItem(dataArr) {
            return dataArr.itemId === item
        }  
       return callback(data.find(findItem))
    }

    updateLocalStorage(newArr) {
       if(typeof newArr === "object") {
           localStorage.setItem("walmartStash", JSON.stringify(newArr))
       } else {
           console.log("Incorrect data type")
       }
    }

    sortFunction = (a,b) => {
            const itemA = a.name.toUpperCase();
            const itemB = b.name.toUpperCase();

            let comparison = 0;
            if(itemA > itemB) {
                comparison = 1
            } else if (itemA < itemB) {
                comparison = -1
            }
            return comparison
    }

    sortUserArrResults(data) {
       return data.sort(this.sortFunction);
    }

    handleSortClick = event =>{
        const {isSorted, data, sortOrder} = this.state;
        if(!isSorted) {
            if(sortOrder === 0 || sortOrder === -1) {
                this.setState({
                    data: this.sortUserArrResults(data),
                    sortOrder: 1
                })
            } else {
                this.setState({
                    data: this.sortUserArrResults(data).reverse(),
                    sortOrder: -1
                })
            }
        } else {
            if(!sortOrder) {
                this.setState({
                    data: this.sortUserArrResults(data),
                    sortOrder: 1
                })
            } else {
                this.setState({
                    data: this.sortUserArrResults(data).reverse(),
                    sortOrder: -1
                })
            }
        }
    }

     handleUserStorageSearch(event){
        event.preventDefault()
        const userSearch = event.target.value
        const localStoreArr = JSON.parse(localStorage.getItem("walmartStash"));
        if(!userSearch) {
            this.setState ({
                data: localStoreArr
            })
        } else {
            function filterSearch(item) {
                return item.name.slice(0, userSearch.length).toLowerCase() === userSearch.toLowerCase()
            }

              this.setState ({
                data: localStoreArr.filter(filterSearch)
              })

        }
    }

    renderRegularTableData(){
        return (
            <p></p>
        )
    }

    renderEditTableData() {
        return (
            <span>
                <input />
                <button 
                    className="button"
                    onClick={this.saveEditedBrandNameBtn}
                >
                    Save
                </button>
            </span>
        )
    }

    getNewItemsArr(item){
        const {data} = this.state;
        function newArr(arr) {
            return arr.itemId !== item.itemId
        }
        return data.filter(newArr);
    }

    onBrandNameCellClick=(val) => {
         // console.log(val)
        if(this.state.editing === false) {
            this.setState({
                editing: true,
                editTD: val
            })
            console.log(this.state.editTD)
        } 
    }

    saveEditedBrandNameBtn=event=>{

        this.setState({
            editing: false,
            editTD: null
        })
    }

    renderTable(data) {
        return (                                          
            <table className="table has-text-centered is-bordered is-striped" >
                <thead>
                    <tr>
                        <th>
                            Product 
                            <button 
                                className="button is-pulled-right is-small"
                            onClick={this.handleSortClick}
                            >
                                <i className="fa fa-arrow-down"></i>
                            </button>
                        </th>
                        <th>Brand Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>MSRP</th>
                        <th>Reviews</th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        data ?
                        data.map((e,i)=>{
                            return (
                                
                            <tr key={e.itemId} style={[style.fadeInUp, style.tableItem]}>
                                <td>
                                    <span>
                                        <img style={style.itemImg} src={e.img} alt={e.name} className="is-pulled-left"/>
                                        {e.name}
                                    </span>
                                        <a href={e.url} style={style.externalBtn} className="button is-pulled-right is-outlined" target="_blank">
                                        <span className="icon is-small">
                                            <i className="fa fa-external-link is-dark"></i>
                                        </span>
                                        </a>
                                </td>



                                <td 
                                    key={e.itemId} 
                                    onClick={()=>this.onBrandNameCellClick(e.itemId)}
                                >   
                                   {
                                       this.state.editing && this.state.editTD === e.itemId 
                                       ? 
                                     this.renderEditTableData()
                                       : 
                                      
                                        this.renderRegularTableData()
                                   }
                                   
                                </td>



                                <td>
                                    {e.category}
                                </td>
                                <td>
                                    {`$${e.price.toFixed(2)}`}
                                </td>
                                <td>
                                    {`$${e.msrp.toFixed(2)}`}
                                </td>
                                <td>
                                    <span>{Math.floor(e.reviews.rating)} <i className="fa fa-star"></i><strong><small>({e.reviews.numReviews})</small></strong></span>
                                </td>
                                <td>
                                    <button className="button is-danger is-outlined" value={e.itemId} onClick={this.onDeleteBtnClick}>
                                        <span className="icon is-small">
                                            <i className="fa fa-trash"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>

                            )
                        }) 
                        : null
                    }

                </tbody>
            </table>

        )
    }

    render(){
        const {data} = this.state;
        return(
            <div style={style.table}>
                <div className="columns">
                    <div className="column is-3">
                        <div className="field">
                            <p className="control has-icons-left">
                                <SearchInput 
                                    placeholder="Search Products"
                                    onChange={this.handleUserStorageSearch}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-search"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="column is-3 is-offset-2">
                        <p><em>{this.state.data.length} of {JSON.parse(localStorage.getItem("walmartStash")).length} products</em></p>
                    </div>
                </div>
                <StyleRoot>
                    {
                        this.renderTable(data)
                    }
                </StyleRoot>
            </div>
        )
    }
}

export default Radium(StoredResults);