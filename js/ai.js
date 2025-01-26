const btn = document.getElementById("ai-button");
const content = document.getElementById("content");
const gif = document.getElementById("gif");
function speech(text) {
  const textSpeak = new SpeechSynthesisUtterance(text);
  textSpeak.rate = 1;
  textSpeak.pitch = 1;
  textSpeak.volume = 1;
  textSpeak.lang = "hi-GB";
  window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
  const day = new Date();
  const hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speech("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speech("Good Afternoon Sir");
  } else {
    speech("Good Evening Sir");
  }
}

window.addEventListener("load", () => {
  wishMe();
  console.log("window load");
});

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.onresult = (event) => {
  console.log(event);

  const transcript = event.results[0][0].transcript;
  const normalizedTranscript = transcript.trim().toLowerCase(); // Normalize the input
  content.innerText = normalizedTranscript;
  tackCommand(normalizedTranscript);
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.classList.add("hidden");
  gif.classList.remove("hidden");
});

function tackCommand(message) {
  gif.classList.add("hidden");
  btn.classList.remove("hidden");
  if (message.includes("hello") || message.includes("hey")) {
    speech("Hello sir, what can I help you with?");
  } else if (message.includes("open youtube")) {
    speech("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("who are you")) {
    speech("I am your virtual assistant, created by Mahdi Al Hasan Sir.");
  } else if (message.includes("open facebook")) {
    speech("Opening Facebook");
    window.open("https://www.facebook.com", "_blank");
  } else if (message.includes("open google")) {
    speech("Opening google");
    window.open("https://www.google.com", "_blank");
  } else if (message.includes("open calculator")) {
    speech("Opening calculator");
    window.open("calculator://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });

    speechEnglish(time);
  } else {
    let finalText =
      "this is what i found on internet regarding" +
        message.replace("shifra", "") || message.replace("shipra", "");
    speech(finalText);
    window.open(
      `https://www.google.com/search?q=${message.replace("shipra", "")}`,
      "_blank"
    );
  }
}

function speechEnglish(text) {
  const textSpeak = new SpeechSynthesisUtterance(text);
  textSpeak.rate = 1;
  textSpeak.pitch = 1;
  textSpeak.volume = 1;
  textSpeak.lang = "en-GB";
  window.speechSynthesis.speak(textSpeak);
}
