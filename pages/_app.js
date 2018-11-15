import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { NoSsr } from '@material-ui/core'
import JssProvider from 'react-jss/lib/JssProvider';
import GlobalSnackbar from '../components/GlobalSnackbar'
import getPageContext from '../page-context';
import withReduxStore from '../redux-config/with-redux-store';
// import Localization from '../containers/Localization';

@withReduxStore
export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }
  
  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}>
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Provider store={reduxStore}>
                <Fragment>
                  <GlobalSnackbar />
                  <Component pageContext={this.pageContext} {...pageProps} />
                </Fragment>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}
