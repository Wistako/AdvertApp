import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import initialStore from './initialstore';

// import reducers
import adverts from './advertsRedux';
import user from './userRedux';

// combine reducers
const rootReducer = combineReducers({
  adverts,
  user
});

const store = createStore(
  rootReducer,
  initialStore,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

export default store;
