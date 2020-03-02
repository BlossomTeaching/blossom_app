const shuffle = require("./shuffler");

const prepareString = sentence => {
  // Create an array of the sentence, removing special characters
  const regex = /[^a-zA-Z1-9'/]/g;
  const wordBlocks = sentence.split(" ").map(word => word.replace(regex, ""));

  // Copy sentence array and shuffle
  const buttons = [...wordBlocks];
  const answer = [...buttons];

  while (wordBlocks.join("") === buttons.join("")) shuffle(buttons);
  return { buttons, answer };
};

module.exports = prepareString;
