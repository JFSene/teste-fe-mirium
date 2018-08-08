import _ from 'lodash';
import { FETCH_USER } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_USER:
        //Usa lodash para mapear cada item do array e transforma em um objeto
        //Key:Value para melhor utilização ao longo da aplicação
        return _.mapKeys(action.payload.data, 'id');
    default:
        return state;
    }
}