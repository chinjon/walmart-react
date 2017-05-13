import React, {Component} from 'react'

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            walmartStash: ""
        }
    }

    setUserItems(items){
        this.setState({
            walmartStash: items
        })
    }

    componentDidMount() {
        if(localStorage.getItem("walmartStash")){
           let retrieveStash = JSON.parse(localStorage.getItem("walmartStash"));
           this.setState({
               walmartStash: retrieveStash
           })
        } else {
            console.log("Sorry the stash is empty")
        }
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