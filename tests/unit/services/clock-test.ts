import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Sinon from 'sinon';

module('Unit | Service | clock', function (hooks) {
  setupTest(hooks);

  test('isTicking', function (assert) {
    const clock = this.owner.lookup('service:clock');

    clock.stop();
    assert.false(clock.isTicking, 'isTicking should be false');

    clock.start();
    assert.true(clock.isTicking, 'isTicking should be true');
  });

  test('start', function (assert) {
    const clock = this.owner.lookup('service:clock');
    const tickStub = Sinon.stub(clock, 'tick');

    clock.start();

    assert.true(tickStub.calledOnce, 'tick was called once');
  });

  test('stop', function (assert) {
    const clock = this.owner.lookup('service:clock');
    clock.stop();

    assert.strictEqual(
      clock.nextTick,
      undefined,
      'nextTick should be undefined',
    );
  });

  test('clock ticks', function (assert) {
    const clock = this.owner.lookup('service:clock');
    clock.stop();
    const setTimeStub = Sinon.stub(clock, 'setTime');

    clock.tick();

    assert.true(setTimeStub.calledOnce, 'setTime was called once');
  });
});
