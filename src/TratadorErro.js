import PubSub from 'pubsub-js';

export default class TratadorErro{

    publicaErros(erros){
        erros.errors.forEach(erro => {
            console.log(erro);
            PubSub.publish("erro-validacao", erro);
        });
    }

}