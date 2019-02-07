import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Links extends Component {

    render() {
        return (
            <ul className="pure-menu-list">
                <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
            </ul>
        )
    }
}

export default Links;