import { ref, type Ref } from 'vue';

/**
 * 弹窗显隐控制 Hook
 * @param initial 初始状态（默认 false）
 * @returns { isOpen, open, close, toggle } 显隐状态、打开方法、关闭方法、切换方法
 */
export const useOpen = (initial: boolean = false) => {
  // 1. 响应式状态：显隐状态
  const isOpen: Ref<boolean> = ref(initial);

  // 2. 打开弹窗
  const open = (): void => {
    isOpen.value = true;
  };

  // 3. 关闭弹窗
  const close = (): void => {
    isOpen.value = false;
  };

  // 4. 切换弹窗状态
  const toggle = (): void => {
    isOpen.value = !isOpen.value;
  };

  // 5. 暴露对外的状态和方法
  return {
    isOpen, // 显隐状态（响应式）
    open, // 打开弹窗
    close, // 关闭弹窗
    toggle, // 切换弹窗状态
  };
};
