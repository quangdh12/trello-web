import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'
import { CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        dialogProps: { maxWidth: 'xs' },
        confirmationButtonProps: { color: 'primary', variant: 'contained' },
        cancellationButtonProps: { color: 'inherit' },
        buttonOrder: ['confirm', 'cancel']
      }}>
        <CssBaseline>
          <App />
          <ToastContainer theme='colored' position='bottom-left' />
        </CssBaseline>
      </ConfirmProvider>
    </CssVarsProvider>
  </React.StrictMode>,
)
