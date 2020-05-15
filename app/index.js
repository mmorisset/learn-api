import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import teacherRoutes from './routes/teacher';
import classroomRoutes from './routes/classroom';
import levelRoutes from './routes/level';
import exerciseRoutes from './routes/exercise';
import studentRoutes from './routes/student';

import knex from '../db/index';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(express.static('public'));

app.use('/teachers', teacherRoutes);
app.use('/classrooms', classroomRoutes);
app.use('/levels', levelRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/students', studentRoutes);

export default app;





