//mongoose.model('Course', CourseSchema);
const Course = require('../models/Course');

class CourseController {

    //[Get] courses/:slug
    // {slug: req.params.slug} // đối số thứ nhất là key phải trùng với tên đã 
    // cấu hình router.get('/:slug', . Đối số thứ 2 là value req.params.slug
    show(req, res , next) {
        Course.findOne({slug: req.params.slug}).lean()
        .then(course =>{
             res.render('courses/show' , {course})
        })
        .catch(next);
    }

    //[Get] courses/create
    create(req, res , next) {
        res.render('courses/create')
    }

     //[Post] courses/store
     store(req, res , next) {
      req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
        .save()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);       
      };   
    

      //[Get] courses/:id/edit
      edit(req, res , next) {
        Course.findById(req.params.id).lean()
        .then(course =>{
             res.render('courses/edit' , {course})
        })
        .catch(next);
    }

      //[Put] courses/:id
      update(req, res , next) {
        // Đối số thứ nhất là condition : id phải match với id truyền vào , thứ 2 là object muốn sửa
        Course.updateOne({ _id: req.params.id} , req.body).lean()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }

    
      //[Delete] courses/:id
      destroy(req, res , next) {
        // Course.delete : xóa mềm ,  Course.deleteOne: xóa thật
     Course.delete({ _id: req.params.id}).lean()
     .then(() => res.redirect('back'))
     .catch(next);
    }

       //[Delete] courses/:id/force
       forceDestroy(req, res , next) {
        Course.deleteOne({ _id: req.params.id}).lean()
        .then(() => res.redirect('back'))
        .catch(next);
       }

      //[Patch] courses/:id/restore
      restore(req, res , next) {
        Course.restore({ _id: req.params.id }).lean()
        .then(() => res.redirect('back'))
        .catch(next);
       }
     //[Post] courses/handle-form-action
       handleFormActions(req, res , next) {
        //req.body.action la gia tri nhan duoc tu form action ở store-courses.hbs
        //<select class="form-control ..." --name="action"-- required>
        // <option --value="delete"-->Xóa</option>
        //$in : cho phép chọn nhiều course
       switch(req.body.action){
        case 'delete':
          //Vi coursesIds la mang nen dung $in co nghia la xoa tat ca nhung gi trong mang
          Course.delete({ _id: {$in: req.body.coursesIds}}).lean()
          .then(() => res.redirect('back'))
          .catch(next);
        break;
        default:
          res.json({message: "Action is Invalid!"});
       }
       }
}

module.exports = new CourseController();
