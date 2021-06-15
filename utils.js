import {ATTACK, logs, HIT, chat, formEl, arena} from "./constant.js";

// Create DOM ELement
import {player1, player2} from "./player.js";

// Math random
const mathRandom = (multiplier) => Math.ceil(Math.random() * multiplier)

export const formRemove = () => formEl.remove();

export const createDomEl = (tag, className) => {
  const tagEl = document.createElement(tag);

  className ? tagEl.classList.add(className) : ''

  return tagEl;
}


// Player Lose Alert
function resultText(name) {
  const resultOutput = createDomEl('div', 'loseTitle');
  if (name) {
    resultOutput.innerText = name + ' wins';
  } else {
    resultOutput.innerText = 'Draw';
  }

  return resultOutput;
}

// Reload btn for restart
export function createReloadButton() {
  const wrapper = createDomEl('div', 'reloadWrap');
  const reloadBtn = createDomEl('button', 'button');
  reloadBtn.classList.add('reloadBtn');

  reloadBtn.innerText = 'Restart';

  arena.appendChild(wrapper);
  wrapper.appendChild(reloadBtn);

  const reloadButton = document.querySelector('.reloadBtn');

  reloadButton.addEventListener('click', function () {
    window.location.reload();
  })
}

// Enemy Function
export function enemyAttack() {
  // Math random based on array quantity
  const hit = ATTACK[mathRandom(ATTACK.length) - 1]
  const defenece = ATTACK[mathRandom(ATTACK.length) - 1]

  return {
    value: mathRandom(HIT[hit]),
    hit: hit,
    defence: defenece,
  }
}

// Player Attack Function
export function playerAttack() {
  const attack = {};

  // Looking for checked radio
  for (let item of formEl) {
    if (item.checked && item.name === 'hit') {
      attack.value = mathRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

// Logs Switch Case
export function generateLogs(type, player1, player2) {
  // Get new time
  const time = new Date().toLocaleTimeString();
  let text

  const {name: name1, hp: hp1} = player1;
  const {name: name2, hp: hp2, damageRecieved: damage} = player2;
  let el

  switch (type) {
    case 'start':
      text = logs[type].replace('[player1]', name1)
        .replace('[player2]', name2)
        .replace('[time]', time);

      el = `<p>${text}</p>`

      break;
    case 'end':
      text = logs[type][mathRandom(logs[type].length) - 1]
        .replace('[playerWins]', name2)
        .replace('[playerLose]', name1);

      el = `<p>${time} : ${text}</p>`

      break;
    case 'hit':
      text = logs[type][mathRandom(logs[type].length) - 1]
        .replace('[playerKick]', name1)
        .replace('[playerDefence]', name2);

      // Recieve damageRecieved and hp from player who not attacking
      el = `<p>${time} : ${text} - ${damage} [${hp2}/100]</p>`

      break;
    case 'defence':
      text = logs[type][mathRandom(logs[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);

      el = `<p>${time} : ${text}</p>`

      break;
    case 'draw':
      text = logs[type];

      el = `<p>${time} : ${text}</p>`

      break;
  }

  chat.insertAdjacentHTML("afterbegin", el);
}

export const showResult = () => {
  // Lose/Win/Draw Check
  if (player1.hp <= 0 && player1.hp < player2.hp) {
    arena.appendChild(resultText(player2.name));
    generateLogs('end', player1, player2);
  } else if (player2.hp <= 0 && player2.hp < player1.hp) {
    arena.appendChild(resultText(player1.name));
    generateLogs('end', player2, player1);
  } else if (player1.hp === 0 && player2.hp === 0) {
    arena.appendChild(resultText());
    generateLogs('draw', player1, player2);
  }
}