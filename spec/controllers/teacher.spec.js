import supertest from 'supertest';
import faker from 'faker';
import jwt from 'jsonwebtoken';

import * as jwtConfig from '../../config/jwt';
import Teacher from '../../app/models/teacher';
import * as teacherFactory from '../factories/teacher';
import * as classroomFactory from '../factories/classroom';
import app from '../../app/index';

test("GET /teachers", async (done) => {
  const teachers = await teacherFactory.createList(2);
  supertest(app)
    .get("/teachers")
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
      const teachers = response.body.teachers
      const teacher = teachers[0];
      expect(teachers).toHaveLength(2);
      expect(teacher).toMatchObject({
        id: expect.any(Number),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      });
      done();
    });
});

test("POST /teachers/login", async (done) => {
  const teacher = await teacherFactory.create({password: 'kkuythr'});
  const data = {
    email: teacher.email,
    password: 'kkuythr'
  }
  supertest(app)
    .post("/teachers/login")
    .set('Accept', 'application/json')
    .send(data)
    .expect(200)
    .then(response => {
      const body = response.body
      expect(body).toMatchObject({
        teacher: expect.objectContaining({
          id: teacher.id,
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          avatarUrl: teacher.avatarUrl,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        }),
        token: expect.any(String)
      });
      done();
    });
});

test("POST /teachers/register", async (done) => {
  const data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  supertest(app)
    .post("/teachers/register")
    .set('Accept', 'application/json')
    .send(data)
    .expect(201)
    .then(async (response) => {
      const body = response.body
      expect(body).toMatchObject({
        teacher: expect.objectContaining({
          id: expect.any(Number),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          avatarUrl: expect.any(String)
        }),
      });
      done();
    });
});

test("GET /teachers/:id", async (done) => {
  const teacher = await teacherFactory.create();
  const classrooms = await classroomFactory.createList(2, { teacherId: teacher.id } );
  const token = jwt.sign(teacher.toJSON(), jwtConfig.jwtSecret);
  supertest(app)
    .get(`/teachers/${teacher.id}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ${token}`)
    .expect(200)
    .then(response => {
      const body = response.body
      expect(body).toMatchObject({
        teacher: expect.objectContaining({
          id: teacher.id,
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          avatarUrl: teacher.avatarUrl,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          classrooms: expect.any(Array)
        })
      });
      expect(body.teacher.classrooms).toHaveLength(2);
      done();
    });
});
