
// Math random
export const getRandom = (num) => Math.ceil(Math.random() * num);

// Create DOM element Shortcut
export const createDomEl = (tag, className) => {
  const tagEl = document.createElement(tag);
  className ? tagEl.classList.add(className) : ''

  return tagEl;
}