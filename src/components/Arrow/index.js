import { animSpeedFromWindSpeed, colorFromWindSpeed, tailHeightFromWindSpeed } from '../../utils';
import styles from './styles.scss';

const SHOULD_USE_SMALLER_ARROWS = window.innerWidth <= 640;

const HEAD_WIDTH = SHOULD_USE_SMALLER_ARROWS ? 7 : 9;
const HEAD_HEIGHT = SHOULD_USE_SMALLER_ARROWS ? 6 : 8;
const TAIL_WIDTH = SHOULD_USE_SMALLER_ARROWS ? 1 : 2;
const DIR_TO_DEG = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5
};
const DIRS = Object.keys(DIR_TO_DEG);

export default function Arrow({ speed, dir } = {}) {
  dir = DIRS.indexOf(dir) > -1 ? dir : 'N';

  const animSpeed = animSpeedFromWindSpeed(speed);
  const color = colorFromWindSpeed(speed);
  const tailHeight = tailHeightFromWindSpeed(speed) * (SHOULD_USE_SMALLER_ARROWS ? 0.75 : 1);
  const height = HEAD_HEIGHT + tailHeight;
  const path = `M${HEAD_WIDTH / 2} ${height}L0 ${tailHeight}h${(HEAD_WIDTH - TAIL_WIDTH) /
    2}V0h${TAIL_WIDTH}v${tailHeight}H${HEAD_WIDTH}l-${HEAD_WIDTH / 2} ${HEAD_HEIGHT}z`;
  const rootEl = document.createElement('div');

  const graphicHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="${styles.graphic}" width="${HEAD_WIDTH}" height="${height}">
  <path fill="${color}" fill-rule="evenodd" d="${path}"/>
</svg>`;
  rootEl.className = `${styles.root}`;
  rootEl.setAttribute('data-dir', dir);
  rootEl.setAttribute('data-anim-speed', animSpeed);
  rootEl.innerHTML = `<div class="${styles.angle}">${graphicHTML}${graphicHTML}</div>`;

  this.el = rootEl;
}
