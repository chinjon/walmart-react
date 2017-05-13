import React, {Component} from 'react';
import { fadeInUp } from 'react-animations';
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
    }
}

class StoredResults extends Component {
    constructor(props){
        super(props);

        this.state ={
            data: ""
        }

        this.renderTable = this.renderTable.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
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


    handleDeleteItem(){

    }

    renderTable(data) {
        return (
                                            
            <table className="table has-text-centered" >

                <thead>
                    <tr>
                        <th>Product</th>
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
                                
                            <tr key={i} style={[style.fadeInUp, style.tableItem]}>
                                <td>
                                    <span>
                                        <img style={style.itemImg} src={e.img} alt={e.name} className="is-pulled-left"/>
                                        {e.name}
                                    </span>
                                    <button className="button is-pulled-right is-outlined ">
                                        <a href={e.url} target="_blank">
                                        <span className="icon is-small">
                                            <i className="fa fa-external-link" aria-hidden="true"></i>
                                        </span>
                                        </a>
                                    </button>
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
                                    <span>{Math.floor(e.reviews.rating)} <strong>({e.reviews.numReviews})</strong></span>
                                </td>
                                <td>
                                    <button className="button is-danger is-outlined">
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

    componentDidUpdate(){

    }

    render(){
        const {data} = this.state;
        return(
            <div style={style.table}>
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