import {createStore, combineReducers} from 'redux';

const INITIAL_STATE = {
  hideSettings: false,
  password: '',
  url: 'https://google.com',
}

const reducer = (state = INITIAL_STATE, action) => { 
  switch (action.type) { 
    case 'HIDE_SETTINGS' : 
      return {...state, hideSettings: action.hideSettings}
    case 'SET_PASSWORD': 
      return {...state, password: action.password} 
    case 'SET_WEBSITE' : 
      return {...state, url: action.url}
    default:
      return state;
  }
}

export const reducers = combineReducers({  
  user: reducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;