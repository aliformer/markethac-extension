// Define the URL for the SSE endpoint
const sseUrl = process.env.PLASMO_PUBLIC_

// Initialize EventSource
const eventSource = new EventSource(sseUrl);

// Handle standard messages
eventSource.onmessage = (event) => {
    console.log("Message received:", event.data);
    // You can parse the data if it's JSON
    const data = JSON.parse(event.data);
    console.log("Parsed Data:", data);
};

// Handle specific event types
eventSource.addEventListener("customEvent", (event) => {
    console.log("Custom Event:", event.data);
});

// Handle errors
eventSource.onerror = (error) => {
    console.error("SSE Error:", error);

    // Optionally, close the connection if there's a critical error
    if (eventSource.readyState === EventSource.CLOSED) {
        console.log("SSE connection closed.");
    }
};

// Optional: Handle open event
eventSource.onopen = () => {
    console.log("SSE connection opened.");
};

// Optionally, close the connection manually
// eventSource.close();
