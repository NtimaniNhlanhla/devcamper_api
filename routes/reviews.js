const express = require('express');
const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview
} = require('../controllers/reviews')

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');      

const { protect, authorize } = require('../middleware/auth')

const router = express.Router({ mergeParams: true});

router.route('/').get(advancedResults(Review,{
    path: 'bootcamp',
    select: 'name description'
}),getReviews)
.post(protect,authorize('user', 'admin'),addReview);
router.route('/:id').get(getReview)
.put(protect,authorize('user', 'admin'),updateReview)
.delete(protect,authorize('user', 'admin'),deleteReview);

// router.route('/:id').get(getCourse)
//                      .put(protect,authorize('publisher', 'admin'),updateCourse)
//                      .delete(protect,authorize('publisher', 'admin'),deleteCourse);

module.exports = router; 

