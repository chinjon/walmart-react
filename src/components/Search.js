import React, {Component} from 'react'

import Radium from 'radium';

const style = {
    base: {
        margin: "4em 2.5em"
    }
}


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
           console.log(this.state.walmartStash);
        } else {
            console.log("Sorry the stash is empty");
        }
    }

    render(){
        return (
            <div className="container">
                <div className="columns" style={style.base}>
                    <div className="column">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Radium(Search);