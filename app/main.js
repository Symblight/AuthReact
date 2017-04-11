import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { MuiThemeProvider } from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
injectTapEventPlugin();

let store = configureStore();

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store = {store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('react-root')
)