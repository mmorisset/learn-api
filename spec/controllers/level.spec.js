import supertest from 'supertest';
import faker from 'faker';

import * as levelFactory from '../factories/level';
import Level from '../../app/models/level';
import app from '../../app/index';

test("GET /levels", async (done) => {
  const levels = await levelFactory.createList(2);
  supertest(app)
    .get("/levels")
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
      const levels = response.body.levels
      const level = levels[0];
      expect(levels).toHaveLength(2);
      expect(level).toMatchObject({
        id: expect.any(Number),
        index: expect.any(Number),
        color: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      });
      done();
    });
});
