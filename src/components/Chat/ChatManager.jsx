import { useState, useEffect, useRef, useContext } from 'react'

import PdfViewerContext from '@/context/pdf-viewer-context'
import useToast from '@/hooks/use-toast'
import useRequest from '@/hooks/use-request'

import ChatMessages from '@/components/Chat/ChatMessages'
import ChatSampleQuestion from '@/components/Chat/ChatSampleQuestion'
import ChatQuestionInput from '@/components/Chat/ChatQuestionInput'

import {
  MESSAGE_TYPE,
  SAMPLE_QUESTION,
  parseCitations, scheduleScrollToBottomMessage,
  scheduleFocusQuestionInput,
} from '@/utils/chat-utils'

const TIMEOUT_CODE = 'ECONNABORTED'

const ChatManager = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [showSample, setShowSample] = useState(true)

  const questionInputRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const {
    jumpToPage: jumpToPdfPage,
    highlight: highlightPdfKeywords,
  } = useContext(PdfViewerContext)

  const { showErrorToast } = useToast()
  const { request: requestAnswer } = useRequest('/assistant/ask_question')

  useEffect(() => {
    questionInputRef.current.focus()
  }, [])

  const handleSubmitQuestion = event => {
    event.preventDefault()
    askQuestion()
  }

  const askSampleQuestion = () => {
    questionInputRef.current.value = SAMPLE_QUESTION
    setShowSample(false)
    askQuestion()
  }

  const askQuestion = async () => {
    let question = questionInputRef.current?.value.trim()
    if (question !== '') {
      questionInputRef.current.value = ''

      // Display question and loading answer preview on the chat
      setMessages(prevMessages => {
        let clonedMessages = structuredClone(prevMessages)
        clonedMessages.push(
          { type: MESSAGE_TYPE.QUESTION, content: question },
          { type: MESSAGE_TYPE.ANSWER, content: '' },
        )
        return clonedMessages
      })
      scheduleScrollToBottomMessage(messagesContainerRef, 0)

      // Send request to LLM:
      setIsLoading(true)
      try {
        const { data, status } = await requestAnswer({ question })

        // Parse each citation only for status 200 responses:
        if (status === 200) {
          const { text: content, citations: rawCitations } = data.message
          const { citations, keywordsToHighlight } = parseCitations(rawCitations, showErrorToast)

          // Update answer on the chat to include content and citations
          setMessages(prevMessages => {
            let clonedMessages = structuredClone(prevMessages)
            const lastIndex = clonedMessages.length - 1
            clonedMessages[lastIndex] = { ...clonedMessages[lastIndex], content, citations }
            return clonedMessages
          })

          highlightPdfKeywords(keywordsToHighlight)
        } else {
          // Error: Since there is no API documentation, responses with status different from 200 are considered as unhandled 
          showErrorToast('LLM couldn\'t handle your question properly. Please try again.')
        }
      } catch (error) {
        let errorMessage
        if (error.code === TIMEOUT_CODE) {
          errorMessage = 'The response from LLM took too long. Please try again.'
        } else {
          // Error: Other errors should be hidden from the user (TODO: log errors internally)
          errorMessage = 'There was an error when asking to the LLM. Please try again later.'
        }
        showErrorToast(errorMessage)
      } finally {
        setIsLoading(false)
        scheduleScrollToBottomMessage(messagesContainerRef, 0)
        scheduleFocusQuestionInput(questionInputRef, 0)
      }
    }
  }

  return (
    <>
      <ChatMessages
        containerRef={messagesContainerRef}
        messages={messages}
        isLoading={isLoading}
        jumpToPdfPage={jumpToPdfPage}
      />

      {showSample && (
        <ChatSampleQuestion
          sampleQuestion={SAMPLE_QUESTION}
          askSampleQuestion={askSampleQuestion}
        />
      )}

      <ChatQuestionInput
        inputRef={questionInputRef}
        isLoading={isLoading}
        handleSubmit={handleSubmitQuestion}
      />
    </>
  )
}

export default ChatManager
