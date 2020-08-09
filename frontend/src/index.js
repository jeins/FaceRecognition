import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  StylesProvider,
} from '@material-ui/core/styles';
import App from './components/app';

ReactDOM.render((
  <StylesProvider injectFirst>
    <ThemeProvider theme={createMuiTheme()}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StylesProvider>
), document.getElementById('root'));
