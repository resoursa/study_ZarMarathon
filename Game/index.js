import {ATTACK, HIT, logs, player1, player2} from "../constants";
import {createDomEl, getRandom} from "../utils";

export class Game {
  constructor() {
    this.arena = document.querySelector('.arenas');
    this.formEl = document.querySelector('.control');
    this.chat = document.querySelector('.chat');
  }

  // Player Lose Alert
  resultText = (name) => {
    const resultOutput = createDomEl('div', 'loseTitle');
    if (name) {
      resultOutput.innerText = name + ' wins';
    } else {
      resultOutput.innerText = 'Draw';
    }

    return resultOutput;
  }

  formRemove = () => this.formEl.remove();

  // Reload btn for restart
  createReloadButton = () => {
    const wrapper = createDomEl('div', 'reloadWrap');
    const reloadBtn = createDomEl('button', 'button');
    reloadBtn.classList.add('reloadBtn');

    reloadBtn.innerText = 'Restart';

    this.arena.appendChild(wrapper);
    wrapper.appendChild(reloadBtn);

    const reloadButton = document.querySelector('.reloadBtn');

    reloadButton.addEventListener('click', function () {
      window.location.reload();
    })
  }

  // Enemy Function
  enemyAttack = () => {
    // Math random based on array quantity
    const hit = ATTACK[getRandom(ATTACK.length) - 1]
    const defenece = ATTACK[getRandom(ATTACK.length) - 1]

    return {
      value: getRandom(HIT[hit]),
      hit: hit,
      defence: defenece,
    }
  }

  // Player Attack Function
  playerAttack = () => {
    const attack = {};

    // Looking for checked radio
    for (let item of this.formEl) {
      if (item.checked && item.name === 'hit') {
        attack.value = getRandom(HIT[item.value]);
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
  generateLogs = (type, player1, player2) => {
    // Get new time
    const time = new Date().toLocaleTimeString();
    let text

    const {name: name1} = player1;
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
        text = logs[type][getRandom(logs[type].length) - 1]
          .replace('[playerWins]', name2)
          .replace('[playerLose]', name1);

        el = `<p>${time} : ${text}</p>`

        break;
      case 'hit':
        text = logs[type][getRandom(logs[type].length) - 1]
          .replace('[playerKick]', name1)
          .replace('[playerDefence]', name2);

        // Recieve damageRecieved and hp from player who not attacking
        el = `<p>${time} : ${text} - ${damage} [${hp2}/100]</p>`

        break;
      case 'defence':
        text = logs[type][getRandom(logs[type].length) - 1]
          .replace('[playerKick]', player1.name)
          .replace('[playerDefence]', player2.name);

        el = `<p>${time} : ${text}</p>`

        break;
      case 'draw':
        text = logs[type];

        el = `<p>${time} : ${text}</p>`

        break;
    }

    this.chat.insertAdjacentHTML("afterbegin", el);
  }

  showResult = () => {
    // Lose/Win/Draw Check
    if (player1.hp <= 0 && player1.hp < player2.hp) {
      this.arena.appendChild(this.resultText(player2.name));
      this.generateLogs('end', player1, player2);
    } else if (player2.hp <= 0 && player2.hp < player1.hp) {
      this.arena.appendChild(this.resultText(player1.name));
      this.generateLogs('end', player2, player1);
    } else if (player1.hp === 0 && player2.hp === 0) {
      this.arena.appendChild(this.resultText());
      this.generateLogs('draw', player1, player2);
    }
  }

  onSubmit = () => {
    // Filling the objects fields
    const enemy = this.enemyAttack();
    const player = this.playerAttack();

    // Check if hit blocked
    if (enemy.hit !== player.defence) {
      player1.changeHp(enemy.value);
      player1.renderHP();
      this.generateLogs('hit', player2, player1);
    } else {
      this.generateLogs('defence', player2, player1);
    }
    if (player.hit !== enemy.defence) {
      player2.changeHp(player.value);
      player2.renderHP();
      this.generateLogs('hit', player1, player2);
    } else {
      this.generateLogs('defence', player1, player2);
    }

    // Remove form after finish, and add reload btn
    if (player1.hp === 0 || player2.hp === 0) {
      this.formRemove();
      this.createReloadButton();
    }

    // Lose/Win/Draw
    this.showResult();
  }


  gameStart = () => {
    player1.createPlayer();
    player2.createPlayer();
    this.generateLogs('start', player2, player1);

    this.formEl.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit();
    });
  }
}