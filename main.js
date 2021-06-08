const arena = document.querySelector('.arenas');
const controls = document.querySelector('.control');
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
    },
    changeHealth: changeHp,
    elHp: elHp,
    renderHP: renderHP,
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
    },
    changeHealth: changeHp,
    elHp: elHp,
    renderHP: renderHP,
}


// Create DOM ELement
function createDomEl(tag, className) {
    const tagEl = document.createElement(tag);

    className ? tagEl.classList.add(className) : ''

    return tagEl;
}

// Math 1 - 20 random
function mathRandom(multiplier) {
    let result = Math.ceil(Math.random() * multiplier);

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

// Change HP Only substract and check
function changeHp(subtrahend) {

    this.hp -= subtrahend;

    // Check if player life less than 0
    if (this.hp <= 0) {
        this.hp = 0
    }
}

// Return player specific selector with ID of object
function elHp() {
    const elIdSelector = document.querySelector('.player' + this.id + ' .life');
    return elIdSelector;
}

// Call selector function with elHp and change with of life div
function renderHP() {
    this.elHp().style.width = this.hp + '%';
}

// Player Lose Alert
function resultText(name) {
    const resultOutput = createDomEl('div', 'loseTitle');
    if(name) {
        resultOutput.innerText = name + ' wins';
    } else {
        resultOutput.innerText = 'Draw';
    }

    return resultOutput;
}

function createReloadButton() {
    const wrapper = createDomEl('div', 'reloadWrap');
    const reloadBtn = createDomEl('button', 'button');
    reloadBtn.classList.add('reloadBtn');

    reloadBtn.innerText = 'Restart';

    controls.appendChild(wrapper);
    wrapper.appendChild(reloadBtn);

    const reloadButton = document.querySelector('.reloadBtn');

    reloadButton.addEventListener('click', function() {
        window.location.reload();
    })
}


randomButton.addEventListener('click', function() {
    player1.changeHealth(mathRandom(70));
    player1.renderHP();

    player2.changeHealth(mathRandom(70));
    player2.renderHP();

    console.log(player1.hp, player2.hp); // Just for checking

    // Check For Btn Disabled
    if (player1.hp === 0 || player2.hp === 0) {
        randomButton.remove();
        createReloadButton();
    }

    // Lose/Win/Draw Check
    if (player1.hp <= 0 && player1.hp < player2.hp) {
        arena.appendChild(resultText(player2.name));
    } else if (player2.hp <= 0 && player2.hp < player1.hp) {
        arena.appendChild(resultText(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        arena.appendChild(resultText());
    }
})


arena.appendChild(createPlayer(player1));
arena.appendChild(createPlayer(player2));    