 // Object Player 1
export const player1 = {
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
export const player2 = {
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