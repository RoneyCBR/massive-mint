import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import Page from './components/Page';
import WalletProvider from 'hooks/WalletContext';
import StatusTxContext from 'hooks/StatusTxContext';
import {I18nextProvider} from 'react-i18next'
import i18n from './i18n';
import DrawerMobileProvider from 'hooks/DrawerMobileContext';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import './App.css';

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <DrawerMobileProvider>
        <WalletProvider> 
          <StatusTxContext>
            <Page>
              <Router history={browserHistory}>
                <Routes />
              </Router>
            </Page>
          </StatusTxContext>
        </WalletProvider>
      </DrawerMobileProvider>
    </I18nextProvider>
  );
};

export default App;
