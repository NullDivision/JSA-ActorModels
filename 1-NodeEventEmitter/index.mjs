import EventEmitter from 'events';
import { readFileSync, watch, writeFileSync } from 'fs';

const InputFile = './input.txt';
const OutputFile = './output.json';

class FileWatchActor extends EventEmitter {
  // read in initial value
  #oldValue = readFileSync(InputFile).toString();

  constructor() {
    super();

    console.log('Starting file watcher');

    // watch for file changes
    watch(InputFile, { encoding: 'utf-8' }, (event) => {
      if (event === 'change') {
        // read new value
        const newValue = readFileSync(InputFile).toString();

        // only do something if value changes
        if (this.#oldValue !== newValue) {
          this.emit('change', {
              newValue,
              oldValue: this.#oldValue,
              time: process.hrtime()[0]
          });

          this.#oldValue = newValue;
        }
      }
    });
  }
}

class TimerActor extends EventEmitter {
  #lastChanged = 0;

  register(fileWatchActor) {
    fileWatchActor.on('change', ({ time }) => {
      if (this.#lastChanged === 0) {
        this.#lastChanged = time;
      }

      this.emit('change', time - this.#lastChanged);

      this.#lastChanged = time;
    });

    return this;
  }
}

class LoggerActor {
  #eventResults = [];

  constructor(watcher, timer) {
    watcher.on('change', (value) => {
      this.#eventResults[0] = value;

      this.#log();
    });
    timer.on('change', (value) => {
      this.#eventResults[1] = value;

      this.#log();
    });
  }

  #log() {
    const [fileChange, relTime] = this.#eventResults;

    if (typeof fileChange === 'object' && typeof relTime === 'number') {
      const output = [
          {
              changedAfterSeconds: relTime,
              newValue: fileChange.newValue,
              oldValue: fileChange.oldValue
          },
          ...JSON.parse(readFileSync(OutputFile).toString())
      ];

      writeFileSync(OutputFile, JSON.stringify(output, null, 4));

      this.#eventResults = [];
    }
  }
}

const watcher = new FileWatchActor();
const timer = new TimerActor().register(watcher);
new LoggerActor(watcher, timer);
