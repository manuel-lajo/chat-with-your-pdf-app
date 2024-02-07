import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import UserAvatarIcon from '@/assets/icons/user-avatar.svg'
import AssistantAvatarIcon from '@/assets/icons/assistant-avatar.svg'

import ChatCitations from '@/components/Chat/ChatCitations'

import { MESSAGE_TYPE } from '@/utils/chat-utils'

const ChatMessages = ({ containerRef, messages, isLoading, jumpToPdfPage }) => {
  return (
    <div ref={containerRef} className="flex flex-col overflow-y-scroll h-full border border-stone-300 bg-white">
      {messages.map(({ type, content, citations }, index) => {
        const isLastMessage = index === messages.length - 1
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
                {isLoading && isLastMessage ? (
                  <div className="text-gray-600">
                    <FontAwesomeIcon className="w-8 fa-spin" icon={faSpinner} />
                  </div>
                ) : (
                  <span className="text-sm lg:text-base">{content}</span>
                )}
              </div>
              {citations && <ChatCitations citations={citations} jumpToPdfPage={jumpToPdfPage} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChatMessages
