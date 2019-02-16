import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { typeOf } from '@ember/utils';
import { run } from '@ember/runloop';

module('Unit | Service | clock', function(hooks) {
  setupTest(hooks);

  test('isTicking', function(assert) {
    let clock = this.owner.lookup('service:clock');

    clock.stop();
    assert.equal(clock.get('isTicking'), false);

    clock.start();
    assert.equal(clock.get('isTicking'), true);
  });

  test('start', function(assert) {
    assert.expect(1);
    let clock = this.owner.lookup('service:clock');
    clock.set('tick', () => assert.ok(true));
    clock.start();
  });

  test('stop', function(assert) {
    assert.expect(1);
    let clock = this.owner.lookup('service:clock');
    clock.stop();
    assert.equal(clock.get('nextTick', null));
  });

  test('clock ticks', function(assert) {
    assert.expect(6);

    let clock = this.owner.lookup('service:clock');
    clock.stop();
    clock.setTime = () => assert.ok(true);
    const later = run.later;
    run.later = (context, callback, time) => {
      assert.deepEqual(context, clock);
      assert.equal(typeOf(callback), 'function');
      assert.deepEqual(callback, clock.tick);
      assert.equal(time, 1000);
      return { method: 'ember-run-later' };
    };

    clock.tick();

    assert.deepEqual(clock.get('nextTick'), { method: 'ember-run-later' });
    run.later = later;
  });

  test('willDestroy', function(assert) {
    assert.expect(1);
    let clock = this.owner.lookup('service:clock');
    clock.willDestroy();
    assert.equal(clock.get('nextTick', null));
  });
});
