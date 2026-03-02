<template>
  <Transition name="fade">
    <div v-if="statuses[step]" :class="`status status--${statuses[step]}`">
      <span class="status__text">{{ statusText }}</span>
    </div>
  </Transition>

  <DefaultLayout class="quiz-view">
    <div class="timeout" :style="`width: ${width}%`"></div>

    <h1 class="quiz-view__title">{{ quiz?.title || '题目加载中' }}</h1>

    <div class="quizzes quiz-view__quizzes">
      <template v-for="answer in answers" :key="answer.id">
        <div class="quiz" @click="checkAnswer(answer.id)">
          <span class="quiz__title">{{ answer.title }}</span>
        </div>
      </template>
    </div>

    <div class="quiz-counters">
      <template v-for="counter in quizzes.length" :key="counter">
        <span :class="counterClasses(counter - 1)" />
      </template>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';

import { getQuizzes } from '@/api/quiz';
import type { QuizItem, Quiz } from '@/api/quiz';
// utils
import { shuffleArray } from '@/utils/index';

const step = ref(0);
const width = ref(100);
const timer: Ref<number | null> = ref(null);
const statuses: Ref<string[]> = ref([]);

const router = useRouter();
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

const statusText = computed(() => {
  if (!statuses.value[step.value]) return '';
  
  if (statuses.value[step.value] === 'timeout') {
    return '时间到了！';
  }
  
  if (!quiz.value) return '';

  return statuses.value[step.value] === 'win' ? quiz.value.response.win : quiz.value.response.lose;
});

//倒计时
const stopTimer = () => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
};

//启动/递归倒计时
const startTimer = () => {
  if (width.value <= 0) {
    return stopTimer();
  }

  width.value -= 1;
  timer.value = window.setTimeout(startTimer, 100);
};

//计分逻辑
const calculateScore = () => {
  let score = 0;

  for (const status of statuses.value) {
    if (status === 'win') score += 100;
  }

  const timeLeft = width.value / 10;
  const finalScore = Math.floor(score * timeLeft);

  return finalScore;
};

//下一题/结束判断逻辑
const changeStep = () => {
  setTimeout(() => {
    width.value = 100;

    // Check if next step is available or not
    if (step.value + 1 > quizzes.value.length - 1) {
      localStorage.setItem('score', JSON.stringify(calculateScore()));

      return router.push('/result');
    }

    step.value += 1;

    startTimer();
  }, 3000);
};

//答题判断逻辑
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

  changeStep();
};

const counterClasses = (counter: number) => {
  if (statuses.value[counter]) {
    return `quiz-counters__couter quiz-counters__couter--${statuses.value[counter]}`;
  }

  return `quiz-counters__couter quiz-counters__couter--${counter === step.value ? 'current' : 'normal'}`;
};

watch(width, (value) => {
  if (value <= 0) {
    stopTimer(); // Ensure timer is stopped when timeout occurs
    onTimeout();
    changeStep();
  }
});

onMounted(async () => {
  const ok = await fetchData();
  if (ok) startTimer();
});

defineExpose({
  name: 'QuizView'
})
</script>

<style src="./QuizView.scss" lang="scss" scoped />
