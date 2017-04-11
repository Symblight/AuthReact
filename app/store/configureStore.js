import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducersApp from '../reducers/index'

export default function configurationStore(initialState) {
    let store = createStore(
        reducersApp,
        initialState,
        applyMiddleware(thunk)
    );

    return store;
}