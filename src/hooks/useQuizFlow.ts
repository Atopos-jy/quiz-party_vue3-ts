import type { Ref, ComputedRef } from 'vue';
import type { Quiz } from '@/api/quiz';

export const useQuizFlow = (options: {
  step: Ref<number>;
  statuses: Ref<string[]>;
  quiz: ComputedRef<Quiz | undefined>;
  stopTimer: () => void;
  nextStep: () => void;
}) => {
  const { step, statuses, quiz, stopTimer, nextStep } = options;

  const onWin = () => {
    statuses.value[step.value] = 'win';
  };

  const onLose = () => {
    statuses.value[step.value] = 'lose';
  };

  const onTimeout = () => {
    statuses.value[step.value] = 'timeout';
  };

  const checkAnswer = (answerId: number) => {
    stopTimer();
    if (!quiz.value) return;
    quiz.value.currectAnswer === answerId ? onWin() : onLose();
    nextStep();
  };

  const counterClasses = (counter: number) => {
    if (statuses.value[counter]) {
      return `quiz-counters__couter quiz-counters__couter--${statuses.value[counter]}`;
    }
    return `quiz-counters__couter quiz-counters__couter--${counter === step.value ? 'current' : 'normal'}`;
  };

  return { step, statuses, onTimeout, checkAnswer, nextStep, counterClasses };
};
