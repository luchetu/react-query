import { ConfigProvider } from 'antd'
import { globalStyles } from '../template/theme'
import '../styles/globals.css'
import {
  QueryClientProvider,
  QueryClient,
} from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {

  return (
    <ConfigProvider
      theme={{
        token: globalStyles,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ConfigProvider>


  )

}

export default MyApp
