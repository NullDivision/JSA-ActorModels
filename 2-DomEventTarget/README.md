# DOM EventTarget class
## Description
As part of the DOM environment most elements including Window, Document and Element inherit event-related methods and properties from EventTarget.

While logically these were divised to be DOM elements we can implement the same functionality can be reused to extend actors, thus creating an easy to manage pub/sub system.

## Implementation
We implement a stopwatch with individual counters for hours, minutes, and seconds. Using a pause button we would allow the timer to be stopped and started.

- We define a TimerActor that dispatches at a fixed interval and listens to pause-play requests from the StartStopActor
- We define a StartStopActor that listens to requests from the DOM and notifies all attached TimerActors

## Resources
[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) - defacto implementation of events in all browsers