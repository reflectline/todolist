import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import AppWithRedux from './AppWithRedux/AppWithRedux';
import {store} from './store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);





root.render(
    <Provider store={store}>
        <BrowserRouter>
            {/*<App/>*/}
            {/*<AppWithReducers/>*/}
            <AppWithRedux demo={false}/>
        </BrowserRouter>
    </Provider>
);

