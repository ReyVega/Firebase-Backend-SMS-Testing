'use strict';

const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const Appointment = require('../models/appointment');

const getTimeZones = function () {
    return momentTimeZone.tz.names();
};

const function1 = async (req, res, next) => {
    Appointment.find()
        .then(function (appointments) {
            res.render('appointments/index', { appointments: appointments });
        });
}

const function2 = async (req, res, next) => {
    res.render('appointments/create', {
        timeZones: getTimeZones(),
        appointment: new Appointment({
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

    const appointment = new Appointment({
        name: name,
        phoneNumber: phoneNumber,
        notification: notification,
        timeZone: timeZone,
        time: time
    });
    appointment.save()
        .then(function () {
            res.redirect('/');
        });
}

const function4 = async (req, res, next) => {
    const id = req.params.id;
    Appointment.findOne({ _id: id })
        .then(function (appointment) {
            res.render('appointments/edit', {
                timeZones: getTimeZones(),
                appointment: appointment
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
  
    Appointment.findOne({_id: id})
      .then(function(appointment) {
        appointment.name = name;
        appointment.phoneNumber = phoneNumber;
        appointment.notification = notification;
        appointment.timeZone = timeZone;
        appointment.time = time;
  
        appointment.save()
          .then(function() {
            res.redirect('/');
          });
      });
}

const function6 = async(req, res, next) => {
    const id = req.params.id;

    Appointment.remove({_id: id})
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