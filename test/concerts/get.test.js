const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');


chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'abba', genre: 'pop', price: '50', day: 1, image: '0.img' });
    await testConcertOne.save();
  
    const testConcertTwo = new Concert({ _id: '5d9f1140f10a81216cfd4555', performer: 'Katy Perry', genre: 'rock', price: '20', day: 2, image: '1.img' });
    await testConcertTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  }); 

  it('/ should return all Concerts', async () => {

    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  
  });   

  it('/:id should return one Concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/random should return one random Concert', async () => {
    const res = await request(server).get('/api/concerts/random');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/concerts/price/day/:day should return all concerts on the :day param', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/concerts/genre/:genre should return all concerts on the :genre param', async () => {
    const res = await request(server).get('/api/concerts/genre/pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/concerts/price/20/50 should return all concerts between specific price params', async () => {
    const res = await request(server).get('/api/concerts/price/20/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/concerts/performer/abba should return all concerts on the :genre param', async () => {
    const res = await request(server).get('/api/concerts/performer/abba');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
});