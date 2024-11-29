  
  const Handlebars = require('handlebars'); 

module.exports={ 
  // Những helpers này sẽ hỗ trợ các file hbs thay vì phải if-else trong views
    sum :(a ,b) => a+b,
    sortable:(field , sort) =>{ //{{{sortable '_id' sort}}} , sort này là res.locals.sort
      //condition ? expressionIfTrue : expressionIfFalse;
    //Nếu field === sort.column thì const sortType = sort.type (asc or desc) còn ko thì 'default'
    //Ko có dòng này thì khi nhấn sort 1 field thì các field khác cũng sort theo
    //Nhấn field nào thì nó sẽ dùng sort.type để change icon còn các field khác dùng 'default'
         const sortType = field === sort.column ? sort.type : 'default';
         const icons = {
          default:'bi bi-chevron-bar-expand',
          asc:'bi bi-caret-up-fill',
          desc:'bi bi-caret-down-fill',    
         };
         const types = {
          default:'desc',
          asc:'desc',
          desc:'asc',          
         };
         const icon = icons[sortType]; //sortType là asc hoặc desc
         const type = types[sortType];
          const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

         const output= `<a href="${href}">
         <i class="${icon}"></i></a>`;
         //Sử dụng Handlebars.SafeString để đảm bảo dữ liệu trả về không bị xss
         return new Handlebars.SafeString(output);
    }
};