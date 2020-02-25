const score = (words, timer, mistakes) => {
  const goal = words * 2;
  return Math.floor(((timer - mistakes / 2) / goal) * 100);
};

const timer = words => {
  let time = words * 2;
  const interval = setInterval(() => {
    time--;
    if (time < 0) clearInterval(interval);
  }, 1000);
};
