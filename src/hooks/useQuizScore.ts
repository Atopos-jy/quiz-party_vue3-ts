import type { Ref } from 'vue';

export const useQuizScore = (statuses: Ref<string[]>, width: Ref<number>) => {
  const calculateScore = () => {
    let score = 0;
    for (const status of statuses.value) {
      if (status === 'win') score += 100;
    }
    const timeLeft = width.value / 10;
    const finalScore = Math.floor(score * timeLeft);
    return finalScore;
  };

  return { calculateScore };
};
