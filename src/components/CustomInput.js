import React, { Component } from 'react';

class CustomInput extends Component {

    render() {
        var { label, id, type, name, value, onChange } = this.props;
        return (
            <div className="pure-control-group">
                <label htmlFor="nome">{label}</label>
                <input id={id} type={type} name={name} value={value} onChange={onChange} />
            </div>
        )
    }

}

export default CustomInput;