import React, {Component} from 'react'

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userLocalItems: []
        }
    }

    setUserItems(items){
        this.setState({
            
        })
    }

    render(){
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}

export default Search;