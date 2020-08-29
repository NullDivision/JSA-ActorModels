# Node EventEmitter class

## Description

As one of the first elements to be used by the Node ecosystem to manage everything to HTTP requests, streams or even process events the EventEmitter class is a good starting point to create actor-model delegation and subscription.

## Implementation

We assume that we have a service that monitors changes in a file and generates a log of any changes that have been made.

- We define a FileWatchActor as a means to monitor file changes
- We define a TimerActor as a means to monitor relative time ellapsed since our last file change
- We define a LoggerActor as a means to write changes to a secondary file with the changes and the relative time elapsed since our last change

Once our `input.txt` file has changed the FileWatchActor would dispatch what has changed and when. TimerActor listens to FileWatchActor's event dispatch and calculates how much time has passed. LoggerActor listens to both FileWatchActor and TimerActor to write a new entry in `output.json`.

## Conclusion
As we can see from the `index.mjs` file we've managed to create three actors that communicate with eachother with little effort using only native code.

While the implementation itself is simplistic (and questionable) it serves to emphasize that it is indeed possible to delegate specific tasks to a class and subsequently create single responsibility components that can be hooked up as needed.

## Resources
[fs.FSWatcher](https://nodejs.org/api/fs.html#fs_class_fs_fswatcher) - native file watch mechanism in Node
