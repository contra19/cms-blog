const { format } = require('date-fns');

module.exports = {
  format_date: (date) => {
    try {
      if (!date) {
        return 'Invalid date';
      }
      return format(new Date(date), 'MMMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  },
};
