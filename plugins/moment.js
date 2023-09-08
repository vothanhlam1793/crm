// plugins/moment.js
import moment from 'moment';

export default function (_, inject) {
  // Inject Moment vào context
  inject('moment', moment);
}