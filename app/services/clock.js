import ENV from '../config/environment';
import Service from 'ember-clock/services/clock'
export default Service.extend({
  disabled: ENV['ember-clock'] && ENV['ember-clock'].disabled
})
