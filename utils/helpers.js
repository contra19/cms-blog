const { format } = require('date-fns');
const dateHelper = require('handlebars');

// Handlebars helper for date formatting
dateHelper.registerHelper('formatDate', function(date) {
    return format(new Date(date), 'MMMM do yyyy, h:mm:ss a');
});

module.exports = dateHelper;