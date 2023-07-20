import { useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd'
import { globalStyles } from '../template/theme'
import '../styles/globals.css'
import { store } from '../store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {



  return (
    <ConfigProvider
      theme={{
        token: globalStyles,
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ConfigProvider>


  )

}

export default MyApp
