import React, {Component} from 'react';

export default class Footer extends Component {
    render() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="content has-text-centered">
                <p>
                    Built with anxiety and coffee by <strong>Jonathan Chin</strong>.
                </p>
                <p>
                    <a className="button" href="https://github.com/chinjon" target="_blank">
                    <i className="fa fa-github is-dark"></i>
                    </a>
                </p>
                </div>
            </div>
        </footer>
    )
    }
}