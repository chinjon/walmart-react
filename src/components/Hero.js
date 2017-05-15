import React, {Component} from 'react'

class Hero extends Component {

       render() {
        return (
            <section className="hero is-info has-text-centered is-bold is-medium">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-1 is-spaced">
                            Walmart Stash
                        </h1>
                        <h2 className="subtitle">
                            Powered By React JS and Walmart's Search API
                        </h2>
                    </div>
                </div>
            </section>
        )
    }
}

export default Hero;