import '../styles/globals.css'
import '../styles/dock.css'
import '../styles/infinite.css'
import '../styles/cursor-chat.css'
import '../styles/NavBar.css'

import type { AppPropsWithLayout } from '../types/layoutTypes'
import Layout from '../components/layout';


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout> {page} </Layout>)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
