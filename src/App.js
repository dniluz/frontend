import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import About from './views/About';
import NoPage from './views/NoPage';
import Contact from './views/Contact';
import Partner from './views/Partner';
import Login from './views/Login';
import Account from './views/Account';
import Transactions from './views/Transactions';
import Policies from './views/Policies';
import Support from './components/sections/Support';
import ResetPassword from './views/ResetPassword';
import AdminPanel from './views/AdminPanel';
import Buy from './views/Buy';
import ForgotPassword from './views/ForgotPassword';

// Contexts
import { AuthContextProvider } from './contexts/AuthContext';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
            '& .MuiInputBase-input': { 
              color: 'white',
            },
          },
        },
      },
    },
    //style Modal & Box
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBox-root': {
            backgroundColor: '#1e1e1e',
            color: 'white',
          }
        }
      }
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7da03b',
    },
    text: {
      primary: '#9CA9B3',
      secondary: '#fff',
    },
  },
});

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <ScrollReveal
          ref={childRef}
          children={() => (
            <Switch>
              <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
              <AppRoute exact path="/buy" component={Buy} layout={LayoutDefault} />
              <AppRoute exact path="/user-account" component={Account} layout={LayoutDefault} />
              <AppRoute exact path="/partner" component={Partner} layout={LayoutDefault} />
              <AppRoute exact path="/about-us" component={About} layout={LayoutDefault} />
              <AppRoute exact path="/contact-us" component={Contact} layout={LayoutDefault} />
              <AppRoute exact path="/transactions" component={Transactions} layout={LayoutDefault} />
              <AppRoute exact path="/policies" component={Policies} layout={LayoutDefault} />
              <AppRoute exact path="/support" component={Support} layout={LayoutDefault} />
              <AppRoute exact path="/login" component={Login} layout={LayoutDefault} />
              <AppRoute exact path="/forgot-password" component={ForgotPassword} layout={LayoutDefault} />
              <AppRoute exact path="/admin-portal" component={AdminPanel} layout={LayoutDefault} />
              <AppRoute exact path="/reset_password/:resetToken" component={ResetPassword} layout={LayoutDefault} />
              <AppRoute exact path="*" component={NoPage} layout={LayoutDefault} /> {/* Leave this on the bottom :)*/}
            </Switch>
          )} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;