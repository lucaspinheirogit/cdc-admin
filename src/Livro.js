import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from './components/CustomInput';
import PubSub from 'pubsub-js';
import TratadorErro from './TratadorErro';

class TabelaLivros extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map((livro) => {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autorId}</td>
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

class FormularioLivro extends Component {

    constructor() {
        super();
        this.state = {
            titulo: '',
            preco: '',
            autorID: ''
        }
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify(
                {
                    titulo: this.state.titulo,
                    preco: this.state.preco,
                    autorId: this.state.autorId
                }
            ),
            success: () => {

                var novaLista = [...this.props.lista, {
                    titulo: this.state.titulo,
                    preco: this.state.preco,
                    autorId: this.state.autorId
                }];

                PubSub.publish('atualiza-lista-livros', novaLista);

                this.setState({
                    titulo: '',
                    preco: '',
                    autorId: ''
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

    setTitulo(evt) {
        this.setState({
            titulo: evt.target.value
        })
    }

    setPreco(evt) {
        this.setState({
            preco: evt.target.value
        })
    }

    setAutorId(evt) {
        this.setState({
            autorId: evt.target.value
        })
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={(evt) => this.enviaForm(evt)}>

                    <CustomInput label="Título" id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={(evt) => this.setTitulo(evt)} />
                    <CustomInput label="Preço" id="preco" type="text" name="preco" value={this.state.preco} onChange={(evt) => this.setPreco(evt)} />

                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select value={this.state.autorID} name="autorId" id="autorID" onChange={(evt) => this.setAutorId(evt)}>
                            <option value="">Selecione autor</option>
                            {
                                this.props.autores.map(function (autor) {
                                    return <option value={autor.id}>{autor.nome}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>

            </div>
        )
    }

}


export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = {
            lista: [],
            autores: []
        };
    }

    componentWillMount() {
        fetch("https://cdc-react.herokuapp.com/api/livros")
            .then(response => response.json())
            .then(resposta => {
                this.setState({
                    lista: resposta.slice(0,10)
                })
            });
        PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) => {
            this.setState({
                lista: novaLista
            });
        })

        fetch("https://cdc-react.herokuapp.com/api/autores")
            .then(response => response.json())
            .then(resposta => {
                this.setState({
                    autores: resposta.slice(0,10)
                })
            });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div>
                    <FormularioLivro autores={this.state.autores} lista={this.state.lista} />
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        )
    }

}