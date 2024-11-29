module.exports = function SortMiddleware(req, res, next) {
    //.sort là tên biến tự tạo
    res.locals.sort = {
        // true nếu có query parameter _sort, false nếu không
        ////http://localhost:3000/me/stored/courses?--_sort--&column=name&type=desc
        enabled: false,
        type: 'default',
    };

    //hasOwnProperty giúp kiểm tra '_sort' query parameter tồn tại trên query truy vấn (url) ko
    //http://localhost:3000/me/stored/courses?_sort&column=name&type=desc
    if (req.query.hasOwnProperty('_sort')) {
        // res.locals.sort.enabled = true;
        // res.locals.sort.type = req.query.type;
        // res.locals.sort.column = req.query.column;

         
        //Object.assign : hợp nhất các object theo thứ tự phải sang trái
        //res.locals.sort , {} : 1 và 2 -> hợp nhất 2 sang 1
        Object.assign(res.locals.sort , {
            //Nếu _sort query parameter tồn tại trên url, thì gán giá trị cho các biến tự tạo
             //http://localhost:3000/me/stored/courses?_sort&column=name&type=desc
            enabled : true,
            type : req.query.type, //type=desc
            column : req.query.column, //column=name
        });
    }

    next();
};
