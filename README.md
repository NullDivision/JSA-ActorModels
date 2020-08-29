# Usefulness of actor-model in JS ecosystem

## Motivation
The Javascript ecosystem has become increasingly dependent on ways to manage and pass around data from React using Redux, Angular using RxJS, as well as various approaches for Node to communicate with database layers (DAL, Mongoose, etc).

While these approaches have all managed to do a good job of syncronizing data between decoupled elements they are not ideal when considering cross-platform or cross-domain integration. Due to inconsistency between implementation details glue code (code that translates data from one domain to another) is required.

While glue code is generally a point of interest for individual endpoints, used to decode information for a specific domain, the actor-model approach defines a standard model of behavior usable by any environment. This allows, for instance, a React application and an Angular application to share a common logical layer without relying on a specific clamp on what library or environment to use.

## Expectation
An actor-model as described [here](https://en.wikipedia.org/wiki/Actor_model#Fundamental_concepts) is a system that is capable of generating content based on messages received from other actors, mutating them as needed and returning new data.

In simplified terms consider a theatre play where each actor receives their cues from other actors as they recite their lines or things like a curtain call.

Using this as our jumping off point an actor-model should:
1. receive information from other actors
2. do something based on received information
3. notify anyone watching the actor about anything it has to say

## Approaches
### Node EventEmitter
A minimal integration layer using a pub/sub system implemented with EventEmitter.

See [here](./1-NodeEventEmitter).
### DOM EventTarget
A purely native integration using the pre-existing EventTarget class.

See [here](./2-DomEventTarget).

## Resources
[Actor-Model](https://en.wikipedia.org/wiki/Actor_model) - description of what the concept is as well as history on the subject
[Node EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) - the basic EventEmitter used by Node
