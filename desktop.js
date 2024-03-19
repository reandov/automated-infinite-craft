const CONFIG = {
  nIterations: 60, // Number of iterations
  delayInMS: 1000, // Delay between each interation. I recommend a value >= 300ms
};

const STATE = {
  iteration: 0,
  localStorageKey: "infinite-craft-data",
  attributeName: "data-v-2f8bc7f9",
};

const INITIAL_STATE = {
  elements: [
    {
      text: "Water",
      emoji: "💧",
      discovered: false,
    },
    {
      text: "Fire",
      emoji: "🔥",
      discovered: false,
    },
    {
      text: "Wind",
      emoji: "🌬️",
      discovered: false,
    },
    {
      text: "Earth",
      emoji: "🌍",
      discovered: false,
    },
  ],
};

function createDesktopItem(response) {
  const { result, emoji } = response;
  const div = document.createElement("div");
  div.setAttribute(STATE.attributeName, "");
  div.classList.add("item");

  const emojiSpan = document.createElement("span");
  emojiSpan.setAttribute(STATE.attributeName, "");
  emojiSpan.classList.add("item-emoji");
  emojiSpan.textContent = emoji;

  const textNode = document.createTextNode(` ${result}`);

  div.appendChild(emojiSpan);
  div.appendChild(textNode);

  return div;
}

function appendToLocalStorage(response) {
  const { result, emoji, isNew } = response;

  const storedData =
    JSON.parse(localStorage.getItem(STATE.localStorageKey)) || INITIAL_STATE;
  const elements = storedData.elements;

  if (emoji !== "" && new Set(elements.map((el) => el.text)).has(result)) {
    return false;
  }

  elements.push({
    text: result,
    emoji: emoji,
    discovered: isNew,
  });

  const storedDataUpdated = { ...storedData, elements: elements };

  localStorage.setItem(
    STATE.localStorageKey,
    JSON.stringify(storedDataUpdated),
  );

  return true;
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * (max - 1) + 1);
}

async function combineItems() {
  const items = document.querySelectorAll(".item");
  const element1 = items[generateRandomNumber(items.length)];
  const element2 = items[generateRandomNumber(items.length)];

  const element1Name = element1.childNodes[1].textContent.trim();
  const element2Name = element2.childNodes[1].textContent.trim();

  try {
    const response = await fetch(
      `https://neal.fun/api/infinite-craft/pair?first=${element1Name}&second=${element2Name}`,
    );

    const responseData = await response.json();

    const isNewElement = appendToLocalStorage(responseData);

    if (isNewElement) {
      const elementsList =
        document.getElementsByClassName("items")[0].childNodes[0];

      const newElement = createDesktopItem(responseData);
      elementsList.appendChild(newElement);

      console.log(
        `${responseData.isNew ? "(NEW)" : ""} ${element1Name} + ${element2Name} = ${responseData.result}`,
      );
    }
  } catch (error) {
    console.error(error);
  }
}

const intervalId = setInterval(async () => {
  await combineItems();
  STATE.iteration++;

  if (STATE.iteration >= CONFIG.nIterations) {
    clearInterval(intervalId);
  }
}, CONFIG.delayInMS);
