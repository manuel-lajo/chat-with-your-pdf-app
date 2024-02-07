import PdfViewer from '@/components/Pdf/PdfViewer'
import ChatManager from '@/components/Chat/ChatManager'

const PDF_URL = 'https://prosper-assist-llm.s3.amazonaws.com/prosper-conversations/hiscox_gl_fe_challenge.pdf'

const ChatWithPdf = () => {
  return (
    <div className="flex flex-col-reverse xl:flex-row w-full xl:h-full">
      <div className="w-full xl:w-1/2 h-[32rem] xl:h-full border border-stone-500">
        <PdfViewer fileUrl={PDF_URL} />
      </div>
      <div className="flex flex-col w-full xl:w-1/2 h-[calc(100vh-10rem)] xl:h-full border border-stone-500">
        <ChatManager />
      </div>
    </div>

  )
}

export default ChatWithPdf
