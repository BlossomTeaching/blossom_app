const Mistake = require("../models/Mistakes");

const findCompleted = async (exercise, user) => {
  const mistakes = [];
  for (let i = 0; i < exercise.length; i++) {
    console.log("LOOP", exercise[i]._id, user._id);

    const [mistake] = await Mistake.find({
      $and: [{ translation: exercise[i]._id }, { user: user._id }]
    });
    if (mistake) mistakes.push(mistake);
  }
  console.log("MISTAKE SCORE LOOP", mistakes);
  return mistakes;
};

const findScores = async (exercise, user) => {
  const mistakes = await findCompleted(exercise, user);
  console.log("MISTAKE IN FINDESCORE", mistakes);
  const score = mistakes.map(mistake => mistake.score);
  console.log("SCORE IN FINDESCORE", score);
  return score;
};

const avgScore = scores => Math.floor(scores.reduce((acc, e) => acc + e) / scores.length);

const avgTotalScore = (exercise, user) => avgScore(findScores(exercise, user));

const avgCurrentScore = async (exercise, user) => {
  const scores = findScores(exercise, user).then(scores => {
    console.log("MAP IN CURRENT", scores);
    return scores.map(scores => scores[scores.length - 1]);
  });
  return scores;
};

module.exports = {
  findScores,
  findCompleted,
  avgTotalScore,
  avgCurrentScore
};
