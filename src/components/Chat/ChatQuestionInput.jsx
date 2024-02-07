import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import SubmitQuestionIcon from '@/assets/icons/submit-question.svg'

const ChatQuestionInput = ({ inputRef, isLoading, handleSubmit }) => {
  return (
    <form
      className="relative flex justify-center items-center px-2 md:px-3 lg:px-4 py-3 md:py-5 lg:py-8 bg-stone-200"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
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
        >
          <Image src={SubmitQuestionIcon} alt="submit question" />
        </button>
      )}
    </form>
  )
}

export default ChatQuestionInput
