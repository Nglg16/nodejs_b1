const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

//[Get] courses/:slug
router.get('/stored/courses', meController.storeCourses)
router.get('/trash/courses', meController.trashCourses)

module.exports = router;