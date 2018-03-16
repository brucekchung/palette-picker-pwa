const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('Client Routes', () => {
  it('should return the homepage with text', () => {
    return chai.request(server)
      .get('/')
      .then(res => {
        res.should.have.status(200)
        res.should.be.html
      })
      .catch(err => {
        throw err
      })
  })

  it('should return a 404 if the path does not exist', () => {
    return chai.request(server)
      .get('/doesNotExist')
      .then(res => {
        res.should.have.status(404)
      })
      .catch(err => {
        throw err
      })
  })
})

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done()
        })
      })
    })
  })
  
  describe('GET /api/v1/projects', () => {
    it('should return all of the projects', () => {
      return chai.request(server)
        .get('/api/v1/projects')
        .then(res => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body.length.should.equal(3)
          res.body[0].should.have.property('name')
          res.body[0].name.should.equal('project1')
          res.body[0].should.have.property('id')
          res.body[0].id.should.equal(1)
        })
        .catch(err => {
          throw err
        })
    })
  })

  describe('POST /api/v1/projects', () => {
    it('should be able to add a project', () => {
      return chai.request(server)
        .post('/api/v1/projects')
        .send({
          id: 7,
          name: 'testProject'
        })
        .then(res => {
          res.should.have.status(201)
        })
        .catch(err => {
          throw err
        }) 
    })

    it('should return an error if data is missing', () => {
      return chai.request(server)
        .post('/api/v1/projects')
        .send({
          //name: 'test',
          unnecessaryKey: 'stuff'
        })
        .then(res => {
          res.should.have.status(422)
        })
        .catch(err => {
          throw err
        })
    })
  })

  describe('GET /api/v1/palettes', () => {
    it('should return all the palettes', () => {
      return chai.request(server)
        .get('/api/v1/palettes')
        .then(res => {
          res.should.have.status(200)
          res.body.length.should.equal(4)
          res.body.should.be.a('array')
          res.body[0].should.have.property('name')
          res.body[0].name.should.equal('warm colors')          
          res.body[0].should.have.property('colors')
          res.body[0].colors.should.be.a('array')
          res.body[0].should.have.property('project_id')
          res.body[0].project_id.should.equal(1)          
          res.body[0].should.have.property('id')
          res.body[0].id.should.equal(1)          
        })
    })
  })

  describe('POST /api/v1/palettes', () => {
    it('should be able to post a palettes', () => {
      return chai.request(server)
        .post('/api/v1/palettes')
        .send({
          name: 'test-palette',
          project_id: 1,
          id: 5,
          colors: ['#1E2D15','#997719','#92F35C','#185EA7','#E529EE']
        })
        .then(res => {
          res.should.have.status(201)
        })
        .catch(err => {
          throw err
        })
    })

    it('should return an error if data is missing', () => {
      return chai.request(server)
        .post('/api/v1/palettes')
        .send({
          //name: 'test-palette',
          project_id: 1,
          id: 5,
          colors: ['#1E2D15','#997719','#92F35C','#185EA7','#E529EE']
        })
        .then(res => {
          res.should.have.status(422)
        })
        .catch(err => {
          throw err
        })
    })
  })

  describe('DELETE /api/v1/palettes', () => {
    
  })
})