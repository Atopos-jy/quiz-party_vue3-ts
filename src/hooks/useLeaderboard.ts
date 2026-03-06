import { ref, type Ref } from 'vue';

// 从 rank.ts 导入统一的类型
import type { RankListItem } from '@/api/rank';
import dayjs from 'dayjs';
export type LeaderboardItem = RankListItem;

/** localStorage 存储键名 */
const LEADERBOARD_KEY = 'leaderboard';

/**
 * 排行榜存储 Hook（响应式同步 localStorage）
 * @returns { list, add, load, save, clear } 排行榜列表、添加项、加载数据、保存数据、清空数据
 */
export const useLeaderboard = () => {
  // 1. 响应式状态：排行榜列表
  const list: Ref<RankListItem[]> = ref([]);

  // 2. 从 localStorage 加载数据（兼容旧格式数据转换）
  const load = (): void => {
    try {
      const storedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);
      if (storedLeaderboard) {
        const parsed = JSON.parse(storedLeaderboard);

        list.value = parsed.map((item: any, index: number) => ({
          id: item.id,
          username: item.username,
          avatar: item.avatar,
          score: Number(item.score) || 0,
          character: item.character || '',
          rank: item.rank || index + 1,
          lastsubmitTime: item.lastsubmitTime || dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })) as RankListItem[];
      }
    } catch (error) {
      console.error('加载排行榜数据失败:', error);
      list.value = [];
    }
  };

  // 3. 保存数据到 localStorage
  const save = (): void => {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(list.value));
    } catch (error) {
      console.error('保存排行榜数据失败:', error);
    }
  };

  // 4. 添加新项到排行榜（自动保存）
  const add = (item: LeaderboardItem): void => {
    list.value.push(item);
    save();
  };

  // 5. 清空排行榜数据
  const clear = (): void => {
    list.value = [];
    localStorage.removeItem(LEADERBOARD_KEY);
  };

  // 6. 初始化时加载数据
  load();

  // 7. 暴露对外的状态和方法
  return {
    list, // 排行榜列表（响应式）
    add, // 添加新项到排行榜
    load, // 从 localStorage 加载数据
    save, // 保存数据到 localStorage
    clear, // 清空排行榜数据
  };
};

