import React, { Component } from 'react';
import CustomInput from './components/CustomInput';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            senha: ''
        }
    }

    enviaForm(evt) {
        evt.preventDefault();

        fetch("https://cdc-react.herokuapp.com/api/autores", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nome: this.state.nome,
                    email: this.state.email,
                    senha: this.state.senha
                }
            )
        })
            .then(resposta => {
                console.log(this.props.lista);
                
                var novaLista = [...this.props.lista, {
                    nome: this.state.nome,
                    email: this.state.email,
                }];

                console.log(novaLista);
                

                this.props.CBAtualizaLista(novaLista);
                this.setState({
                    nome: '',
                    email: '',
                    senha: ''
                })
            }).catch(error => {
                console.log(error);
            });

    }

    setNome(evt) {
        this.setState({
            nome: evt.target.value
        })
    }

    setEmail(evt) {
        this.setState({
            email: evt.target.value
        })
    }

    setSenha(evt) {
        this.setState({
            senha: evt.target.value
        })
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={(evt) => this.enviaForm(evt)}>

                    <CustomInput label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={(evt) => this.setNome(evt)} />
                    <CustomInput label="Email" id="email" type="email" name="email" value={this.state.email} onChange={(evt) => this.setEmail(evt)} />
                    <CustomInput label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={(evt) => this.setSenha(evt)} />

                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>

            </div>
        )
    }

}

class TabelaAutores extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map((autor) => {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default class Autor extends Component {

    constructor() {
        super();
        this.state = {
            lista: [],
        };
    }

    componentDidMount() {
        fetch("https://cdc-react.herokuapp.com/api/autores")
            .then(response => response.json())
            .then(resposta => {
                resposta = resposta.slice(0, 10);
                this.setState({
                    lista: resposta
                })
            })
    }

    AtualizaLista(novaLista) {
        this.setState({
            lista: novaLista
        });   
    }

    render() {
        return (
            <div>
                <FormularioAutor lista={this.state.lista} CBAtualizaLista={(novaLista) => this.AtualizaLista(novaLista)} />
                <TabelaAutores lista={this.state.lista} />
            </div>
        )
    }

}