import { ref, watch, type Ref } from 'vue';

/**
 * 本地存储 Hook（响应式同步 localStorage）
 * @param key localStorage 键名
 * @param defaultValue 默认值
 * @returns { value } 响应式值（自动与 localStorage 同步）
 */
export const useLocalStorage = <T>(key: string, defaultValue: T): Ref<T> => {
  // 1. 从 localStorage 读取初始值
  const getStoredValue = (): T => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
    } catch (error) {
      console.error(`读取 localStorage 键 "${key}" 失败:`, error);
    }
    return defaultValue;
  };

  // 2. 响应式状态
  const value: Ref<T> = ref(getStoredValue()) as Ref<T>;

  // 3. 监听值变化，自动同步到 localStorage
  watch(
    value,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`写入 localStorage 键 "${key}" 失败:`, error);
      }
    },
    { deep: true }
  );

  // 4. 暴露响应式值
  return value;
};
