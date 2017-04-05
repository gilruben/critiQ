const Document = require('../models').Document;
const CronJob = require('cron').CronJob;
const moment = require('moment');

const deadlineCheck = new CronJob({
  cronTime: '00 29 11 * * 1-7',
  onTick() {
    // Get yesterdays date
    let dateToSetInactive = moment().subtract(1, 'day');
    dateToSetInactive = dateToSetInactive.format().slice(0, 10);

    Document.update({ active: false }, {
      where: {
        deadline: dateToSetInactive
      }
    });
  },
  timeZone: 'America/New_York'
});

module.exports = deadlineCheck;
