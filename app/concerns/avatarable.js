import Avatar from 'avatar-builder';
import fs from 'fs';
import * as utils from '../scripts/utils';
import util from 'util';
import { Model } from 'objection';
import regeneratorRuntime from 'regenerator-runtime';

import Base from '../models/base';

const writeFile = util.promisify(fs.writeFile);


class Avatarable extends Base {
  static async generateAvatar() {
    const avatar = Avatar.identiconBuilder(128);
    const fileName = `${utils.generateUUID()}.png`;
    const path = `${utils.rootPath()}/${utils.envConfig('ASSETS_PATH')}/${fileName}`;
    const buffer = await avatar.create(new Date().toISOString());
    await writeFile(path, buffer);
    return `${utils.envConfig('ASSETS_URL')}/${fileName}`;
  }

  async $beforeInsert() {
    await super.$beforeInsert();
    this.avatarUrl = await Avatarable.generateAvatar();
  }
}

export default Avatarable;
