import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { getQuizzes, type Quiz } from '@/api/quiz';
import { shuffleArray } from '@/utils';

export const useQuizzes = (step: Ref<number>) => {
  const quizzes = ref<Quiz[]>([]);

  const fetch = async (): Promise<boolean> => {
    const res = await getQuizzes();
    const list = res.data;
    if (!Array.isArray(list)) return false;
    quizzes.value = shuffleArray([...list]);
    return quizzes.value.length > 0;
  };

  const quiz: ComputedRef<Quiz | undefined> = computed(() => quizzes.value[step.value]);

  const answers = computed(() => {
    if (!quiz.value) return [];
    return shuffleArray([...quiz.value.items]);
  });

  return { quizzes, quiz, answers, fetch };
};
