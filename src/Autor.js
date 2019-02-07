import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from './components/CustomInput';
import PubSub from 'pubsub-js';
import TratadorErro from './TratadorErro';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            senha: ''
        }
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: () => {

                var novaLista = [...this.props.lista, {
                    nome: this.state.nome,
                    email: this.state.email,
                }];

                PubSub.publish('atualiza-lista-autores', novaLista);

                this.setState({
                    nome: '',
                    email: '',
                    senha: ''
                })
            },
            error: function (resposta) {
                if (resposta.status === 400) {
                    new TratadorErro().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }

    salvaAlteracao(nomeInput, evento) {
        console.log(nomeInput);
        console.log(evento);
        
        this.setState({ [nomeInput]: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={(evt) => this.enviaForm(evt)}>

                    <CustomInput label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={(evt) => this.salvaAlteracao(evt, 'nome')} />
                    <CustomInput label="Email" id="email" type="email" name="email" value={this.state.email} onChange={(evt) => this.salvaAlteracao(evt, 'nome')} />
                    <CustomInput label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={(evt) => this.salvaAlteracao(evt, 'nome')} />

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

export default class AutorBox extends Component {

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
            });
        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
            this.setState({
                lista: novaLista
            });
        })
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div>
                    <FormularioAutor lista={this.state.lista} />
                    <TabelaAutores lista={this.state.lista} />
                </div>
            </div>
        )
    }

}