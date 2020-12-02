window.$c = window.console;
window.$c.version = (p, other) => {
  const txt = ` ${p.name}: %c${p.version} `;
  const colMax = 180;
  const getColor = (max = colMax) => {
    return Math.floor(Math.random() * (max + 1));
  }
  const style =
    `font-size:1.2em;font-weight:900;color:rgb(${getColor()},${getColor()},${getColor()})`;
  window.$c.log(` ${other ? other + ' =>' : ''}${txt}`, style);
}
// window.console = {
//   log() {},
//   error: window.console.error,
//   warn: window.console.warn
// };
