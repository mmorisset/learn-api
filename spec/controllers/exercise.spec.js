import supertest from 'supertest';
import faker from 'faker';

import * as exerciseFactory from '../factories/exercise';
import Level from '../../app/models/level';
import app from '../../app/index';

test("GET /exercises/:id", async (done) => {
  const exercise = await exerciseFactory.create();
  supertest(app)
    .get(`/exercises/${exercise.id}`)
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
      const body = response.body
      expect(body).toMatchObject({
        exercise: expect.objectContaining({
          id: exercise.id,
          index: exercise.index,
          word: exercise.word,
          syllablePropositions: exercise.syllablePropositions,
          levelId: exercise.levelId,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      });
      done();
    });
});
