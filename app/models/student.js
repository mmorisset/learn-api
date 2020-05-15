import { Model } from 'objection';

import Avatarable from '../concerns/avatarable';

class Student extends Avatarable {
  static get tableName() {
    return 'students';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName'],

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        avatarUrl: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }

  static get relationMappings() {
    return {
      classroom: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Classroom',
        join: {
          from: 'students.classroomId',
          to: 'classrooms.id'
        }
      },
      exerciseGrades: {
        relation: Model.HasManyRelation,
        modelClass: 'ExerciseGrade',
        join: {
          from: 'students.id',
          to: 'exercise_grades.studentId'
        }
      }
    }
  }
}

export default Student;
