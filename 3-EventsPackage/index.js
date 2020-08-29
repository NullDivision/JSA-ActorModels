const { emitKeypressEvents } = require('readline');
const Timers = require('./timers');

emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const secondTimer = new Timers.TimerActor(1);
let timeSpent = 0;

secondTimer.on('change', (value) => {
  timeSpent = value;
});

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }

  if (key.name === 'return') {
    console.log(timeSpent);
  }
});

console.log('Press Enter to report time spent...');
