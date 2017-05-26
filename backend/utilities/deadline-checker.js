const Document = require('../models').Document;
const CronJob = require('cron').CronJob;
const moment = require('moment');

const deadlineCheck = (deadlineStr) => {
  const checker = new CronJob({
    cronTime: deadlineStr,
    onTick() {
      // Get yesterday's date
      let dateToSetInactive = moment().subtract(1, 'day');
      dateToSetInactive = dateToSetInactive.format().slice(0, 10);

      // Set the active field of all documents, with a deadline of yesterday's
      // date, to false
      Document.update({ active: false }, {
        where: {
          deadline: dateToSetInactive
        }
      });
    },
    timeZone: 'America/New_York'
  });

  checker.start();
};

module.exports = deadlineCheck;
