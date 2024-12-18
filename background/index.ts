import "@plasmohq/messaging/background"

import { startHub } from "@plasmohq/messaging/pub-sub"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message in background worker:", message);
  
    if (message.type === "shopee-request") {
      console.log("Test log from the background worker");
      console.log(message)
    //   sendResponse({ status: "success", data: "Logged successfully" });
    }
  });
startHub()