import Exercise from '../../app/models/exercise';

const get = async (req, res) => {
  try {
    const exercise = await Exercise.query().findById(req.params.id);
    return res.status(200).json({ exercise });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export {
  get
}
