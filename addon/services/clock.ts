/**
 * @module ember-clock
 */
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { cancel, later } from '@ember/runloop';
import type { Timer } from '@ember/runloop';
import type Owner from '@ember/owner';
import { registerDestructor } from '@ember/destroyable';

const Interval = 1000;

/**
 * ## ClockService
 *
 * The clock synchronizes to the local host's system clock and can be used to
 * display the time or to update time sensitive properties.
 *
 * @class ClockService
 * @namespace EmberClock
 */
export default class ClockService extends Service {
  disabled: boolean = false;

  /**
   * @property hour
   */
  @tracked hour: number = 0;

  /**
   * @property minute
   */
  @tracked minute: number = 0;

  /**
   * @property second
   */
  @tracked second: number = 0;

  /**
   * Stores the next tick, so that it can be cancelled and the clock stopped.
   * @property nextTick
   * @private
   */
  @tracked nextTick?: Timer;

  /**
   * @property isTicking
   * @readonly
   */
  get isTicking() {
    return Boolean(this.nextTick);
  }

  /**
   * Call `start()`
   * @method constructor
   */
  constructor(owner: Owner) {
    super(owner);
    this.start();
    registerDestructor(this, () => this.stop());
  }

  /**
   * Start the clock
   *
   * @method start
   * @private
   */
  start() {
    this.tick();
  }

  /**
   * Stop the clock
   *
   * @method stop
   * @private
   */
  stop() {
    cancel(this.nextTick);
    this.nextTick = undefined;
  }

  /**
   * Set the time to the current time.
   * @method setTime
   * @private
   */
  setTime() {
    const now = new Date();
    this.second = now.getSeconds();
    this.minute = now.getMinutes();
    this.hour = now.getHours();
  }

  /**
   * Ticks the clock
   * @method tick
   * @private
   */
  tick() {
    this.setTime();
    if (this.disabled) {
      return;
    }

    this.nextTick = later(this, this.tick, Interval);
  }
}

declare module '@ember/service' {
  interface Registry {
    clock: ClockService;
  }
}
