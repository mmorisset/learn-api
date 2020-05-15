import { Model } from 'objection';
const Password = require('objection-password')();
import Avatarable from '../concerns/avatarable';

class Teacher extends Password(Avatarable) {
  static get tableName() {
    return 'teachers';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        avatarUrl: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }

  $formatJson(json) {
    // Remember to call the super class's implementation.
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static get relationMappings() {
    return {
      classrooms: {
        relation: Model.HasManyRelation,
        modelClass: 'Classroom',
        join: {
          from: 'teachers.id',
          to: 'classrooms.teacherId'
        }
      }
    }
  }
}

export default Teacher;
