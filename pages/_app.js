import Layout from "../components/layout"
import styles from "../styles/globals.css"


export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
 
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
  <Layout>
     <Component {...pageProps} />
  </Layout>
  )
}