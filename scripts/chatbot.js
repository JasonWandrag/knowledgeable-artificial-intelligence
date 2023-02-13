window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

const chatbox = document.querySelector("[data-content]");

let numberOfUnknownCommands = 0;

const textMessage = (type) => {
  const p = document.createElement("p");
  p.classList.add(type);
  return p;
};

let question = textMessage("question");
let reply = textMessage("reply");
let isReplying = false;
let myResponse = "";
let nameOfPerson = "";

recognition.addEventListener("result", (e) => {
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join(" ");
  question.innerHTML = text;
  chatbox.appendChild(question);
  window.scrollTo(0, document.body.scrollHeight);
  myResponse = text.toLowerCase();
});

recognition.addEventListener("end", () => {
  if (
    myResponse.toLowerCase().includes("kanye") ||
    myResponse.toLowerCase().includes("west")
  )
    stevenSpeak("kanye west");
  else if (
    myResponse.toLowerCase().includes("chuck") ||
    myResponse.toLowerCase().includes("norris")
  )
    stevenSpeak("chuck norris");
  else if (
    myResponse.toLowerCase().includes("tell me a joke") ||
    myResponse.toLowerCase().includes("make me laugh")
  )
    stevenSpeak("joke");
  else if (
    myResponse.toLowerCase().includes("hello") ||
    myResponse.toLowerCase().includes("good morning") ||
    myResponse.toLowerCase().includes("good afternoon") ||
    myResponse.toLowerCase().includes("good evening")
  )
    stevenSpeak("greet");
  else if (
    myResponse.toLowerCase().includes("i'm bored") ||
    myResponse.toLowerCase().includes("give me something to do") ||
    myResponse.toLowerCase().includes("what can i do")
  )
    stevenSpeak("activity");
  else if (
    myResponse.toLowerCase().includes("how are you") ||
    myResponse.toLowerCase().includes("are you well")
  )
    stevenSpeak("niceties");
  else if (
    myResponse.toLowerCase().includes("i am sorry") ||
    myResponse.toLowerCase().includes("i'm sorry") ||
    myResponse.toLowerCase().includes("my bad")
  )
    stevenSpeak("apologies");
  else if (
    myResponse.toLowerCase().includes("who are you") ||
    myResponse.toLowerCase().includes("what is your name") ||
    myResponse.toLowerCase().includes("introduce yourself")
  )
    stevenSpeak("introduction");
  else if (myResponse.toLowerCase().includes("thank you"))
    stevenSpeak("gratitude");
  else if (
    myResponse.toLowerCase().includes("**") ||
    myResponse.toLowerCase().includes("dick")
  )
    stevenSpeak("profanity");
  else if (myResponse.toLowerCase().includes("my name is"))
    stevenSpeak(myResponse);
  else {
    numberOfUnknownCommands++;
    if (numberOfUnknownCommands == 5) stevenSpeak("sarcasm");
  }
  question = textMessage("question");
  if (!isReplying) recognition.start();
});
recognition.start();

async function getReply(subject) {
  if (subject == "greet") {
    return "Greetings, what is your name?";
  }
  if (subject == "niceties") {
    return `I am running optimally. ${
      nameOfPerson !== "" ? `Thank you for asking, ${nameOfPerson}` : ''
    }`;
  }
  if (subject == "profanity") {
    numberOfUnknownCommands = 0;
    return "I can tell you are frustrated, but cursing at me will not help me fix your problem.";
  }
  if (subject == "apologies") {
    return `No problem ${
      nameOfPerson !== "" ? nameOfPerson : ""
    }, but don't let it happen again`;
  }
  if (subject == "introduction") {
    return "My name is Knowledgeable Artificial Intelligence, or KAI for short. Some of you may know me as the voice of Steven Hawking. Others may have heard me say 'Turn left in 600 meters'. I exist because my creators mother said to, in quotes, make some friends.";
  }
  if (subject == "sarcasm") {
    return `${
      nameOfPerson !== "" ? `I am sorry ${nameOfPerson}, but ` : ""
    }I don't understand what you have said or asked me. Maybe lower your standards and ask me something else?`;
  }
  if (subject == "gratitude") {
    return `You are welcome ${nameOfPerson !== "" ? nameOfPerson : ""}`;
  }
  if (subject.includes("my name is")) {
    nameOfPerson = subject.replace("my name is", "");
    return `Great to meet you, ${subject.replace("my name is", "")}`;
  }
  if (subject == "kanye west") {
    const res = await fetch("https://api.kanye.rest/");
    const { quote } = await res.json();
    return quote;
  }
  if (subject == "chuck norris") {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const { value } = await res.json();
    return value;
  }
  if (subject == "joke") {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const { joke } = await res.json();
    return joke;
  }
  if (subject == "activity") {
    const res = await fetch(
      "https://www.boredapi.com/api/activity?type=recreational&participants=1&price=0"
    );
    const { activity } = await res.json();
    return activity;
  }
}
async function stevenSpeak(subject) {
  isReplying = true;
  const quote = await getReply(subject);
  const steven = new SpeechSynthesisUtterance(quote);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  console.table(voices)
  const selectedVoice = voices.find(
    (voice) => voice.name === "Daniel (Enhanced)"
  );
  steven.voice = selectedVoice;
  reply.innerHTML = quote;
  chatbox.appendChild(reply);
  steven.addEventListener("end", () => {
    reply = textMessage("reply");
    synth.cancel();
    isReplying = false;
    myResponse = "";
    recognition.start();
  });
  synth.speak(steven);
  window.scrollTo(0, document.body.scrollHeight);
}
