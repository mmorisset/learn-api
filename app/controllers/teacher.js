import passport from 'passport';
import jwt from 'jsonwebtoken';

import * as jwtConfig from '../../config/jwt';
import Teacher from '../../app/models/teacher';

const get = async (req, res, next) => {
  passport.authenticate('jwt', {session: false}, async (err, teacher, info) => {
    try {
      const teacher = await Teacher.query().findById(req.params.id).withGraphFetched('classrooms');
      return res.status(200).json({ teacher: teacher });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  })(req, res, next);
}

const index = async (req, res) => {
  try {
    const teachers = await Teacher.query().withGraphFetched('classrooms');
    return res.json({ teachers: teachers });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

const login = function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, teacher, info) => {
    if (err || !teacher) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        teacher: teacher
      });
    }

    req.login(teacher, {session: false}, async (err) => {
      if (err) {
          console.log(err);
          res.send(err);
      }

      const token = jwt.sign(teacher.toJSON(), jwtConfig.jwtSecret);
      return res.json({ teacher: teacher, token: token });
    });
  })(req, res, next);
}

const register = async (req, res) => {
  try {
    let teacher = await Teacher.query().insert(req.body);
    return res.status(201).json({
      teacher,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export {
  get,
  index,
  login,
  register
}
