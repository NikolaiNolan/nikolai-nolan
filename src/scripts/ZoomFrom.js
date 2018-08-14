import 'gsap/CSSPlugin';
/* global Power1 */
import 'gsap/EasePack';

export default (timeline, elementParam, transformOrigin, position) => {
  window.addEventListener('load', () => {
    const element = document.querySelector(elementParam);

    timeline.set(element, { transformOrigin }, position);
    timeline.from(element, 10, { scale: 1.25, clearProps: 'transformOrigin, scale', ease: Power1.easeOut }, position);
  });
};
