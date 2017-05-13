import React, {Component} from 'react';

class StoredResults extends Component {
    constructor(props){
        super(props);

        this.state ={
            data: ""
        }
    }


    componentDidMount() {
        if(localStorage.getItem("walmartStash")) {
            console.log("We found some stuff")
            this.setState({
                data: JSON.parse(localStorage.getItem("walmartStash"))
            });

            console.log(this.state.data)
        } else {
            console.log("This stash is empty")
        }
    }


    render(){
        const {data} = this.state;
        return(
            <div>
                <ul>
                    {
                        data ? 
                        data.map((e,i)=>{
                            return <li key={i}><span className="is-96x96"><img src={e.thumbnailImage} alt={e.name} /></span><a href={e.productUrl}>{e.name}</a><span className="icon is-medium"><i className="fa fa-external-link"></i></span></li>
                        }) : null
                    }
                </ul>
            </div>
        )
    }
}

export default StoredResults;