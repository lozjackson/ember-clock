import ENV from '../config/environment';
import Service from 'ember-clock/services/clock'

const isDisabled = ENV['ember-clock'] && ENV['ember-clock'].disabled;
export default Service.extend({
  disabled: isDisabled
})
