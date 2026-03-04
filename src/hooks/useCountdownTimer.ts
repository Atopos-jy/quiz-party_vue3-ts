import { ref, watch, onUnmounted, type Ref } from 'vue';

/**
 * 倒计时 Hook（基于宽度递减的倒计时逻辑）
 * @param initialWidth 初始宽度（倒计时的总时长基数，1单位=100ms）
 * @param onTimeout 倒计时结束的回调函数
 * @param onChangeStep 切换步骤的回调函数
 * @returns { width, startTimer, stopTimer, resetTimer } 响应式宽度 + 操作方法
 */
export const useCountdownTimer = (initialWidth: number, onTimeout: () => void, onChangeStep: () => void) => {
  // 1. 响应式状态：倒计时宽度、定时器标识
  const width = ref<number>(initialWidth);
  const timer = ref<number | null>(null);

  // 2. 停止定时器（核心清理逻辑）
  const stopTimer = () => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
  };

  // 3. 启动/递归倒计时
  const startTimer = () => {
    // 前置校验：避免重复启动、宽度已为0时不启动
    if (timer.value || width.value <= 0) {
      return;
    }

    // 递归递减宽度
    const countdown = () => {
      if (width.value <= 0) {
        stopTimer();
        return;
      }
      width.value -= 1;
      timer.value = setTimeout(countdown, 100);
    };

    // 启动第一次倒计时
    countdown();
  };

  // 4. 重置倒计时（恢复初始宽度 + 停止定时器）
  const resetTimer = () => {
    stopTimer();
    width.value = initialWidth;
  };

  // 5. 监听宽度变化：结束时触发回调
  watch(width, (value) => {
    if (value <= 0) {
      stopTimer(); // 确保定时器停止
      onTimeout?.(); // 执行结束回调
      onChangeStep?.(); // 执行切换步骤回调
    }
  });

  // 6. 组件卸载时自动清理定时器（避免内存泄漏）
  onUnmounted(() => {
    stopTimer();
  });

  // 7. 暴露对外的状态和方法
  return {
    width, // 响应式宽度（供外部绑定/监听）
    startTimer, // 启动倒计时
    stopTimer, // 手动停止倒计时
    resetTimer, // 重置倒计时（恢复初始宽度）
  };
};
