import styles from './styles.scss';

export default function Legend() {
  const rootEl = document.createElement('div');

  rootEl.className = styles.root;
  rootEl.innerHTML = `<div class="${styles.inner}">
    <div class=${styles.title}>Wind speeds</div>
    <div class="${styles.gradient}"></div>
    <div class="${styles.extents}"><span>← less than 10 kp/h</span><span>more than 100 kp/h →</span></div>
  </div>`;

  this.el = rootEl;
}
