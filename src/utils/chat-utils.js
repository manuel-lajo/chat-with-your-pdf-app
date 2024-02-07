const MESSAGE_TYPE = {
  QUESTION: 'question',
  ANSWER: 'answer',
}

const SAMPLE_QUESTION = 'Does Hiscox include waiver of subrogation?'

const parseCitations = (rawCitations, errorHandler) => {
  let keywordsToHighlight = []
  const citations = rawCitations.map(citation => {
    const [citationKey] = citation.trim().split(' ')

    let keywords = []
    let page = null

    const urlText = citation.match(/https?:\/\/[^\s\)]+/)?.[0]

    try {
      const url = new URL(urlText)

      const encodedKeywords = url.searchParams.get('keywords')
      // Consider phrase as keyword when: there 2 o more empty spaces or there is a \n character
      keywords = decodeURI(encodedKeywords).split(/\s{2}|\n/).filter(Boolean)
      keywordsToHighlight.push(...keywords)

      page = url.searchParams.get('page')
    } catch (error) {
      errorHandler('A citation has an invalid URL to parse')
    }

    return { citationKey, keywords, page }
  })

  return { citations, keywordsToHighlight }
}

// Scroll chat to bottom (setTimeout allows waiting for all set states to be updated on the DOM)
const scheduleScrollToBottomMessage = (containerRef, delay) => {
  setTimeout(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, delay)
}

// Focus on input (setTimeout allows waiting for all set states to be updated on the DOM)
const scheduleFocusQuestionInput = (inputRef, delay) => {
  setTimeout(() => {
    inputRef.current.focus()
  }, delay)
}

export {
  MESSAGE_TYPE,
  SAMPLE_QUESTION,
  parseCitations,
  scheduleScrollToBottomMessage,
  scheduleFocusQuestionInput,
}
