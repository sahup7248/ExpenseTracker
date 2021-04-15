/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from './context/context';
import App from './App';
import './index.css';

ReactDOM.render(    
    <SpeechProvider appId="31996958-7466-44c4-a167-c9cecdfea343" language="en-US">
        <Provider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </SpeechProvider>, 
    document.getElementById('root')
);
