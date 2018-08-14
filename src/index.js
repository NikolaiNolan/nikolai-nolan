import GAnalytics from 'ganalytics';
/* global TimelineLite */
import 'gsap/TimelineLite';

import './styles/index.scss';
import HexagonShade from './scripts/HexagonShade';
import SweepReveal from './scripts/SweepReveal';
import ZoomFrom from './scripts/ZoomFrom';

const timeline = new TimelineLite();

HexagonShade(timeline);

SweepReveal(timeline, '.header__text__inner', '#008cd2', '+=0.5');

SweepReveal(timeline, '.icon-list__item--red', '#c20839', '+=0.5');
SweepReveal(timeline, '.icon-list__item--green', '#00a532', '-=0.375');
SweepReveal(timeline, '.icon-list__item--purple', '#935782', '-=0.375');
SweepReveal(timeline, '.icon-list__item--orange', '#dd731d', '-=0.375');

SweepReveal(timeline, '.social-list', '#008cd2', '-=0.375');

ZoomFrom(timeline, '.background', `${(1513 / 1920) * 100}% ${(153 / 1440) * 100}%`, '-=4.25');

new GAnalytics('UA-28036640-1'); // eslint-disable-line no-new
