/**
  @module ember-clock
*/
import Ember from 'ember';

/**
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
  */
  nextTick: null,

  /**
    Calls `startClock()`

    @method init
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
