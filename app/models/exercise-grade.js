import { Model } from 'objection';

import Base from './base';

class ExerciseGrade extends Model {
  static get tableName() {
    return 'exercise_grades';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['grade'],

      properties: {
        id: { type: 'integer' },
        grade: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    return {
      exercise: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Exercise',
        join: {
          from: 'exercise_grades.exerciseId',
          to: 'exercises.id'
        }
      },
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Student',
        join: {
          from: 'exercise_grades.studentId',
          to: 'students.id'
        }
      }
    }
  }
}

export default ExerciseGrade;
