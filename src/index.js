const handlebars = require('express-handlebars')
const path = require('path');
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

//HTTP Logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {

  //Render home lay home dua vao body cua main , render cai khac cung the
  res.render('home');
})

app.get('/news', (req, res) => {

  //Render news lay news dua vao body cua main , render cai khac cung the
  res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
