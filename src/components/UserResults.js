import React, {Component} from 'react';

import Radium from "radium";

const style = {
    table: {
        margin: "4em auto",
        border: "solid #000 1px",
        padding: "3em",
        borderRadius: "10px",
    },
    itemImg: {
        width: 50,
        height: 50
    }
}

class StoredResults extends Component {
    constructor(props){
        super(props);

        this.state ={
            data: ""
        }

        this.renderTable = this.renderTable.bind(this);
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

    renderTable(data) {
        return (
            <table className="table has-text-centered" style={style.table}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>MSRP</th>
                        <th>Reviews</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data ?
                        data.map((e,i)=>{
                            return (
                            <tr key={i}>
                                <td>
                                    <span>
                                        <img style={style.itemImg} src={e.img} alt={e.name} className="is-pulled-left"/>
                                        {e.name}
                                    </span>
                                </td>
                                <td>
                                    {e.category}
                                </td>
                                <td>
                                    {e.price.toFixed(2)}
                                </td>
                                <td>
                                    {e.msrp.toFixed(2)}
                                </td>
                                <td>
                                    <span>{Math.floor(e.reviews.rating)}<strong>({e.reviews.numReviews})</strong></span>
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

    componentDidUpdate(){

    }

    render(){
        const {data} = this.state;
        return(
            <div>
                <ul>
                    {
                        this.renderTable(data)
                    }
                </ul>
            </div>
        )
    }
}

export default Radium(StoredResults);