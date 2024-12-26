
import shopeeRequestHandler from "./messages/shopee-request"

export {}

type MessageHandler = (message: any, helpers: { send: (response: any) => void }) => void

const handlers: Record<string, MessageHandler> = {
  "shopee-request": shopeeRequestHandler
}

chrome.runtime.onStartup.addListener( () => {
  console.log(`onStartup()`);
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const handler = handlers[message.name]
  if (handler) {
    handler(message, { send: sendResponse })
    return true
  }
})