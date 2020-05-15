import * as jwtConfig from '../../config/jwt';
import Level from '../../app/models/level';

const index = async (req, res) => {
  try {
    const levels = await Level.query();
    return res.json({ levels: levels });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export {
  index
}
