const arena = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');


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
    attack: function() {
        console.log(this.name + 'fight');
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
        console.log(this.name + 'fight');
    }
}


// Create DOM ELement
function createDomEl(tag, className) {
    const tagEl = document.createElement(tag);

    className ? tagEl.classList.add(className) : ''

    return tagEl;
}

// Math 1 - 20 random

function mathRandom() {
    let result = Math.ceil(Math.random() * 20);

    return result;
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

// Change HP function
function changeHP(playerObj) {
    const playerLife = document.querySelector('.player' + playerObj.id + ' .life');
    playerObj.hp -= mathRandom();
    console.log(playerLife);
    playerLife.style.width = playerObj.hp >= 0 ? playerObj.hp + '%' : 0;;

    // Here might be better :(
    if (player1.hp <= 0) {
        arena.appendChild(playerWin(player2.name));
        randomButton.disabled = true;
    }
    if (player2.hp <= 0) {
        arena.appendChild(playerWin(player1.name));
        randomButton.disabled = true;
    }
}

// Player Lose Alert
function playerWin(name) {
    const loseTitle = createDomEl('div', 'loseTitle');
    loseTitle.innerText = name + ' wins';

    return loseTitle;
}


randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
})

arena.appendChild(createPlayer(player1));
arena.appendChild(createPlayer(player2));    