let Events2 = globalThis.Events;

if (!globalThis.Events) {
  Events2 = require('events');
}

console.log(Events2);
class PausePlayActor extends Events2.EventEmitter {
  #state = true;

  constructor() {
    super();

    this.emit('play');
  }

  toggle() {
    this.#state = !this.#state;

    if (this.#state) {
      this.emit('play');
    } else {
      this.emit('pause');
    }
  }
}
class TimerActor extends Events2.EventEmitter {
  static interval = 1000;

  #counter = 0;
  #intervalEvent;

  constructor(timescale, controller) {
    super();

    const ms = timescale * 1000;

    this.interval = ms;

    if (controller) {
      controller.on('pause', () => {
        clearInterval(this.#intervalEvent);
      });
      controller.on('play', () => {
        this.start();
      });
    }

    this.start();
  }

  reset() {
    this.#counter = 0;

    this.emit('change', this.#counter);
  }

  start() {
    this.#intervalEvent = setInterval(() => {
      this.#counter++;

      this.emit('change', this.#counter);
    }, this.interval);
  }
}

module.exports = { PausePlayActor, TimerActor };
