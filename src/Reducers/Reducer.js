import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducer from './index';

export default function createReducer(extraReducerObjects = {}) {
  return combineReducers({
    reducer,
    form: formReducer,
    ...extraReducerObjects,
  });
}