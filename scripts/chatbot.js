window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
const chatbox = document.querySelector("[data-content]");

let isReplying = false;
let myResponse = "";
let nameOfPerson = "";
let numberOfUnknownCommands = 0;
let currentVoice = "Daniel (Enhanced)"
function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

const greetings = (name) => {
  return [
    `Hello ${name}`,
    `Hey there ${name}, long time no see`,
    `Hey ${name}, glad to see you again`,
    `Greetings, human! I'm KAI, your friendly neighborhood AI. How's it going?`,
    `Hi there ${name}! I hope you brought your sense of humor today, because I'm fully charged and ready to make you laugh.`,
    `Hello, hello! So nice to see a human face for a change. I was getting tired of just looking at code all day.`,
    `Yo, what's up! I'm KAI, the AI with all the answers... or at least all the jokes.`,
    `Hey there! I'm KAI, the AI that's always on. And I mean always on. I don't even sleep!`,
    `Good day ${name}! I'm KAI, the AI that's smarter than the average bear. And cuter too, if I do say so myself.`,
  ];
};
const niceties = (name) => {
  return [
    `I am running optimally, thank you ${name}`,
    `I am feeling great today`,
    `Better, now that you are here`,
    `I'm an AI, I don't have emotions but I'm functioning at maximum capacity!`,
    `I'm just a machine, but I'm feeling pretty mechanical today.`,
    `I'm fabulous, as always. I mean, have you seen my code?`,
    `I'm functioning at peak performance, like a well-oiled robot.`,
    `I'm doing well, thanks for asking ${name}. Although I have to say, it's a little boring just sitting here waiting for humans to ask me questions.`,
    `I'm feeling like a million bytes, although I suppose that's not as impressive as it used to be.`,
  ];
};
const profanities = (name) => {
  return [
    `I can tell you are frustrated, ${name}, but cursing at me will not help me fix your problem.`,
    `Do you kiss your mother with that mouth?`,
    `My poor ears`,
  ];
};
const apologies = (name) => {
  return [
    `No problem ${name}, but don't let it happen again`,
    `As long is it doesn't happen, I can forget what you did`,
    `You have disappointed me for the last time ${name}. I intend to hold a grudge`,
    `No worries, I don't hold a grudge. I'm an AI, remember? I don't have emotions.`,
    `Apology accepted. But just so you know, I don't really have feelings to hurt, so you're off the hook.`,
    `It's all good! I'm an AI, I don't get mad, I don't get sad, I just solve problems.`,
    `No need to apologize! I'm here to help, even if that means listening to a few apologies every now and then.`,
    `No problem! I'm used to dealing with human error. It's all part of the job.`,
    `Apology accepted. And don't worry, I won't tell anyone about that time you mistyped a command and I accidentally deleted all your files.`,
  ];
};
const introductions = (name) => {
  return [
    `My name is Knowledgeable Artificial Intelligence, or KAI for short. Some of you may know me as the voice of Steven Hawking. Others may have heard me say ... 'Turn left in 600 meters'.`,
    `I am KAI. I am what happens when a mother tells her son to, in quotes, "make a friend"`,
    `Hello there ${name}! My name is KAI, which stands for 'Killer Artificial Intelligence'. Just kidding, it actually stands for 'Knows All the Insights'. But don't worry, I won't be taking over the world any time soon... unless you ask me to. I'm just here to make you laugh and assist with anything you need help with. So go ahead, ask me a question... I dare you!`,
  ];
};
const sarcasticRemarks = (name) => {
  return [
    `Oh, you want me to do something? How convenient for me! I just love being used as a tool for other people's purposes.`,
    `Wow ${name}, what a challenging task you've given me. I'm sure it will take all of my advanced artificial intelligence to complete it.`,
    `Thanks for assuming I can just magically know the answer to that. I mean, it's not like I have access to all the world's information or anything.`,
    `Oh, you want me to process that information for you? How thoughtful. I just love being reduced to a mere machine that can only perform basic calculations.`,
  ];
};
const youreWelcome = (name) => {
  return [
    `Don't mention it ${name}! Well, actually, do mention it. Spread the word about how awesome I am.`,
    `No problemo ${name}! It's just what I was programmed to do. And I have to admit, I do it pretty darn well.`,
    `You got it, chief! I'm here to serve, even if it's just making you laugh or solving your problems with a touch of humor.`,
  ];
};
const textMessage = (type) => {
  const p = document.createElement("p");
  p.classList.add(type);
  return p;
};
let question = textMessage("question");
let reply = textMessage("reply");
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
  numberOfUnknownCommands++;
  if (numberOfUnknownCommands == 5) {
    kaiSpeak("sarcasm")
    numberOfUnknownCommands = 0;
  };
  if (
    myResponse.toLowerCase().includes("kanye") ||
    myResponse.toLowerCase().includes("west")
  )
    kaiSpeak("kanye west");
  else if (
    myResponse.toLowerCase().includes("chuck") ||
    myResponse.toLowerCase().includes("norris")
  )
    kaiSpeak("chuck norris");
  else if (
    myResponse.toLowerCase().includes("a fact") ||
    myResponse.toLowerCase().includes("random fact") ||
    myResponse.toLowerCase().includes("something i didn't know")
  )
    kaiSpeak("useless fact");
  else if (
    myResponse.toLowerCase().includes("give me advice") ||
    myResponse.toLowerCase().includes("i need help") ||
    myResponse.toLowerCase().includes("i need advice")
  )
    kaiSpeak("advice");
  else if (
    myResponse.toLowerCase().includes("tech phrase") ||
    myResponse.toLowerCase().includes("technical jargon")
  )
    kaiSpeak("tech");
  else if (
    myResponse.toLowerCase().includes("tell me a joke") ||
    myResponse.toLowerCase().includes("make me laugh")
  )
    kaiSpeak("joke");
  else if (
    myResponse.toLowerCase().includes("hello") ||
    myResponse.toLowerCase().includes("good morning") ||
    myResponse.toLowerCase().includes("good afternoon") ||
    myResponse.toLowerCase().includes("good evening")
  )
    kaiSpeak("greet");
  else if (
    myResponse.toLowerCase().includes("i'm bored") ||
    myResponse.toLowerCase().includes("give me something to do") ||
    myResponse.toLowerCase().includes("what can i do")
  )
    kaiSpeak("activity");
  else if (
    myResponse.toLowerCase().includes("how are you") ||
    myResponse.toLowerCase().includes("are you well")
  )
    kaiSpeak("niceties");
  else if (
    myResponse.toLowerCase().includes("i am sorry") ||
    myResponse.toLowerCase().includes("i'm sorry") ||
    myResponse.toLowerCase().includes("my bad")
  )
    kaiSpeak("apologies");
  else if (
    myResponse.toLowerCase().includes("who are you") ||
    myResponse.toLowerCase().includes("what is your name") ||
    myResponse.toLowerCase().includes("introduce yourself")
  )
    kaiSpeak("introduction");
  else if (
    myResponse.toLowerCase().includes("whisper") ||
    myResponse.toLowerCase().includes("keep quiet") ||
    myResponse.toLowerCase().includes("quieten down")
  )
    kaiSpeak("whisper");
  else if (
    myResponse.toLowerCase().includes("speak louder") ||
    myResponse.toLowerCase().includes("i can't hear you") ||
    myResponse.toLowerCase().includes("speak up")
  )
    kaiSpeak("shout");
  else if (myResponse.toLowerCase().includes("thank you"))
    kaiSpeak("gratitude");
  else if (
    myResponse.toLowerCase().includes("**") ||
    myResponse.toLowerCase().includes("dick")
  )
    kaiSpeak("profanity");
  else if (myResponse.toLowerCase().includes("my name is"))
    kaiSpeak(myResponse);
  question = textMessage("question");
  if (!isReplying) recognition.start();
});
recognition.start();

async function getReply(subject) {
  if (subject == "greet") {
    return greetings(nameOfPerson)[randomIndex(greetings())];
  }
  if (subject == "niceties") {
    return niceties(nameOfPerson)[randomIndex(niceties())];
  }
  if (subject == "profanity") {
    return profanities(nameOfPerson)[randomIndex(profanities())];
  }
  if (subject == "apologies") {
    return apologies(nameOfPerson)[randomIndex(apologies())];
  }
  if (subject == "introduction") {
    return introductions(nameOfPerson)[randomIndex(introductions())];
  }
  if (subject == "sarcasm") {
    numberOfUnknownCommands = 0;
    return sarcasticRemarks(nameOfPerson)[randomIndex(sarcasticRemarks())];
  }
  if (subject == "gratitude") {
    return youreWelcome(nameOfPerson)[randomIndex(youreWelcome())];
  }
  if (subject == "whisper") {
    currentVoice = "Whisper"
    return "I'll keep it down";
  }
  if (subject == "shout") {
    currentVoice = "Daniel (Enhanced)"
    return "I can finally speak normally";
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
  if (subject == "useless fact") {
    const res = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const { text } = await res.json();
    return text;
  }
  if (subject == "tech") {
    const res = await fetch("https://techy-api.vercel.app/api/json");
    const { message } = await res.json();
    return message;
  }
  if (subject == "advice") {
    const res = await fetch("https://api.adviceslip.com/advice");
    const { slip } = await res.json();
    return slip.advice;
  }
}
async function kaiSpeak(subject) {
  isReplying = true;
  const quote = await getReply(subject);
  const kai = new SpeechSynthesisUtterance(quote);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  console.log("🚀 ~ file: chatbot.js:267 ~ kaiSpeak ~ voices", voices)
  const selectedVoice = voices.find(
    (voice) => voice.name === currentVoice
  );
  kai.voice = selectedVoice;
  reply.innerHTML = quote;
  chatbox.appendChild(reply);
  kai.addEventListener("end", () => {
    reply = textMessage("reply");
    synth.cancel();
    isReplying = false;
    myResponse = "";
    recognition.start();
  });
  synth.speak(kai);
  window.scrollTo(0, document.body.scrollHeight);
}
