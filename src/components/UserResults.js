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
                            return <li key={i}><span className="is-96x96"><img src={e.thumbnailImage} alt={e.name} /></span><a href={e.productUrl}>{e.name}</a></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default StoredResults;