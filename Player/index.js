import {createDomEl} from "../utils";

export class Player {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.id = props.id;
    this.img = props.img;
    this.selector = `player${this.id}`;
    this.rootSelector = props.rootSelector;
  }

  // Return player specific selector with ID of object
  elHp = () => document.querySelector(`.${this.selector} .life`);

  // Change HP Only substract and check
  changeHp = (randomNum) => {

    this.hp -= randomNum;

    // Check if player life less than 0
    if (this.hp <= 0) {
      this.hp = 0
    }
  }


  // Call selector function with elHp and change with of life div
  renderHP = () => this.elHp().style.width = this.hp + '%';

  // Create player Function
  createPlayer = () => {

    // Main div for first player
    const player = createDomEl('div', this.selector);

    // Progressbar div with life and name
    const progressbar = createDomEl('div', 'progressbar');

    const life = createDomEl('div', 'life');
    life.style.width = this.hp + '%'; // player object hp num

    const playerName = createDomEl('div', 'name');
    playerName.innerText = this.name; // player object name string

    // Caracter with image div
    const character = createDomEl('div', 'character');

    const caracterImage = createDomEl('img');
    caracterImage.src = this.img; // player object image string


    // Append nodes
    character.appendChild(caracterImage);
    player.append(progressbar, character);
    progressbar.append(life, playerName);

    // Get Root Selector For Append
    const rootEl = document.querySelector(`.${this.rootSelector}`);
    rootEl.appendChild(player);

    return player;
  }
}