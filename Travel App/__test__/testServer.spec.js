const request = require('supertest')
const app = require('../src/server/app')

describe('server Endpoints', () => {
    it('post trip details', async (done) => {
        const res = await request(app)
            .post('/trip-details')
            .send({
                city: 'paris',
                date: '2020-8-1',
            })
        expect(res.statusCode).toEqual(200);
        done();
    });
    it('get trip details', async (done) => {
        const res = await request(app)
            .get('/trip-details')

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('temp');
        expect(res.body).toHaveProperty('min_temp');
        expect(res.body).toHaveProperty('high_temp');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('webformatURL');
        done();
    });

    it('post trip details without one parameter city', async (done) => {
        const res = await request(app)
            .post('/trip-details')
            .send({
                date: '2020-8-1',
            })

        expect(res.statusCode).toEqual(400);
        done();
    })
})