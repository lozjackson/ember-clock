# ember-clock

This is an Ember-cli addon that provides a clock service.  The clock synchronizes to
the local host system clock and can be used to display the time or to update time
sensitive properties.

## Demo

http://lozjackson.github.io/ember-clock/

## Installation

* `ember install ember-clock`

## ClockService

The clock service is injected into all controllers and components.

To use the clock in a template or in computed properties, bind to the clock's
`hour`, `minute`, or `second` properties.

In templates:

```hbs
{{clock.hour}}
{{clock.minute}}
{{clock.second}}
```

In computed properties:

```js
property: Ember.computed('clock.second', function () {
  // this will update every second
})
```
