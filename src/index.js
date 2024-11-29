const handlebars = require('express-handlebars')
const path = require('path');
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override');
const app = express()
const port = 3000
const SortMidleware = require('./app/midlewares/SortMidleware')
const route = require('./routes')
const db = require('./config/db')

//Connect db
db.connect()

// Tích hợp file tĩnh : img và css
app.use(express.static(path.join(__dirname, 'public')))

// Midleware có sẵn trong express để giúp xử lí dữ liệu từ form data khi submit 
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())
//HTTP Logger
app.use(morgan('combined'))

app.use(methodOverride('_method'));

// Midleware tuj taoj
app.use(SortMidleware);

//Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers : require('./helpers/handlebars')
}));
app.set('view engine', 'hbs');
// Đi cùng const path = require('path'); ở trên
// Phải có file layouts/main đi kèm
// path.join(__dirname, 'resources/views') có thể nhận đc nhiều đối số
// có thể sửa thành path.join(__dirname, 'resources' , 'views')
app.set('views', path.join(__dirname, 'resources/views'));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
