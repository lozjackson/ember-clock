import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from '../../../initializers/clock';
import { module, test } from 'qunit';

var application;

module('Unit | Initializer | clock', {
  beforeEach: function() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  }
});

test('it works', function(assert) {
  initialize(application);
  assert.ok(true);
});
