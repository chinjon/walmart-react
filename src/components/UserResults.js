import React, {Component} from 'react';

import data from './../../tests/small.json'

class StoredResults extends Component {
    constructor(props){
        super(props);

        this.state ={
            data
        }
    }
    render(){
        return(
            <div>
                <ul>
                    {
                        data.map((e,i)=>{
                            return <li key={i}><span className="is-96x96"><img src={e.thumbnailImage} alt={e.name} /></span><a href={e.productUrl}>{e.name}</a><span className="icon is-medium"><i className="fa fa-external-link"></i></span></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default StoredResults;