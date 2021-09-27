'use strict';

const express = require('express');
const { function1, function2, function3, function4, function5, function6 } = require("../controllers/reminderController");

const router = new express.Router();

// GET: /appointments
router.get('/', function1);

// GET: /appointments/create
router.get('/create', function2);

// POST: /appointments
router.post('/', function3);

// GET: /appointments/:id/edit
router.get('/:id/edit', function4);

// POST: /appointments/:id/edit
router.post('/:id/edit', function5);

// POST: /appointments/:id/delete
router.post('/:id/delete', function6);

module.exports = {
    routes: router
};
