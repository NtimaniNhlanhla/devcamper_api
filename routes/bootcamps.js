const express = require('express');
const { getBootcamps, 
    getBootcamp, 
    createBootcamp, 
    updateBootcamp, 
    deleteBootcamp, 
    getBootcampsInRadius,
    bootcampPhotoUpload} = require('../controllers/bootcamps');

const courseRouter = require('./courses'); 
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');  

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(bootcampPhotoUpload)

router.route('/')
       .get(advancedResults(Bootcamp, 'courses'),getBootcamps)
       .post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

module.exports = router; 