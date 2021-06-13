const arena = document.querySelector('.arenas');
const controls = document.querySelector('.control');
const formEl = document.querySelector('.control');
const submitBtn = document.querySelector('.button');
const chat = document.querySelector('.chat');

let el

const HIT = {
  head: 75,
  body: 70,
  foot: 65,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

// Object Player 1
const player1 = {
  id: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: [
    'weapon1',
    'weapon2',
    'weapon3',
    'weapon4'
  ],
  attack: function () {
    console.log(this.name + 'fight');
  },
  changeHp,
  elHp,
  renderHP,
  damageRecieved: 0,
}

// Object Player 2
const player2 = {
  id: 2,
  name: 'Kitana',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: [
    'weapon1',
    'weapon2',
    'weapon3',
    'weapon4'
  ],
  attack: function () {
    console.log(this.name + 'fight');
  },
  changeHp,
  elHp,
  renderHP,
  damageRecieved: 0,
}


// Create DOM ELement
function createDomEl(tag, className) {
  const tagEl = document.createElement(tag);

  className ? tagEl.classList.add(className) : ''

  return tagEl;
}

// Math random
function mathRandom(multiplier) {
  return Math.ceil(Math.random() * multiplier);
}

// Create player Function
function createPlayer(playerObj) {

  // Main div for first player
  const player = createDomEl('div', 'player' + playerObj.id);

  // Progressbar div with life and name
  const progressbar = createDomEl('div', 'progressbar');

  const life = createDomEl('div', 'life');
  life.style.width = playerObj.hp + '%'; // player object hp num

  const name = createDomEl('div', 'name');
  name.innerText = playerObj.name; // player object name string

  // Caracter with image div
  const character = createDomEl('div', 'character');

  const caracterImage = createDomEl('img');
  caracterImage.src = playerObj.img; // player object image string


  // Append nodes
  character.appendChild(caracterImage);
  player.append(progressbar, character);
  progressbar.append(life, name);

  return player;
}

// Change HP Only substract and check
function changeHp(subtrahend) {

  this.hp -= subtrahend;

  // Get last damage to object property
  this.damageRecieved = subtrahend

  // Check if player life less than 0
  if (this.hp <= 0) {
    this.hp = 0
  }
}

// Return player specific selector with ID of object
function elHp() {
  return document.querySelector('.player' + this.id + ' .life');
}

// Call selector function with elHp and change with of life div
function renderHP() {
  this.elHp().style.width = this.hp + '%';
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
function createReloadButton() {
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
function enemyAttack() {
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
function playerAttack() {
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
function generateLogs(type, player1, player2) {
  // Get new time
  const time = new Date().toLocaleTimeString();
  let text

  switch(type) {
    case 'start':
      text = logs[type].replace('[player1]', player1.name)
        .replace('[player2]', player2.name)
        .replace('[time]', time);

      el = `<p>${text}</p>`

      break;
    case 'end':
      text = logs[type][mathRandom(logs[type].length) - 1]
        .replace('[playerWins]', player2.name)
        .replace('[playerLose]', player1.name);

      el = `<p>${time} : ${text}</p>`

      break;
    case 'hit':
      text = logs[type][mathRandom(logs[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);

      // Recieve damageRecieved and hp from player who not attacking
      el = `<p>${time} : ${text} - ${player2.damageRecieved} [${player2.hp}/100]</p>`

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

function showResult() {
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

formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  // Filling the objects fields
  const enemy = enemyAttack();
  const player = playerAttack();

  console.log(player, enemy); // Just incase

  // Check if hit blocked
  if (enemy.hit !== player.defence) {
    player1.changeHp(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1);
  } else {
    generateLogs('defence', player2, player1);
  }
  if (player.hit !== enemy.defence) {
    player2.changeHp(player.value);
    player2.renderHP();
    generateLogs('hit', player1, player2);
  } else {
    generateLogs('defence', player1, player2);
  }

  // Remove form after finish, and add reload btn
  if (player1.hp === 0 || player2.hp === 0) {
    formEl.remove();
    createReloadButton();
  }

  // Lose/Win/Draw
  showResult();

})

// Call Logs
generateLogs('start', player2, player1);

// Call Create player
arena.appendChild(createPlayer(player1));
arena.appendChild(createPlayer(player2));
