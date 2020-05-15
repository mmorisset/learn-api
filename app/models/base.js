import { Model } from 'objection';

class Base extends Model {

  static get modelPaths() {
    return [__dirname];
  }

  async $beforeInsert() {
    await super.$beforeInsert();
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    super.$beforeUpdate();
    this.updated_at = new Date().toISOString();
  }
}

export default Base;
