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

// app.get('/', (req, res) => {
//   res.status(200).send('oh yahyyyyy')
// })

app.post('/api/v1/projects', (req, res) => {
  const { project } = req.body
  app.locals.projects.push(project)

  console.log('project: ', project)
  console.log('backend: ', app.locals.projects)
  res.status(201)
})


