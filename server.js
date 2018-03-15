const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.locals.projects = []

app.use(express.static('public'))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`listening on 3000`)
})

app.get('/api/v1/projects', (req, res) => {
  database('projects').select()
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).json({error}) 
    })
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body

  if (!project) {
    return response
      .status(422)
      .send({ error: `Missing project` })
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/palettes', (req, res) => {
  const { project, paletteName, palette } = req.body
  console.log('proj, pal: ', project, paletteName, palette)
  //need to edit resource
  database.('palettes').insert()

  res.status(201)
})

//app.delete 
