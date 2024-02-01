import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider as BusProvider} from '@/hooks/useBus'

//css全局样式
import '@/styles/global.scss'
import {Provider} from "react-redux";
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BusProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </BusProvider>
);
