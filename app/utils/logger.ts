// const emoji = r equire('node-emoji');
import chalk from 'chalk';
import * as emoji from 'node-emoji';

const info = chalk.bold.green;
const warn = chalk.bold.yellow;
const error = chalk.bold.red;

export default {
  warn: (...args) => {
    console.log(emoji.get('warning'), '-->', warn(...args));
  },
  info: (...args) => {
    console.log(emoji.random().emoji, '-->', info(...args));
  },
  error: (...args) => {
    console.error(emoji.get('x'), '-->', error(...args));
  },
  log: (emojiSelect: string, color: string, ...args) => {
    console.log(emoji.get(emojiSelect), '-->', chalk.keyword(color)(...args));
  },
};
