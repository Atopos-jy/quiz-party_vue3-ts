import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { getCharacters, type Character } from '@/api/character';

/**
 * 角色数据获取与选取 Hook
 * @param score 分数（响应式引用，用于计算匹配的角色）
 * @returns { characters, character, fetch } 角色列表、根据分数计算的角色、获取数据方法
 */
export const useCharacters = (score: Ref<number>) => {
  // 1. 响应式状态：角色列表
  const characters = ref<Character[]>([]);

  // 2. 计算属性：根据分数匹配对应的角色
  const character: ComputedRef<Character | undefined> = computed(() => {
    return characters.value.find((c) => score.value >= c.minimumScore);
  });

  // 3. 获取角色数据
  const fetch = async (): Promise<boolean> => {
    try {
      const res = await getCharacters();
      const charactersList = res.data;

      if (!Array.isArray(charactersList)) return false;

      characters.value = charactersList;
      return characters.value.length > 0;
    } catch (error) {
      console.error('获取角色数据失败:', error);
      return false;
    }
  };

  // 4. 暴露对外的状态和方法
  return {
    characters, // 角色列表（响应式）
    character, // 根据分数计算的角色（计算属性）
    fetch, // 获取角色数据方法
  };
};
