const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.locals.projects = []

app.use(express.static('public'))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`listening on 3000`)
})

app.post('/api/v1/projects', (req, res) => {
  const { project } = req.body
  app.locals.projects.push(project)

  res.status(201)
})

app.put('/api/v1/projects', (req, res) => {
  const { project, paletteName, palette } = req.body
  console.log('proj, pal: ', project, paletteName, palette)
  //need to edit resource
  res.status(201)
})

//app.delete 
