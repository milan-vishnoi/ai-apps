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

  textarea.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
      e.preventDefault();
      setRequestBody(e.target.value);
      displayUserMessage(e.target.value);
      e.target.value = "";
      getResponse();
  }
  });
  
  function setRequestBody(message) {
    requestBody.message = message;
    config.body = JSON.stringify(requestBody);
    console.log(requestBody);
  }
  
  function displayUserMessage(message) {
    const messageEl = document.createElement("p");
    messageEl.classList.add("user-message");
    messageEl.innerText = "You:\n" + message;
    messages.appendChild(messageEl);
    messages.scrollTop = messages.scrollHeight;
  }
  
  async function getResponse() {
    const resp = await fetch(API_URL, config);
  
    const data = await resp.json();
  
    displayAIMessage(data.text);
    requestBody.chat_history = data.chat_history;
    console.log(data.text);
    console.log(data.chat_history);
  }
  
  
  function displayAIMessage(message) {
    const messageEl = document.createElement("p");
    messageEl.classList.add("ai-message");
    messageEl.innerText = "AI:\n" + message;
    messages.appendChild(messageEl);
    messages.scrollTop = messages.scrollHeight;
  }