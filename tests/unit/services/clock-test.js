import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

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

/*
  check that the clock starts and ticks 2 seconds
*/
test('clock ticks', function(assert) {

  assert.expect(7);
  let clock = this.subject();
  let date1 = new Date();

  window.QUnit.stop();
  assert.equal(clock.get('second'), date1.getSeconds());
  assert.equal(clock.get('minute'), date1.getMinutes());
  assert.equal(clock.get('hour'), date1.getHours());

  Ember.run.later(function() {
    assert.equal(clock.get('second'), date1.getSeconds() + 2);
    let date2 = new Date();
    assert.equal(clock.get('second'), date2.getSeconds());
    assert.equal(clock.get('minute'), date2.getMinutes());
    assert.equal(clock.get('hour'), date2.getHours());
    window.QUnit.start();
  }, 2020);
});

test('willDestroy', function(assert) {
  assert.expect(1);
  let clock = this.subject();
  clock.willDestroy();
  assert.equal(clock.get('nextTick', null));
});
