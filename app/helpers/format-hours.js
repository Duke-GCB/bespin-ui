import Ember from 'ember';

export function formatHours(hours, settings) {
  var result = '';
  const numHours = Number.parseFloat(hours);
  if (!isNaN(numHours) && numHours) {
    const hoursStr = numHours.toFixed(settings.digits || 1);
    if (hoursStr) {
      result = hoursStr;
    }
  }
  if (result && settings.suffix) {
    result = result + settings.suffix;
  }
  return result;
}

export default Ember.Helper.helper(formatHours);
