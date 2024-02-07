# Chat with your PDF Application

This is a Web Page PDF-viewer and Chat application implemented using React & Next.js. It allows users to ask questions about a pdf and get responses from an LLM.

You can run & test it [here]()

## 📜 Features

- PDF viewer: Users are be able to visualize the shared PDF
- Chat interface: Users are be able to enter questions and get responses
- Each answer have one or more links with pages from which it was extracted. When clicking the link, the PDF viewer should visualize that page
- Each answer could have keywords. Parsed keywords are highlighted in the PDF viewer, by default the PDF viewer visualizes the first keyword
- Sample question provided to test a common question and answer
- Possible errors from API calls are handled using toast messages
- API calls have a 20 seconds maximum timeout, otherwise a toast message is shown
- Clean & minimal UX design
- The application has mobile first responsive design (min widths: 640px, 768px, 1024px, 1280px)

## 💯 How to run

```bash
npm install
npm run dev
```

## 💻 Tooling

- Next.js
- Axios to handle requests
- TailwindCSS for styling the app
- react-pdf-viewer library to manage the PDF viewer
- react-toastify library to display error toast messages

## 💻 Implement/Design Choices & Issues Faced

- Framework selected: Next.js, [React official documentation](https://react.dev/learn/start-a-new-react-project) suggests Next.js to create and scale React applications, alongside with Remix and Gatsby. Given the size and small set of features of the current application, any of these frameworks allow to, eventually, scalate properly the application. Another alternative considered for this app was Vite, which could build a lighter app, but given my familiarity with Next.js, I chose Next.js.
- Axios and a custom hook to handle API requests: Should we have an app that requires better API request handling, we could have use a library such as SWR or React Query.
- Error Handling: react-toastify library allows a simple approach to display possible errors when requesting APIs
- PDF Viewer: react-pdf-viewer was a nice library to handle all interactions with the PDF and the documentation was really good.
- Citations included in the LLM's response does not have a nice way to parse information such as page and keywords, sometimes there was no page present or keywords regarding the question asked were not very helpful.

## 🦉 Possible Improvements

- Unit testing
- Error Boundaries
- List Virtualization
- Typescript
