import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked value = '';
  @tracked changed = '';

  @action handleInput(event) {
    this.value = event.currentTarget.value;
  }

  @action handleChange(event) {
    this.changed = event.currentTarget.value;
  }

  @action setProgrammatic() {
    this.value = 'programmatic';
  }
}
