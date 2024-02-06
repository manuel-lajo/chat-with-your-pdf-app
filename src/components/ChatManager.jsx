import { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import axios from 'axios'

import PdfViewerContext from '@/context/pdf-viewer-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import UserAvatarIcon from '@/assets/icons/user-avatar.svg'
import AssistantAvatarIcon from '@/assets/icons/assistant-avatar.svg'
import SubmitQuestionIcon from '@/assets/icons/submit-question.svg'
import { MESSAGE_TYPE, SAMPLE_QUESTION, parseCitations } from '@/utils/chat-utils'
import useToast from '@/hooks/use-toast'


const ChatManager = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [showSample, setShowSample] = useState(true)

  const questionInputRef = useRef(null)
  const chatContainerRef = useRef(null)

  const { jumpToPage, highlight } = useContext(PdfViewerContext)

  const { errorToast } = useToast()

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
          {
            type: MESSAGE_TYPE.QUESTION,
            content: question,
            citations: null,
            timeStamp: (new Date()).toISOString(),
          },
          {
            type: MESSAGE_TYPE.ANSWER,
            content: null,
            citations: null,
            timeStamp: null,
          }
        )
        return clonedMessages
      })

      // Scroll chat to bottom (setTimeout allows waiting for all set states to be updated on the DOM)
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }, 0)

      // Send request to LLM:
      setIsLoading(true)
      try {
        const { data, status } = await axios.post('https://prosper-conversations-beta.onrender.com/assistant/ask_question', {
          question,
        }, {
          headers: {
            'X-Api-Key': 'test-challenge',
            'X-Organization': 'test',
          }
        })

        // Parse each citation only for status 200 responses:
        if (status === 200) {
          const { text: content, citations: rawCitations } = data.message
          const { citations, textsToHighlight } = parseCitations(rawCitations, errorToast)

          // Update answer on the chat to include content and citations
          setMessages(prevMessages => {
            let clonedMessages = structuredClone(prevMessages)
            const lastIndex = clonedMessages.length - 1
            clonedMessages[lastIndex] = {
              ...clonedMessages[lastIndex],
              content,
              citations,
              timeStamp: (new Date()).toISOString(),
            }
            return clonedMessages
          })

          highlight(textsToHighlight)
        } else {
          // Error: Since there is no API documentation, non status 200 responses are considered as unhandled 
          errorToast('LLM couldn\'t handle your answer properly. Please try again.')
        }
      } catch (error) {
        // Error: Other errors should be hidden from the user (log errors internally)
        errorToast('There was an error when asking to the LLM. Please try again later.')
      } finally {
        setIsLoading(false)

        // Scroll chat to bottom & focus on input (setTimeout allows waiting for all set states to be updated on the DOM)
        setTimeout(() => {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
          questionInputRef.current.focus()
        }, 0)
      }
    }
  }

  return (
    <>
      <div ref={chatContainerRef} className="flex flex-col overflow-y-scroll h-full border border-stone-300 bg-white">
        {messages.map(({ type, content, citations }, index) => {
          const isLastIndex = index === messages.length - 1
          const isQuestion = type === MESSAGE_TYPE.QUESTION
          return (
            <div key={index} className={`flex px-4 md:px-8 lg:px-12 py-2 md:py-4 lg:py-6 gap-x-2 lg:gap-x-3 border border-t-stone-300 ${isQuestion ? 'bg-white' : 'bg-stone-100'}`}>
              <div>
                <div className="w-5 xl:w-6">
                  <Image src={isQuestion ? UserAvatarIcon : AssistantAvatarIcon} alt="message avatar" />
                </div>
              </div>
              <div>
                <div>
                  {isLoading && isLastIndex ? (
                    <div className="text-gray-600">
                      <FontAwesomeIcon className="w-8 fa-spin" icon={faSpinner} />
                    </div>
                  ) : (
                    <span className="text-sm lg:text-base">{content}</span>
                  )}
                </div>
                {citations && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {citations.map(({ citationKey, page }) => {
                      // Only display page if we have a valid page number
                      return page && (
                        <button
                          key={citationKey}
                          className="px-2 py-1 outline-none border border-stone-400 bg-stone-200 rounded-md hover:bg-stone-300 text-xs lg:text-sm"
                          onClick={() => { jumpToPage(page - 1) }}
                        >
                          {`p. ${page}`}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showSample && (
        <div
          className="flex gap-1 items-center px-2 md:px-3 lg:px-4 py md:py-1 lg:py-2 bg-stone-100 border border-b-stone-400 hover:bg-stone-300 cursor-pointer"
          onClick={askSampleQuestion}
        >
          <div className="w-8 p-2">
            <Image src={SubmitQuestionIcon} alt="submit sample question" />
          </div>
          <div className="text-xs lg:text-sm">
            <span className="font-bold">Click to try sample question: </span>
            <span>{SAMPLE_QUESTION}</span>
          </div>
        </div>
      )}

      <form
        className="relative flex justify-center items-center px-2 md:px-3 lg:px-4 py-3 md:py-5 lg:py-8 bg-stone-200"
        onSubmit={handleSubmitQuestion}
      >
        <input
          ref={questionInputRef}
          className={`text-sm lg:text-base outline-none p-2 w-full border border-stone-400 rounded-md ${isLoading ? 'bg-stone-300' : 'bg-white'}`}
          type="text"
          placeholder={isLoading ? '' : 'Enter your question'}
          disabled={isLoading}
        />
        {isLoading ? (
          <div className="absolute right-6 text-gray-600">
            <FontAwesomeIcon className="w-8 fa-spin" icon={faSpinner} />
          </div>
        ) : (
          <button
            className="absolute w-8 right-6 p-2 rounded-lg hover:bg-gray-200"
            type="submit"
            onClick={askQuestion}
          >
            <Image src={SubmitQuestionIcon} alt="submit question" />
          </button>
        )}
      </form>
    </>
  )
}

export default ChatManager
