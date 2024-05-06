# ember-clock

This is an Ember-cli addon that provides a clock service. The clock synchronizes to
the local host system clock and can be used to display the time or to update time
sensitive properties.

## Compatibility

2.x requires Ember 4+ and Node 18+

## Breaking Changes in 2.0.0

v2.0.0 removes implicit injections as these are deprecated in Ember 3.x and removed
in Ember 4.x. You must explicitly inject the clock service like so:

```
import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class MyComponent extends Component {
  @service clock;
}
```

## Demo

http://lozjackson.github.io/ember-clock/

## Installation

- `ember install ember-clock`

## ClockService

The clock service should be injected into controllers and components where required.

To use the clock in a template or in computed properties, bind to the clock's
`hour`, `minute`, or `second` properties.

In templates:

```hbs
{{this.clock.hour}}
{{this.clock.minute}}
{{this.clock.second}}
```

In computed properties:

```js
@service clock;

get seconds() {
  // this will update every second
  const second = this.clock.second
  return `${ second } seconds`
});
```

## Know Issues

The clock service will break Ember acceptance tests, as it creates a continuous run loop to update the current time. To disable the runloop update your config/environment file with the following

```js
module.exports = function (environment) {
  //...
  if (environment === "test") {
    //...
    ENV["ember-clock"] = {
      disabled: true,
    };
  }
};
```
