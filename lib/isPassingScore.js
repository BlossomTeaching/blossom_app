const isPassingScore = async sentenceObj => {
  const [mistake] = await Mistake.find({ $and: [{ translation: sentenceObj._id }, { user: req.user._id }] });
  let avg;
  if (mistake.score.length > 1) {
    avg = mistake.score.reduce((acc, e) => acc + e) / mistake.score.length;
    return avg < 50;
  } else if ([...mistake.score] < 50) {
    return true;
  } else {
    return false;
  }
};
