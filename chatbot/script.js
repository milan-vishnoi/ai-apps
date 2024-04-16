const textarea = document.getElementById("textarea");
const messages = document.getElementById("messages");

const API_URL = "https://api.cohere.ai/v1/chat";


const requestBody = {
  chat_history: [
    { role: "USER", message: "Who are you?" },
    {
      role: "CHATBOT",
      message:
        "I am an LLM model and I am here to help you",
    },
  ],
  message: "",
  connectors: [{ id: "web-search" }],
};

const config = {
  method: "POST",
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "",
  },
  body: JSON.stringify(requestBody),
};

setApiKeyInHeader();

async function setApiKeyInHeader() {
    const jsonFileUrl = "key.json";
    try {
      const response = await fetch(jsonFileUrl);
  
      if (!response.ok) throw new Error("Failed to fetch API key from JSON");
  
      const data = await response.json();
      const apiKey = data.API_KEY;
      config.headers.Authorization = `bearer ${apiKey}`;
    } catch (error) {
      console.log("Error fetching JSON file:", error);
    }
  }