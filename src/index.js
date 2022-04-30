/* global TimelineLite */
import 'gsap/TimelineLite';
import { generate } from 'phonetic';

import './styles/index.scss';
import HexagonShade from './scripts/HexagonShade';
import SweepReveal from './scripts/SweepReveal';
import ZoomFrom from './scripts/ZoomFrom';

if (/^\?feature=/.test(window.location.search)) {
  const destination = window.location.search.slice(9);
  if (/^awards/.test(destination)) window.location.replace(`https://${destination.slice(6)}.bloggi.es/`);
  if (destination === 'sxsw2000') window.location.replace('https://www.facebook.com/media/set/?set=a.10102497698848303&type=1&l=6ffd4105b1');
  if (destination === 'sxsw2001') window.location.replace('https://www.facebook.com/media/set/?set=a.10102869300071473&type=1&l=6ffd4105b1');
  if (destination === 'smc2000') window.location.replace('https://www.facebook.com/media/set/?set=a.10101944997491253&type=1&l=d4ae75ad6a');
}

const todaysWord = generate({
  seed: new Date().setUTCHours(0, 0, 0, 0),
  capFirst: false,
});
document.querySelector('.email-link').href = `mailto:${todaysWord}@nikol.ai`;

const timeline = new TimelineLite();

HexagonShade(timeline);

SweepReveal(timeline, '.header__text__inner', '#008cd2', '+=0.5');

SweepReveal(timeline, '.icon-list__item--red', '#c20839', '+=0.5');
SweepReveal(timeline, '.icon-list__item--green', '#00a532', '-=0.375');
SweepReveal(timeline, '.icon-list__item--purple', '#935782', '-=0.375');
SweepReveal(timeline, '.icon-list__item--orange', '#dd731d', '-=0.375');

SweepReveal(timeline, '.social-list', '#008cd2', '-=0.375');

ZoomFrom(timeline, '.background', `${(1513 / 1920) * 100}% ${(153 / 1440) * 100}%`, '-=4.25');
