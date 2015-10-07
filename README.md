# ember-clock

This is an Ember addon that provides a clock service.  The clock synchronises to the local host system clock every second.  The clock can be used to display the time or can be used to update time sensitive properties.

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

You can observe the clock in computed properties..

  ```
  property: Ember.computed( 'clock.minute', ... function () {
    // this will update every minute
  })
  ```

For example you might have an event scheduling system where the events need to update their status as the time changes.

  ```
  // this property will update every minute
  eventStatus: Ember.computed( 'clock.minute', 'event.start', function () {
    this.get('clock.minute');
    return this.get('event.start');
  })
  ```

  ```
  {{event-viewer status=eventStatus model=event}}
  ```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
