import Classroom from '../../app/models/classroom';

const getByCode = async (req, res) => {
  try {
    const classroom = await Classroom.query().findOne({ code: req.params.code }).withGraphFetched('students');;
    return res.status(200).json({ classroom });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export {
  getByCode
}
