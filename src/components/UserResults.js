import React, {Component} from 'react';

import Radium from "radium";


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
            <table className="table">
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
                                <td><span><img src={e.img} alt={e.name}/>{e.name}</span></td>
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

export default StoredResults;