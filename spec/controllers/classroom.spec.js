import supertest from 'supertest';
import faker from 'faker';

import Classroom from '../../app/models/classroom';
import Student from '../../app/models/student';
import Teacher from '../../app/models/teacher';
import * as teacherFactory from '../factories/teacher';
import * as classroomFactory from '../factories/classroom';
import * as studentFactory from '../factories/student';

import app from '../../app/index';

test("GET /classrooms/:code", async (done) => {
  const classroom = await classroomFactory.create();
  const students = await studentFactory.createList(2, { classroomId: classroom.id } );
  supertest(app)
    .get(`/classrooms/${classroom.code}`)
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
      const body = response.body
      expect(body).toMatchObject({
        classroom: expect.objectContaining({
          id: classroom.id,
          name: classroom.name,
          avatarUrl: classroom.avatarUrl,
          teacherId: classroom.teacherId,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          students: expect.any(Array)
        })
      });
      const studentsBody = body.classroom.students
      expect(studentsBody).toHaveLength(2);
      expect(studentsBody[0]).toMatchObject({
        id: students[0].id,
        firstName: students[0].firstName,
        lastName: students[0].lastName,
        avatarUrl: students[0].avatarUrl,
        classroomId: students[0].classroomId
      });
      done();
    });
});
