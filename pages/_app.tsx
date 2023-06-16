import { useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd'
import { globalStyles } from '../template/theme'
import '../styles/globals.css'
import {
  QueryClientProvider,
  QueryClient,
} from "react-query";
import { useStore } from '../store/useStore';



const queryClient = new QueryClient();
const { defaultAlgorithm, darkAlgorithm } = theme;


function MyApp({ Component, pageProps }) {

  const mode = useStore(state => state.mode);
  let newAlgorithm = mode === "Dark" ? darkAlgorithm : defaultAlgorithm;

  return (
    <ConfigProvider
      theme={{
        token: globalStyles,
        algorithm: newAlgorithm,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ConfigProvider>


  )

}

export default MyApp
