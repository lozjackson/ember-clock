/**
 * @module ember-clock
 */
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { cancel, later } from '@ember/runloop';
import { registerDestructor } from '@ember/destroyable';

/**
 * ## ClockService
 *
 * The clock synchronizes to the local host's system clock and can be used to
 * display thetime or to update time sensitive properties.
 *
 * @class ClockService
 * @namespace EmberClock
 */
export default class ClockService extends Service {
  /**
    @property hour
    @type {Integer}
  */
  @tracked hour = null;

  /**
    @property minute
    @type {Integer}
  */
  @tracked minute = null;

  /**
    @property second
    @type {Integer}
  */
  @tracked second = null;

  /**
    Stores the next tick, so that it can be cancelled and the clock stopped.
    @property nextTick
    @type {Object}
    @private
  */
  @tracked nextTick = null;

  /**
    @property isTicking
    @type {Boolean}
    @readonly
  */
  get isTicking() {
    return Boolean(this.nextTick);
  }

  /**
    Call `start()`
    @method init
    @private
  */
  constructor() {
    super(...arguments);
    this.start();
    registerDestructor(this, () => this.stop());
  }

  /**
    Start the clock
    @method start
    @private
  */
  start() {
    this.tick();
  }

  /**
    Stop the clock
    @method stop
    @private
  */
  stop() {
    cancel(this.nextTick);
    this.nextTick = null;
  }

  /**
    Set the time to the current time.
    @method setTime
    @private
  */
  setTime() {
    const now = new Date();
    this.second = now.getSeconds();
    this.minute = now.getMinutes();
    this.hour = now.getHours();
  }

  /**
    Ticks the clock
    @method tick
    @private
  */
  tick() {
    this.setTime();
    if (this.disabled) {
      return;
    }
    this.nextTick = later(this, this.tick, 1000);
  }
}
