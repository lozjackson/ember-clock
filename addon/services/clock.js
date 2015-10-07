/**
  @module ember-clock
*/
import Ember from 'ember';

/**
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

  For example you might have an event scheduling system where the events need to 
  update their status as the time changes.

    ```
    // this property will update every minute
    eventStatus: Ember.computed( 'clock.minute', 'event.status', function () {
      this.get('clock.minute');
      return this.get('event.status');
    })
    ```

    ```
    {{event-viewer status=eventStatus model=event}}
    ```

  @class ClockService
  @namespace EmberClock
*/
export default Ember.Service.extend({

  /**
    @property second
    @type {Integer}
  */
  second: null,

  /**
    @property minute
    @type {Integer}
  */
  minute: null,

  /**
    @property hour
    @type {Integer}
  */
  hour: null,

  /**
    Stores the next tick, so that it can be cancelled and the clock stopped.

    @property nextTick
    @type {Object}
    @private
  */
  nextTick: null,

  /**
    Calls `startClock()`

    @method init
    @private
  */
  init() {
    this.startClock();
  },

  /**
    Starts the clock

    @method startClock
  */
  startClock() {
    this.tick();
  },

  /**
    Stops the clock
    @method stopClock
  */
  stopClock() {
    var nextTick = this.get('nextTick');
    Ember.run.cancel(nextTick);
    this.set('nextTick', null);
  },

  /**
    Sets the time to the current time.

    @method setTime
    @private
  */
  setTime() {
    var now = new Date();
    this.setProperties({
      second: now.getSeconds(),
      minute: now.getMinutes(),
      hour:   now.getHours()
    });
  },

  /**
    Ticks the clock

    @method tick
    @private
  */
  tick() {
		this.setTime();
      var nextTick = Ember.run.later(this, function() {
        this.tick();
		  }, 1000);
		this.set('nextTick', nextTick);
	},

  /**
    calls `stopClock()`

    @event willDestroy
  */
  willDestroy() {
    this.stopClock();
  }
});
