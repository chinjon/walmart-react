import React, {Component} from 'react';

export default class SearchInput extends Component {
    render() {
        return (
        <input
            className="input"
            placeholder={this.props.placeholder}
            type={this.props.type}
            name={this.props.name}
            min={this.props.min}
            max={this.props.max}
            list={this.props.list}
            onChange={this.props.onChange}
        />)
    }
}