import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const { typeOf } = Ember;

moduleFor('service:clock', 'Unit | Service | clock', {
});

test('isTicking', function(assert) {

  assert.expect(3);
  let clock = this.subject();

  assert.equal(clock.get('isTicking'), true);
  clock.stop();
  assert.equal(clock.get('isTicking'), false);

  clock.start();
  assert.equal(clock.get('isTicking'), true);
});

test('start', function(assert) {
  assert.expect(1);
  let clock = this.subject();
  clock.set('tick', () => assert.ok(true));
  clock.start();
});

test('stop', function(assert) {
  assert.expect(1);
  let clock = this.subject();
  clock.stop();
  assert.equal(clock.get('nextTick', null));
});

test('clock ticks', function(assert) {
  assert.expect(6);
  let later = Ember.run.later;

  let clock;
  clock = this.subject();
  clock.stop();
  clock.setTime = () => assert.ok(true);

  Ember.run.later = (context, callback, time) => {
    assert.deepEqual(context, clock);
    assert.equal(typeOf(callback), 'function');
    assert.deepEqual(callback, clock.tick);
    assert.equal(time, 1000);
    return { method: 'ember-run-later' };
  };

  clock.tick();

  assert.deepEqual(clock.get('nextTick'), { method: 'ember-run-later' });
  Ember.run.later = later;
});

test('willDestroy', function(assert) {
  assert.expect(1);
  let clock = this.subject();
  clock.willDestroy();
  assert.equal(clock.get('nextTick', null));
});
