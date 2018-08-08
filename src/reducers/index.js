import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form'; //rename for better reading
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  users: UserReducer,
  form: formReducer
});

export default rootReducer;