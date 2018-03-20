const express = require('express') //import from node modules
const app = express() //instantiate instance of express
const bodyParser = require('body-parser') //to break out req body
const environment = process.env.NODE_ENV || 'development' //sets environment to specified, defaults to dev
const configuration = require('./knexfile')[environment] //grabs correct setup from knexfile
const database = require('knex')(configuration) //curry to grab correct database 

const requireHTTPS = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
    next();
};


app.locals.projects = [] //stage1 storage

app.use(express.static('public')) //middleware - get request for '/' runs through public folder
app.use(bodyParser.json()) //middleware - runs req to break out body into readable format
if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }
// set up a route to redirect http to https
// app.get('/', (req, res, next) => {  
//     res.redirect('https://' + req.headers.host + req.url);
//     next()
//     // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//     // res.redirect('https://palette-picker-bruce.herokuapp.com/' + req.url);
// })


app.set('port', process.env.PORT || 3000) //sets port to specified, defaults 3000

app.listen(app.get('port'), () => { //listening for port set in above
  console.log(`listening on 3000`) //displays in terminal
})

app.get('/api/v1/projects', (req, res) => { //get projects table
  database('projects').select() //selects all from projects table
    .then(project => { 
      res.status(200).json(project) //send response and projects
    })
    .catch(error => {
      res.status(500).json({error}) //sad path
    })
})

app.post('/api/v1/projects', (request, response) => { //post endpoint for projects
  const project = request.body

  if (!project.name) { //if missing crucial parameter, execute error below:
    return response
      .status(422)
      .send({ error: `Missing project` })
  }

  database('projects').insert(project, 'id') //inserts project into table
    .then(project => {
      response.status(201).json({ id: project[0] }) //returns good response with id
    })
    .catch(error => {
      response.status(500).json({ error }) //sad path
    })
})

app.get('/api/v1/palettes', (req, res) => { //get for palettes
  database('palettes').select() //grabs all from palettes table
    .then(palette => {
      res.status(200).json(palette) //happy
    })
    .catch(err => {
      res.status(500).json({ err }) //sad
    })
})

app.post('/api/v1/palettes', (req, res) => { //post endpt for palettes, second arg is callback
  const palette = req.body

  if (!palette.name) { //checks for crucial arg
    return res
      .status(422) //error path
      .send({ error: 'Missing name' })
  }

  database('palettes').insert(palette, 'id') //posts in palettes table
    .then(palette => {
      res.status(201).json({ id: palette[0] }) //happy
    })
    .catch(error => {
      res.status(500).json({ error }) //sad
    })
})

app.delete('/api/v1/palettes', (req, res) => { //delete endpt for palettes
  const item = req.body

  database('palettes').where('id', item.id).del() //match sendt id with foreign key
    .then(palette => {
      res.status(202) //happy
    })
    .catch(error => {
      res.status(500).json({ error }) //sad
    })
})

module.exports = app //export for routes.spec.js
