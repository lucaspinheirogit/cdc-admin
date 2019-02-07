import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class CustomInput extends Component {

    constructor() {
        super();
        this.state = {
            msgErro: ''
        }
    }

    render() {
        var { label, id, type, name, value, onChange } = this.props;
        return (
            <div className="pure-control-group">
                <label htmlFor="nome">{label}</label>
                <input {...this.props} />
                <span style={{ color: 'red' }} > {this.state.msgErro} </span>
            </div>
        )
    }

    componentDidMount() {
        PubSub.subscribe("erro-validacao", (topico, erro) => {
            if (erro.field === this.props.name) {
                this.setState({
                    msgErro: erro.defaultMessage
                })
            }
        })

        PubSub.subscribe("limpa-erros", topico =>
            this.setState({
                msgErro: ''
            })
        )
    }

}

export default CustomInput;