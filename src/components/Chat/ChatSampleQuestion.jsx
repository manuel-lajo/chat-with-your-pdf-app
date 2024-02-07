import Image from 'next/image'

import SubmitQuestionIcon from '@/assets/icons/submit-question.svg'

const ChatSampleQuestion = ({ sampleQuestion, askSampleQuestion }) => {
  return (
    <div
      className="flex gap-1 items-center px-2 md:px-3 lg:px-4 py md:py-1 lg:py-2 bg-stone-300 border border-b-stone-500 hover:bg-stone-400 cursor-pointer"
      onClick={askSampleQuestion}
    >
      <div className="w-8 p-2">
        <Image src={SubmitQuestionIcon} alt="submit sample question" />
      </div>
      <div className="text-xs lg:text-sm">
        <span className="font-bold">Click to try sample question: </span>
        <span>{sampleQuestion}</span>
      </div>
    </div>
  )
}

export default ChatSampleQuestion
