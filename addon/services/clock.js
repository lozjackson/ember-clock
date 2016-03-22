/**
  @module ember-clock
*/
import Ember from 'ember';

/**
  ## ClockService

  The clock service is injected into all controllers and components.  The clock
  synchronises to the local host's system clock and can be used to
  display the time or can be used to update time sensitive properties.

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
  property: Ember.computed('clock.second', function () {
    // this will update every second
  })
  ```

  For example you might have an event scheduling system where the events need to
  update their status as the time changes.

  ```
  // this property will update every minute
  status: Ember.computed('clock.minute', 'event.status', function () {
    return this.get('event.status');
  })
  ```

  @class ClockService
  @namespace EmberClock
*/
export default Ember.Service.extend({

  /**
    @property hour
    @type {Integer}
  */
  hour: null,
  
  /**
    @property minute
    @type {Integer}
  */
  minute: null,
  
   /**
    @property second
    @type {Integer}
  */
  second: null,

  /**
    Stores the next tick, so that it can be cancelled and the clock stopped.
    @property nextTick
    @type {Object}
    @private
  */
  nextTick: null,

  /**
    Call `startClock()`
    @method init
    @private
  */
  init() {
    this.startClock();
  },

  /**
    Start the clock
    @method startClock
    @private
  */
  startClock() {
    this.tick();
  },

  /**
    Stop the clock
    @method stopClock
    @private
  */
  stopClock() {
    var nextTick = this.get('nextTick');
    Ember.run.cancel(nextTick);
    this.set('nextTick', null);
  },

  /**
    Set the time to the current time.
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
    call `stopClock()`
    @event willDestroy
    @private
  */
  willDestroy() {
    this.stopClock();
  }
});
