import { PdfViewerContextProvider } from '@/context/pdf-viewer-context'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
    <PdfViewerContextProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </PdfViewerContextProvider>
  )
}
