
const ChatCitations = ({ citations, jumpToPdfPage }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {citations.map(({ citationKey, page }) => {
        // Only display page if we have a valid page number
        return page && (
          <button
            key={citationKey}
            className="px-2 py-1 outline-none border border-stone-400 bg-stone-200 rounded-md hover:bg-stone-300 text-xs lg:text-sm"
            onClick={() => { jumpToPdfPage(page - 1) }}
          >
            {`p. ${page}`}
          </button>
        )
      })}
    </div>
  )
}

export default ChatCitations
