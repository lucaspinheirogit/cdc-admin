import React, { Component } from 'react';
import CustomInput from './components/CustomInput';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      nome: ''
    }
  }

  salvaAlteracao(evento, nomeInput) {
    console.log(nomeInput);
    console.log(evento);

    this.setState({ [nomeInput]: evento.target.value });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <CustomInput label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={(evt) => this.salvaAlteracao(evt, 'nome')} />
      </div>
    )
  }
}

export default Home;