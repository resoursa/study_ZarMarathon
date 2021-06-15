import {player1, player2} from './player.js';
import {createDomEl, generateLogs, formRemove, enemyAttack, playerAttack, showResult, createReloadButton} from './utils.js'
import {formEl, arena} from './constant.js'

// Create player Function
function createPlayer(playerObj) {

  const {name, hp, img, id} = playerObj

  // Main div for first player
  const player = createDomEl('div', 'player' + id);

  // Progressbar div with life and name
  const progressbar = createDomEl('div', 'progressbar');

  const life = createDomEl('div', 'life');
  life.style.width = hp + '%'; // player object hp num

  const playerName = createDomEl('div', 'name');
  playerName.innerText = name; // player object name string

  // Caracter with image div
  const character = createDomEl('div', 'character');

  const caracterImage = createDomEl('img');
  caracterImage.src = img; // player object image string


  // Append nodes
  character.appendChild(caracterImage);
  player.append(progressbar, character);
  progressbar.append(life, playerName);

  return player;
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
    formRemove();
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
