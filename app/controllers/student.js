import ExerciseGrade from '../../app/models/exercise-grade';

const exerciseGrade = async (req, res) => {
  try {
    const grade = await ExerciseGrade.query().findOne({ studentId: req.params.id, exerciseId: req.params.exerciceId });
    console.log(grade);
    return res.status(200).json({ grade: grade });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

export {
  exerciseGrade
}
