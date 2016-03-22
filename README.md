# ember-clock

This is an Ember addon that provides a clock service.  The clock synchronizes to
the local host system clock and can be used to display the time or can be used to
update time sensitive properties.

## Installation

* `npm install ember-clock --save-dev`

## ClockService

The clock service is injected into all controllers and components.

To use the clock in a template or in computed properties, bind to the clock's
`hour`, `minute`, or `second` properties.

In templates:

```
{{clock.hour}}
{{clock.minute}}
{{clock.second}}
```

In computed properties:

```
property: Ember.computed('clock.second', function () {
  // this will update every second
})
```
