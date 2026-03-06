<template>
  <Transition name="fade">
    <!-- status: 固定定位全屏遮罩，动态状态类控制颜色 -->
    <div 
      v-if="statuses[step]" 
      class="fixed inset-0 z-10 flex items-center justify-center text-center"
      :class="{
        'text-[var(--green)] bg-[rgba(79,119,45,0.2)]': statuses[step] === 'win',
        'text-[var(--red)] bg-[rgba(229,56,59,0.2)]': statuses[step] === 'lose',
        'text-[var(--gray-400)] bg-[rgba(211,211,211,0.2)]': statuses[step] === 'timeout'
      }"
      style="backdrop-filter: blur(0.5rem);"
    >
      <!-- status__text: 大标题文字，带动画 -->
      <span class="font-black text-[5rem] max-xs:text-[3rem] animate-[show_0.5s_forwards]">{{ statusText }}</span>
    </div>
  </Transition>

  <!-- quiz-view: flex布局，最小高度100vh，纵向排列 -->
  <DefaultLayout class="flex flex-col min-h-screen">
    <!-- timeout: 固定定位顶部倒计时条 -->
    <div 
      class="fixed top-0 right-0 h-1 bg-[var(--primary)]" 
      :style="`width: ${width}%`"
    ></div>

    <!-- quiz-view__title: 标题样式，响应式字体大小 -->
    <h1 class="font-bold text-[var(--black)] text-[2.75rem] max-2xl:text-[1.75rem] max-xs:text-xl">
      {{ quiz?.title || '题目加载中' }}
    </h1>

    <!-- quizzes + quiz-view__quizzes: flex换行居中，顶部间距响应式 -->
    <div class="flex flex-wrap justify-center mt-32 max-2xl:mt-20 max-xs:mt-12">
      <template v-for="(answer, index) in answers" :key="answer.id">
        <!-- 
          quiz: 答题选项卡片
          复杂样式保留在<style>中：::before伪元素、counter-increment、nth-child(even)
        -->
        <div 
          class="quiz relative flex items-center text-[var(--black)] text-xl cursor-pointer transition-all duration-300 ease-out px-6 py-10 border-2 border-[#e5383b16] bg-[var(--white)] hover:border-[#e5383b48]"
          :class="{
            'mt-10 ml-12 max-xs:ml-0': index % 2 === 1,
            'max-xs:mt-10': index > 0
          }"
          @click="checkAnswer(answer.id)"
        >
          <span class="text-xl">{{ answer.title }}</span>
        </div>
      </template>
    </div>

    <!-- quiz-counters: 底部计数器，flex居中，mt-auto -->
    <div class="flex justify-center mt-auto max-xs:mt-12">
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

<style lang="postcss" scoped>
/* 
  保留复杂样式：
  1. quiz卡片的::before伪元素（序号圆圈）
  2. 响应式尺寸（flex-basis、height）
  3. 关键帧动画
  4. fade过渡效果
*/

/* quiz卡片基础尺寸和伪元素 */
.quiz {
  flex-basis: 37.5rem;
  height: 8.5rem;
  border-radius: 0.25rem;
  counter-increment: quiz;
}

/* 序号圆圈伪元素 */
.quiz::before {
  @apply absolute flex items-center justify-center font-bold bg-[var(--white)] border-[3px] border-[var(--primary)] text-[var(--black)];
  content: counter(quiz);
  top: -1.5rem;
  left: -1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1.75rem;
}

/* 1440px以下响应式 */
@media screen and (max-width: 1440px) {
  .quiz {
    flex-basis: 30.6875rem;
  }
}

/* 425px以下响应式 */
@media screen and (max-width: 425px) {
  .quiz {
    flex-basis: 100%;
  }
  
  .quiz::before {
    top: -1.5rem;
    left: -1.5rem;
  }
}

/* quiz-counters计数器样式 - 由useQuizFlow动态生成类名 */
:deep(.quiz-counters__couter) {
  @apply h-6 border-2 border-[var(--primary)];
}

:deep(.quiz-counters__couter--normal) {
  @apply w-6 rounded-xl;
}

:deep(.quiz-counters__couter--current) {
  @apply w-12 rounded-3xl bg-[#e5383b16];
}

:deep(.quiz-counters__couter--timeout) {
  @apply w-6 rounded-xl bg-[var(--gray-200)];
}

:deep(.quiz-counters__couter--lose) {
  @apply w-6 rounded-xl bg-[var(--red)];
}

:deep(.quiz-counters__couter--win) {
  @apply w-6 rounded-xl bg-[var(--green)];
}

:deep(.quiz-counters__couter:not(:first-child)) {
  @apply mr-4;
}

/* Fade过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-to span {
  animation: leave 0.5s forwards;
}

/* 关键帧动画 */
@keyframes show {
  from {
    opacity: 0;
    margin-top: -10rem;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
}

@keyframes leave {
  from {
    opacity: 1;
    margin-top: 0;
  }
  to {
    opacity: 0;
    margin-top: -10rem;
  }
}
</style>
