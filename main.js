const arena = document.querySelector('.arenas');
const controls = document.querySelector('.control');
const formEl = document.querySelector('.control');
const submitBtn = document.querySelector('.button');

const HIT = {
    head: 75,
    body: 70,
    foot: 65,
}
const ATTACK = ['head', 'body', 'foot'];

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
    changeHp,
    elHp,
    renderHP,
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
    changeHp,
    elHp,
    renderHP,
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
    return document.querySelector('.player' + this.id + ' .life');
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

    arena.appendChild(wrapper);
    wrapper.appendChild(reloadBtn);

    const reloadButton = document.querySelector('.reloadBtn');

    reloadButton.addEventListener('click', function() {
        window.location.reload();
    })
}

// Attack Function
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

formEl.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = {};

    for(let item of formEl) {
        if(item.checked && item.name === 'hit') {
            attack.value = mathRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    console.log(attack, enemy);

    if(enemy.hit !== attack.defence) {
        player1.changeHp(enemy.value);
        player1.renderHP();
    }
    if(attack.hit !== enemy.defence) {
        player2.changeHp(attack.value);
        player2.renderHP();
    }

    if (player1.hp === 0 || player2.hp === 0) {
        formEl.remove();
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
