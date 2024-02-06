import { useContext } from 'react'
import PdfViewerContext from '@/context/pdf-viewer-context'

import { Viewer, Worker, ProgressBar } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const PdfViewer = ({ fileUrl }) => {
  const {
    defaultLayoutPluginInstance,
    pageNavigationPluginInstance,
    searchPluginInstance,
  } = useContext(PdfViewerContext)

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        fileUrl={fileUrl}
        plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance, searchPluginInstance]}
        renderLoader={percentages => (
          <div className="w-[240px]">
            <ProgressBar progress={Math.round(percentages)} />
          </div>
        )}
      />
    </Worker>
  )
}

export default PdfViewer
