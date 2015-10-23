/*
  Inject the clock service into all controllers and components
*/
export function initialize() {
  const app = arguments[1] || arguments[0];
  app.inject('controller', 'clock', 'service:clock');
  app.inject('component', 'clock', 'service:clock');
}

export default {
  name: 'clock',
  initialize: initialize
};
