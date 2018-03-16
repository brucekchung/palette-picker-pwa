const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

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
    
  })

  describe('GET /api/v1/palettes', () => {
    
  })

  describe('POST /api/v1/palettes', () => {
    
  })

  describe('DELETE /api/v1/palettes', () => {
    
  })
})