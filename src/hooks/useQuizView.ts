import { ref, computed } from 'vue';
import type { Quiz, QuizItem } from '@/api/quiz';

import { getQuizzes } from '@/api/quiz';
import shuffleArray from '@/utils/shuffleArray';

const step = ref<number>(0);

const quizzes = ref<Quiz[]>([]);
const fetchData = async (): Promise<boolean> => {
  const res = await getQuizzes();
  const quizzesList = res.data;
  if (!Array.isArray(quizzesList)) return false;

  quizzes.value = shuffleArray([...quizzesList]);
  return quizzes.value.length > 0;
};

const quiz = computed<Quiz | undefined>(() => {
  return quizzes.value[step.value];
});

const answers = computed<QuizItem[]>(() => {
  if (!quiz.value) return [];
  return shuffleArray([...quiz.value.items]);
});
