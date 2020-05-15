import { Model } from 'objection';

import Avatarable from '../concerns/avatarable';

class Classroom extends Avatarable {
  static get tableName() {
    return 'classrooms';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        code: { type: 'integer' },
        avatarUrl: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }

  static get relationMappings() {
    return {
      teacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Teacher',
        join: {
          from: 'classrooms.teacherId',
          to: 'teachers.id'
        }
      },
      students: {
        relation: Model.HasManyRelation,
        modelClass: 'Student',
        join: {
          from: 'classrooms.id',
          to: 'students.classroomId'
        }
      }
    }
  }

  async $beforeInsert() {
    await super.$beforeInsert();
    this.code = Math.floor(Math.random() * 899999 + 100000);
  }
}

export default Classroom;
