const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const coursesRouter = require('./courses');

function route(app){
        //Cach cu
        // app.get('/news', (req, res) => {
        //   res.render('news');
        // })
        //Cach moi
    
        //Path ddi tu tren xuong : news xong den /
        app.use('/news', newsRouter)


        app.use('/courses', coursesRouter)

        app.use('/me', meRouter)
        
    //       // app.get('/', (req, res) => {
    // //       res.render('home');
    // //     })
    //     app.get('/search', (req, res) => {
    //       res.render('search');
    //     })

       app.use('/', siteRouter)
               
}

module.exports= route;