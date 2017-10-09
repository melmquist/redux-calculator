import { createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


import { evalQueueReducer } from './evalQueue.js';
import { resultReducer } from './result.js';
import { storageReducer } from './storage.js';

const rootReducer = combineReducers({
    evalQueue: evalQueueReducer,
    result: resultReducer,
    storage: storageReducer
    
});

let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)

let store = createStoreWithMiddleware(rootReducer);

export default store;