import { createContext } from 'react'

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation'
import { searchPlugin } from '@react-pdf-viewer/search'

// We can update this context to include and expose more pdf-viewer-context plugins and functionalities 
const PdfViewerContext = createContext({
  defaultLayoutPluginInstance: null,
  pageNavigationPluginInstance: null,
  searchPluginInstance: null,
  jumpToPage: pageIndex => { },
  highlight: keyword => Promise,
})

export const PdfViewerContextProvider = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const pageNavigationPluginInstance = pageNavigationPlugin()
  const searchPluginInstance = searchPlugin()

  const { jumpToPage } = pageNavigationPluginInstance
  const { highlight } = searchPluginInstance

  return (
    <PdfViewerContext.Provider
      value={{
        defaultLayoutPluginInstance,
        pageNavigationPluginInstance,
        searchPluginInstance,
        jumpToPage,
        highlight,
      }}
    >
      {props.children}
    </PdfViewerContext.Provider>
  )
}

export default PdfViewerContext
