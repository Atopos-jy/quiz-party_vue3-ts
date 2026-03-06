<template>
  <Transition name="fade">
    <div v-if="statuses[step]" :class="`status status--${statuses[step]}`">
      <span class="font-black text-[80px] animate-[show_0.5s_forward]">{{ statusText }}</span>
    </div>
  </Transition>

  <DefaultLayout class="flex flex-col min-h-screen">
    <div class="timeout" :style="`width: ${width}%`"></div>

    <h1 class="font-bold text-black text-[2.75rem]">{{ quiz?.title || '题目加载中' }}</h1>

    <div class="flex flex-wrap justify-center mt-[8rem]">
      <template v-for="answer in answers" :key="answer.id">
        <div class="quiz cursor-pointer" @click="checkAnswer(answer.id)">
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
import { ref, computed, onMounted, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import { useCountdownTimer, useQuizFlow, useQuizzes, useQuizScore } from '@/hooks';

const router = useRouter();
const step = ref(0);
const statuses: Ref<string[]> = ref([]);

const { quizzes, quiz, answers, fetch } = useQuizzes(step);

const statusText = computed(() => {
  if (!statuses.value[step.value]) return '';
  
  if (statuses.value[step.value] === 'timeout') {
    return '时间到了！';
  }
  
  if (!quiz.value) return '';

  return statuses.value[step.value] === 'win' ? quiz.value.response.win : quiz.value.response.lose;
});
const onTimeout = () => {
  statuses.value[step.value] = 'timeout';
};
//下一题/结束判断逻辑
const changeStep = () => {
  setTimeout(() => {
    resetTimer();

    // Check if next step is available or not
    if (step.value + 1 > quizzes.value.length - 1) {
      localStorage.setItem('score', JSON.stringify(calculateScore()));

      return router.push('/result');
    }

    step.value += 1;

    startTimer();
  }, 3000);
};
const { width, startTimer, stopTimer, resetTimer } = useCountdownTimer(
  100, // 初始宽度
  onTimeout, // 结束回调
  changeStep, // 切换步骤回调
);

const { calculateScore } = useQuizScore(statuses, width);

const { checkAnswer, counterClasses } = useQuizFlow({
  step,
  statuses,
  quiz,
  stopTimer,
  nextStep: changeStep,
});

onMounted(async () => {
  const ok = await fetch();
  if (ok) startTimer();
});

defineExpose({
  name: 'QuizView'
})
</script>

<style src="./QuizView.scss" lang="scss" scoped />
