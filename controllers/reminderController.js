'use strict';

const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const reminder = require('../models/reminder');

const getTimeZones = function () {
    return momentTimeZone.tz.names();
};

const function1 = async (req, res, next) => {
    reminder.find()
        .then(function (reminders) {
            res.render('reminders/index', { reminders: reminders });
        });
}

const function2 = async (req, res, next) => {
    res.render('reminders/create', {
        timeZones: getTimeZones(),
        reminder: new reminder({
            name: '',
            phoneNumber: '',
            notification: '',
            timeZone: '',
            time: ''
        })
    });
}

const function3 = async (req, res, next) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const notification = req.body.notification;
    const timeZone = req.body.timeZone;
    const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

    const reminder = new reminder({
        name: name,
        phoneNumber: phoneNumber,
        notification: notification,
        timeZone: timeZone,
        time: time
    });
    reminder.save()
        .then(function () {
            res.redirect('/');
        });
}

const function4 = async (req, res, next) => {
    const id = req.params.id;
    reminder.findOne({ _id: id })
        .then(function (reminder) {
            res.render('reminders/edit', {
                timeZones: getTimeZones(),
                reminder: reminder
            });
        });
}

const function5 = async (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const notification = req.body.notification;
    const timeZone = req.body.timeZone;
    const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');
  
    reminder.findOne({_id: id})
      .then(function(reminder) {
        reminder.name = name;
        reminder.phoneNumber = phoneNumber;
        reminder.notification = notification;
        reminder.timeZone = timeZone;
        reminder.time = time;
  
        reminder.save()
          .then(function() {
            res.redirect('/');
          });
      });
}

const function6 = async(req, res, next) => {
    const id = req.params.id;

    reminder.remove({_id: id})
      .then(function() {
        res.redirect('/');
      });
}

module.exports = {
    function1,
    function2,
    function3,
    function4,
    function5,
    function6
}