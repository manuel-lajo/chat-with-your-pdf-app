# Chat with your PDF Application

This is a Web Page PDF-viewer and Chat application implemented with React & Next.js. It allows users to ask questions about a pdf and get responses from an LLM.

You can run & test it [here](https://chat-with-your-pdf-app.vercel.app/)

## 📜 Features

- PDF viewer: Users are able to visualize the shared PDF.
- Chat interface: Users are able to enter questions and get responses from an LLM.
- Each answer could have one or more links with the page from which they were extracted. When clicking a link, the PDF viewer should visualize that page.
- Each answer could have keywords. Parsed keywords are highlighted in the PDF viewer, and by default the PDF viewer visualizes the first keyword.
- Sample question provided to test a common question and answer flow.
- Possible errors from API calls are handled using toast messages.
- API calls have a 20 seconds maximum timeout, otherwise a toast message is shown.
- Clean & minimal UX design.
- Responsive design using mobile first approach (min widths: 640px, 768px, 1024px, 1280px).

## 💯 How to run

```bash
npm install
npm run dev
```

## 💻 Tooling

- Next.js
- Axios to handle API requests
- Tailwind CSS for styling the app
- react-pdf-viewer library to manage the PDF viewer
- react-toastify library to display error toast messages
- Font Awesome to display icons

## 💻 Implement/Design Choices & Issues Faced

- Framework selected: Next.js, [React docs](https://react.dev/learn/start-a-new-react-project) suggests Next.js to create and scale React applications, alongside with other frameworks such as Remix and Gatsby. Given the size and small set of features of the current application, any of these frameworks will allow to scalate properly the application. Another alternative considered for this app was Vite, which could build a lighter app. I chose Next.js because of the features that could be added should the app grow and also since I have familiarity with the framework.
- Axios and a custom hook to handle API requests: Should we have an app that requires better API request handling, we could use libraries such as SWR or React Query.
- Error Handling: react-toastify library allows a simple approach to display possible errors when requesting APIs
- PDF Viewer: react-pdf-viewer is a great library to handle all interactions with the PDF and it's documentation is really good.
- Citations included in the LLM's response were sometimes inconsistent, and when useful, they didn't have an easy/clean way to parse information such as pages and keywords; sometimes there was no page present or the keywords regarding the question asked were not very helpful.

## 🦉 Possible Improvements

- Disable chat until PDF viewer is completely loaded.
- Display answer character by character to simulate answers from LLM's such as chatGPT.
- Use/handle "confidence_score" property from the LLM's response.
- More testing to better understand the responses and improve citation parsing.
- Change question input to textarea.
- Set a maximum number of characters for the question.
- Add functionalities such as: more suggested questions (a wizard), instructions, "capture & ask" feature.
- Allow "stop generation" feature to cancel question request.
- Implement global error handling (Error boundaries).
- Add log errors implementation (probably this should be handled by the backend).
- Add TypeScript.
- Add Unit & e2e testing.
- Handle data fetching & state management from API requests with React Query.
- Implement performance optimizations: useCallback/useMemo hooks, List Virtualization for chat messages.
- Improve design for small devices (cellphones).
- Fix bug: when there is an error, question input focus is not performed properly after an API request.
