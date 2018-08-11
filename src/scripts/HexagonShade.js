import 'gsap/CSSPlugin';
/* global Power1 */
import 'gsap/EasePack';
import random from 'lodash/random';
import shuffle from 'lodash/shuffle';

export default (timeline) => {
  const hexagonShade = document.querySelector('.hexagon-shade');
  const hexagonTile = hexagonShade.querySelector('.hexagon');

  const shadeWidth = hexagonShade.offsetWidth;
  const shadeHeight = hexagonShade.offsetHeight;
  const tileWidth = hexagonTile.width.baseVal.value;
  const tileHeight = hexagonTile.height.baseVal.value;

  hexagonShade.removeChild(hexagonTile);

  const evenColumnCount = Math.ceil(((shadeWidth / 2) - (tileWidth / 2)) / tileWidth);
  const oddColumnCount = Math.ceil((shadeWidth / 2) / tileWidth);
  const rowCount = Math.ceil(((shadeHeight / 2) - (tileHeight / 4)) / (tileHeight * 0.75));

  let endTiles = [];
  const appendTile = (column, row) => {
    const clonedTile = hexagonTile.cloneNode(true);
    clonedTile.classList.add(`hexagon--color-${random(1, 2)}`);
    clonedTile.style.transform = `translate(${column * 100}%, ${row * 75}%) scale(1.005)`;
    endTiles.push(clonedTile);
    hexagonShade.appendChild(clonedTile);
  };

  for (let row = -rowCount; row <= rowCount; row += 1) {
    if (row % 2) {
      for (let column = -oddColumnCount + 0.5; column <= oddColumnCount - 0.5; column += 1) {
        appendTile(column, row);
      }
    } else {
      for (let column = -evenColumnCount; column <= evenColumnCount; column += 1) {
        appendTile(column, row);
      }
    }
  }

  const endingTile = endTiles.splice(Math.floor(endTiles.length / 2), 1);
  endTiles = shuffle(endTiles);
  endTiles.push(endingTile);

  const startTiles = shuffle(endTiles);
  timeline.staggerFromTo(
    startTiles,
    0.25,
    { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: Power1.easeIn },
    1 / startTiles.length,
  );

  window.addEventListener('load', () => {
    timeline.set('.hexagon-shade', { backgroundColor: 'transparent' });
    timeline.staggerTo(
      endTiles,
      0.25,
      { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', ease: Power1.easeIn },
      1 / endTiles.length,
    );
    timeline.add(() => hexagonShade.parentNode.removeChild(hexagonShade));
  });
};
