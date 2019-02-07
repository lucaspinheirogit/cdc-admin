import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './css/pure-min.css';
import './css/side-menu.css';

import AutorBox from './Autor';
import LivroBox from './Livro';
import Home from './Home';
import Links from './Links';

class App extends Component {

  render() {
    return (
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">REACT</a>

            <Links/>
            
          </div>
        </div>

        <div id="main">
          <div className="content" id="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/autor" component={AutorBox} />
              <Route exact path="/livro" component={LivroBox} />
            </Switch>
          </div>
        </div>


      </div>
    );
  }
}

export default App;