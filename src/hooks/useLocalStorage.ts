import { ref, watch, type Ref } from 'vue';

/**
 * 本地存储 Hook（响应式同步 localStorage）
 * @param key localStorage 键名
 * @param defaultValue 默认值
 * @returns { value } 响应式值（自动与 localStorage 同步）
 */
export const useLocalStorage = <T>(key: string, defaultValue: T): Ref<T> => {
  // 从 localStorage 读取初始值（兼容纯字符串存储的遗留数据）
  const getStoredValue = (): T => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return defaultValue;
    }
    // 尝试解析为 JSON，失败则直接使用原值（兼容纯字符串存储的遗留数据）
    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return storedValue as unknown as T;
    }
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
