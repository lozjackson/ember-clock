import Controller from '@ember/controller';
import { service } from '@ember/service';
import type ClockService from 'ember-clock';

export default class ApplicationController extends Controller {
  @service declare clock: ClockService;
}
