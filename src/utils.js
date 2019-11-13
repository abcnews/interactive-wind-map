import { scaleLinear, scaleQuantize } from 'd3-scale';

const ANIM_SPEED_RANGE = ['slowest', 'slower', 'slow', 'standard', 'fast', 'faster', 'fastest'];
const COLOR_RANGE = [
  '#FFC785',
  '#FEA762',
  '#FC8742',
  '#F96722',
  '#EA4917',
  '#D12D1F',
  '#B81127',
  '#89002F',
  '#400023',
  '#000000'
];
const TAIL_HEIGHT_RANGE = [5, 45];
const WIND_SPEED_DOMAIN = [10, 100];

export const animSpeedFromWindSpeed = scaleQuantize()
  .domain(WIND_SPEED_DOMAIN)
  .range(ANIM_SPEED_RANGE);

export const colorFromWindSpeed = scaleQuantize()
  .domain(WIND_SPEED_DOMAIN)
  .range(COLOR_RANGE);

export const tailHeightFromWindSpeed = scaleLinear()
  .domain(WIND_SPEED_DOMAIN)
  .range(TAIL_HEIGHT_RANGE)
  .clamp(true);
