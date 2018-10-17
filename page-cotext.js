/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import {
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import createTypography from '@material-ui/core/styles/createTypography';
import createPalette from '@material-ui/core/styles/createPalette';

// A theme with custom primary and secondary color.
// It's optional.

const theme = () => {
  const palette = createPalette({
    primary: {
      light: grey[900],
      main: grey[900],
      dark: grey[900]
    },
    secondary: {
      light: grey[50],
      main: grey[50],
      dark: grey[100]
    },
  });
  const typography = createTypography(palette, {
    fontFamily: 'Muli',
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#5f6368',
    },
    caption: {
      fontSize: 13,
      color: '#acacac'
    },
    subheading: {
      fontSize: 20,
      color: '#4f5863',
      fontWeight: 'bold'
    },
    display1: {
      fontSize: '27px',
      fontWeight: 600,
      color: '#fff'
    }
  });


  return createMuiTheme({
    palette,
    typography,
    overrides: {
      MuiButton: {
        containedPrimary: {
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '50px',
          backgroundColor: '#ff6f00',
          fontWeight: 'bolder',
          lineHeight: 'normal',
          letterSpacing: '0.05em'
        }
      }
    }
  });
};

function createPageContext() {
  return {
    theme: theme(),
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
