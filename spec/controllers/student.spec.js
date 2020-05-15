import supertest from 'supertest';
import faker from 'faker';

import ExerciseGrade from '../../app/models/exercise-grade';
import * as studentFactory from '../factories/student';
import * as exerciseFactory from '../factories/exercise';
import * as exerciseGradeFactory from '../factories/exercise-grade';
import app from '../../app/index';

test("GET /students/:id/exercises/:exerciseId/grade", async (done) => {
  const exerciseGrade = await exerciseGradeFactory.create();
  supertest(app)
    .get(`/students/${exerciseGrade.studentId}/exercises/${exerciseGrade.exerciseId}/grade`)
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
      const body = response.body
      expect(body).toMatchObject({
        grade: expect.objectContaining({
          id: exerciseGrade.id,
          grade: exerciseGrade.grade,
          studentId: exerciseGrade.studentId,
          exerciseId: exerciseGrade.exerciseId,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      });
      done();
    });
});
