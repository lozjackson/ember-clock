import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { typeOf } from '@ember/utils';
import { later } from '@ember/runloop';
import Sinon from 'sinon';

module('Unit | Service | clock', function (hooks) {
  setupTest(hooks);

  test('isTicking', function (assert) {
    const clock = this.owner.lookup('service:clock');

    clock.stop();
    assert.equal(clock.isTicking, false);

    clock.start();
    assert.equal(clock.isTicking, true);
  });

  test('start', function (assert) {
    assert.expect(1);
    const clock = this.owner.lookup('service:clock');
    clock.set('tick', () => assert.ok(true));
    clock.start();
  });

  test('stop', function (assert) {
    assert.expect(1);
    const clock = this.owner.lookup('service:clock');
    clock.stop();
    assert.equal(clock.nextTick, null);
  });

  test('clock ticks', function (assert) {
    const clock = this.owner.lookup('service:clock');
    clock.stop();
    const setTimeStub = Sinon.stub(clock, 'setTime');

    clock.tick();

    assert.true(setTimeStub.calledOnce, 'setTime was called once');
  });

  test('willDestroy', function (assert) {
    assert.expect(1);
    const clock = this.owner.lookup('service:clock');
    clock.willDestroy();
    assert.equal(clock.nextTick, null);
  });
});
