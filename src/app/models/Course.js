const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const CourseSchema = new Schema(
  
  {
    _id: {type: Number },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
},
{
  // _id: false, để mongoose ko can thiệp vào field này
   _id: false,
   //CreateAt , UpdateAt. mongoose support sẵn 
    timestamps: true,
},
);

 //Custom query helpers
 //query.sortable: sortable là tên tự dặt chứ ko phải sortable của helpers/handlebars
 // làm thế này để nếu có phần nào muốn sort thì chỉ cần .sortable bên controller
 CourseSchema.query.sortable = function(req){ //req: request từ client
  if(req.query.hasOwnProperty('_sort')){
//kiểm tra xem req.query.type có phải là 'asc','desc' không.
// isValidType là true nếu là là 'asc','desc' còn ko là false
    const isValidType = ['asc' , 'desc'].includes(req.query.type);
     return this.sort({
      // .sort truyền vào 2 đối số thứ nhất là field , thứ 2 là giá trị
      //[req.query.column]: isValidType là 2 đối số vd column là name còn isValidType truyền vào
      // là ['asc' , 'desc'] thì là name sẽ sắp xếp theo asc or desc và trả về views
//vd: name:'desc' tức name sẽ sắp xếp theo giảm dần và tất cả đều bởi this.sort của mongoose
        [req.query.column]: isValidType ? req.query.type : 'desc',
    });
   }
   //this chính là query
   return this;
  }

//Add Plugin
mongoose.plugin(slug);
CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete , { 
  //Thêm deletedAt vào data của Course trong mongodb
  deletedAt: true,
  //override giúp ghi đè lại những phương thức mặc định của mongoose để ko lấy ra data bị xóa mềm 
  overrideMethods: 'all'
});

module.exports = mongoose.model('Course', CourseSchema);