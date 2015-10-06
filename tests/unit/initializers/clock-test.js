import Ember from 'ember';
import { initialize } from '../../../initializers/clock';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | clock', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

test('it works', function(assert) {
  initialize(application);
  assert.ok(true);
});
