export const calculateScore = (remainingTime, level) => {
  const timeScore = (remainingTime / 60) * 5;
  const difficultyScore = (level || 1) * 0.5;
  const totalScore = parseFloat((timeScore + difficultyScore).toFixed(2));
  const currScore = Math.ceil(totalScore * 10);
  return currScore;
};
