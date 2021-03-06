import Backbone from 'backbone';
import Radio from 'backbone.radio';

export default Backbone.Model.extend({
  constructor() {
    Backbone.Model.apply(this, arguments);
    this.on('request', this.handleRequest);
    this.on('error', this.handleError);
  },

  handleRequest() {
    Radio.request('flashes', 'remove', this.serverError);
    delete this.serverError;
  },

  handleError() {
    this.serverError = { type: 'danger', title: 'Server Error' };
    Radio.request('flashes', 'add', this.serverError);
  },

  cleanup() {
    if (this.serverError) {
      Radio.request('flashes', 'remove', this.serverError);
    }
    delete this.serverError;
    delete this.validationError;
  }
});
