import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react';
// import { wrapper } from '../redux/store'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'


function MyApp({ Component, pageProps }) {
  
  const getLayout = Component.getLayout || ((page) => page);

  
  return <Provider store={store}>
    {
      store.getState()?.authentication?.isAuthenticated ?
        getLayout(
          <ThemeProvider enableSystem={true} attribute="class">
            <LocalizationProvider  dateAdapter={AdapterMoment}>
              <Component {...pageProps} />
              <ToastContainer
                position="top-right"
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
              />
            </LocalizationProvider>
          </ThemeProvider>
        )
        :
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
          />
        </ThemeProvider>
    }
  </Provider>
}

export default MyApp
// export default wrapper.withRedux(MyApp)
