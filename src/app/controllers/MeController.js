//mongoose.model('Course', CourseSchema);
const Course = require('../models/Course');

class MeController {

       // Get /me/storeCourses
       storeCourses(req, res ,next) {
    //find({}) : {} là điều kiện
    // Vì Course.countDocumentsWithDeleted là hàm bất đồng bộ nên dùng Promise.all
    //có thể bất đồng bộ là Course.find({}) và Course.countDocumentsWithDeleted ko thể thực hiện tuần tự riêng
    //như cmt duói nên dùng promise.all để thực hiện , promise.all có thể gọi là 1 mảng chứa đối số
      //sortable(req) // req là request từ client
    Promise.all([ Course.find({}).lean().sortable(req) , Course.countDocumentsWithDeleted({deleted:true})])
      .then(([courses , deletedCount]) =>res.render('me/store-courses' , {courses , deletedCount}))
      .catch(next);

      
        // Course.countDocumentsWithDeleted()
        // .then((deletedCount) =>{
        
        // })
        // .catch(() => {})

        // Course.find({}).lean()
        // .then(courses => res.render('me/store-courses' , {courses}))
        // .catch(next);
    }

    // Get /me/trashCourses
    trashCourses(req, res ,next) {
        //findWithDeleted({deleted:true}) ,{deleted:true} là đk tức chỉ lấy ra những course có deleted = true
        Course.findWithDeleted({deleted:true}).lean()
        .then(courses => res.render('me/trash-courses' , {courses}))
        .catch(next);
    }


}

module.exports = new MeController();
