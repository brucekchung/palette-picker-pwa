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
  
})