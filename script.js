// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// ✅ Replace this config with your actual Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyCEnayZ7B7VYH_55IKjdRGriey5ffdPqRA",
  authDomain: "log-7281.firebaseapp.com",
  databaseURL: "https://log-7281-default-rtdb.firebaseio.com",
  projectId: "log-7281",
  storageBucket: "log-7281.firebasestorage.app",
  messagingSenderId: "997557129411",
  appId: "1:997557129411:web:ef247b0fff165df2ef9276"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const characterSelect = document.getElementById("character");
const messageInput = document.getElementById("message");

// Helper to format timestamp
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Submit new message
chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const character = characterSelect.value;
  const message = messageInput.value.trim();

  if (message) {
    push(messagesRef, {
      character,
      message,
      timestamp: Date.now()
    });
  }

  messageInput.value = "";
});

// Load messages in real time
onChildAdded(messagesRef, data => {
  const { character, message, timestamp } = data.val();
  const time = formatTimestamp(timestamp);
  const msg = document.createElement("p");
  msg.textContent = `${time} – ${character}: ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
});
