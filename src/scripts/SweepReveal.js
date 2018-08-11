import 'gsap/CSSPlugin';
/* global Power1 */
import 'gsap/EasePack';

export default (timeline, elementParam, color, position) => {
  window.addEventListener('load', () => {
    const element = document.querySelector(elementParam);
    if (element.classList.contains('sweep-reveal--transparent')) {
      element.style.color = 'transparent';
    } else {
      element.style.visibility = 'hidden';
    }

    const shade = document.createElement('div');
    element.classList.forEach((className) => {
      if (/sweep-reveal./.test(className)) {
        element.classList.remove(className);
        shade.classList.add(className);
      }
    });

    Object.assign(shade.style, {
      position: 'absolute',
      left: `${window.pageXOffset + element.getBoundingClientRect().left}px`,
      top: `${window.pageYOffset + element.getBoundingClientRect().top}px`,
      width: `${element.offsetWidth}px`,
      height: `${element.offsetHeight}px`,
      backgroundColor: color,
      transformOrigin: 'left',
    });
    document.body.appendChild(shade);

    timeline.from(shade, 0.25, { scaleX: 0, ease: Power1.easeOut }, position);
    timeline.set(element, { clearProps: 'visibility, color' });
    timeline.set(shade, { transformOrigin: 'right' });
    timeline.to(shade, 0.25, { scaleX: 0, ease: Power1.easeIn });
    timeline.add(() => document.body.removeChild(shade));
  });
};
