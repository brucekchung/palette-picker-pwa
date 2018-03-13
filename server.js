const express = require('express')
const app = express()

app.locals.projects = []

app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`listening on 3000`)
})

// app.get('/', (req, res) => {
//   res.status(200).send('oh yahyyyyy')
// })

app.post('/api/vi/', (req, res) => {
  const { project } = req.body

  app.locals.projects.push(project)
  res.status(201).json(project)
})

