const { format } = require('date-fns');

module.exports = {
  format_date: (date) => {
    return format(new Date(date), 'MMMM dd, yyyy');
  },
};
