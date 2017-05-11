import React, {Component} from 'react';

const style = {
    display: "inline-block"
}



export default class SearchBar extends Component {
    render(){
        return(
            <div >
                <SearchInput placeholder="Search Query" style={style}/>
                <AdvancedSearch style={style}/>
            </div>
        )
    }
}


class SearchInput extends Component {
    render(){
        return(
          <input placeholder={this.props.placeholder}/>
        )
    }
}

class AdvancedSearch extends Component {
    render() {
        return (
            <span>
                <SearchInput placeholder="Brand Name"/>
                <SearchInput placeholder="Results" />
            </span>
        )
    }
}