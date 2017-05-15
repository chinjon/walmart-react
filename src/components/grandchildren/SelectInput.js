import React, {Component} from 'react';

export default class SelectInput extends Component {
    render() {
        return (
        <select className="input" value={this.props.value} onChange={this.props.onChange}>
            <option value="" disabled selected>Sort By</option>
            <option value="relevance">Relevance</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
            <option value="bestseller">Best Seller</option>
            <option value="customerRating">Customer Rating</option>
            <option value="new">New</option>
        </select>
        )
    }
}