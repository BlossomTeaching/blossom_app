const Mistake = require("../models/Mistakes");

const findCompleted = async user => {
  await Mistake.find({ user: user._id });
};

const findScore = async (translation, user) => {
  if (translation.length) {
    console.log("TRANSLATION", translation, "USER", user);

    const scores = [];
    for (let i = 0; i < translation.length; i++) {
      console.log("LOOP", translation[i]._id, user._id);

      const [mistake] = await Mistake.find({
        $and: [{ translation: translation[i]._id }, { user: user._id }]
      });
      if (mistake) scores.push(mistake.score);
    }
    console.log("MISTAKE SCORE LOOP", scores);
    return scores;
  } else {
    console.log("TRANSLATION", translation._id, "USER", user._id);
    const [mistake] = await Mistake.find({
      $and: [{ translation: translation._id }, { user: user._id }]
    });
    console.log("MISTAKE SCORE", mistake.score);

    return mistake.score;
  }
};

const avgScore = scores => Math.floor(scores.reduce((acc, e) => acc + e) / scores.length);

const avgTotalScore = (translation, user) => {
  const avg = findScore(translation, user).then(scores => avgScore(scores));
  return avg;
};

const avgCurrentScore = (translation, user) => {
  const avg = findScore(translation, user).then(allScores => {
    console.log("ALL SCORES", allScores);

    const scores = allScores.map(scores => scores[scores.length - 1]);
    console.log("MAPPED SCORES", scores);

    return avgScore(scores);
  });
  return avg;
};

module.exports = {
  findScore,
  avgTotalScore,
  avgCurrentScore
};
