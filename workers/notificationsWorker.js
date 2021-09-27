'use strict';

const reminder = require('../models/reminder');

const notificationWorkerFactory = function() {
  return {
    run: function() {
      reminder.sendNotifications();
    },
  };
};

module.exports = notificationWorkerFactory();