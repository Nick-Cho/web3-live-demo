import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Mainnet, DAppProvider, MoonbaseAlpha, Moonbeam} from '@usedapp/core';
import StarField from './dependencies/scenes/StarScene'

// import star from './dependencies/images/star.png'
const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://eth-mainnet.g.alchemy.com/v2/J038e3gaccJC6Ue0BrvmpjzxsdfGly9n',
    [MoonbaseAlpha.chainId]: 'https://rpc.api.moonbase.moonbeam.network/',
    [Moonbeam.chainId]: 'https://rpc.api.moonbeam.network/'
  },
  refresh: 'never'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
        {StarField()}
        <App/>
    </DAppProvider>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
