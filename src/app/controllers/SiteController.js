//mongoose.model('Course', CourseSchema);
const Course = require('../models/Course');

class SiteController {

    // Get /
    // index(req, res) {
    //     Course.find({})
    //         .then(courses => {
    //             res.json(courses);  // Return the course data as JSON
    //         })
    //         .catch(error => {
    //             res.status(400).json({ error: error.message });
    //         });
    // }
    
    index(req, res , next) {
        Course.find({}).lean()
            .then(courses => res.render('home' , {courses}))
            .catch(next);
    }
    
    // Get /search
    search(req, res) {
        res.render('search');  // Render the search view
    }
}

module.exports = new SiteController();
