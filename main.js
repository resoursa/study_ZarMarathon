
// Object Player 1
const player1 = {
    id: 1,
    name: 'Scorpion',
    hp: 70,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [
        'weapon1',
        'weapon2',
        'weapon3',
        'weapon4'
    ],
    attack: function() {
        console.log(player1.name + 'fight');
    }
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
    attack: function() {
        console.log(player2.name + 'fight');
    }
}


const arena = document.querySelector('.arenas');

// Create player Function
function createPlayer(playerId, playerObj) {
    // Main div for first player
    const player = document.createElement('div');
    player.classList.add(playerId); // player id parametr string

    // Progressbar div with life and name
    const progressbar = document.createElement('div');
    progressbar.classList.add('progressbar');

    const life = document.createElement('div');
    life.classList.add('life');
    life.style.width = playerObj.hp + '%'; // player object hp num

    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = playerObj.name; // player object name string

    // Caracter with image div
    const character = document.createElement('div');
    character.classList.add('character');

    const caracterImage = document.createElement('img');
    caracterImage.src = playerObj.img; // player object image string


    // Append nodes
    arena.appendChild(player);
    character.appendChild(caracterImage);
    player.append(progressbar, character);
    progressbar.append(life, name);
}

createPlayer('player1', player1);
createPlayer('player2', player2);


    