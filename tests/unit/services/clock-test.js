import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:clock', 'Unit | Service | clock', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

/*
  check that the clock starts and keeps time after 10 seconds
*/
test('clock ticks 10 seconds', function(assert) {

  assert.expect(6);
  var clock = this.subject();
  var date = new Date();
  window.QUnit.stop();
  assert.equal(clock.get('second'), date.getSeconds());
  assert.equal(clock.get('minute'), date.getMinutes());
  assert.equal(clock.get('hour'), date.getHours());

  Ember.run.later(function() {
    var date = new Date();
    assert.equal(clock.get('second'), date.getSeconds());
    assert.equal(clock.get('minute'), date.getMinutes());
    assert.equal(clock.get('hour'), date.getHours());
    window.QUnit.start();
  }, 10050);
});

/*
  check that the clock stops
*/
test('clock stops', function(assert) {

  assert.expect(2);
  var clock = this.subject();
  var date = new Date();
  assert.equal(clock.get('second'), date.getSeconds());

  clock.stopClock();
  assert.equal(clock.get('nextTick', null));
});
