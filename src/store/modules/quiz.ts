import { defineStore } from 'pinia';
import type { RankListItem } from '@/api/rank';
import { getRankList } from '@/api/rank';
import { filterLeaderboard } from '@/utils/filterLeaderboard';
import dayjs from 'dayjs';

/**
 * 通用存储 Store（替代 useLocalStorage）
 */
export const useCommonStore = defineStore('common', {
  state: () => ({
    username: '',
    theme: 'light' as 'light' | 'dark',
    score: 0,
  }),

  actions: {
    setUsername(name: string) {
      this.username = name;
    },

    setTheme(theme: 'light' | 'dark') {
      this.theme = theme;
    },

    setScore(score: number) {
      this.score = score;
    },

    reset() {
      this.username = '';
      this.theme = 'light';
      this.score = 0;
    },
  },
});

/**
 * 排行榜 Store（替代 useLeaderboard）
 */
export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    list: [] as RankListItem[],
    loading: false,
  }),

  getters: {
    total(): number {
      return this.list.length;
    },

    sortedList(): RankListItem[] {
      return [...this.list].sort((a, b) => b.score - a.score);
    },
  },

  actions: {
    /**
     * 从本地存储加载数据（兼容旧格式）
     */
    load() {
      this.loading = true;
      try {
        const stored = localStorage.getItem('leaderboard') || localStorage.getItem('quiz_leaderboard');
        if (stored) {
          const parsed = JSON.parse(stored);
          const rawList = parsed.list || parsed;
          
          this.list = rawList.map((item: any, index: number): RankListItem => ({
            id: item.id || index + 1,
            username: item.username || item.name || '',
            avatar: item.avatar || item.image || '',
            score: Number(item.score) || 0,
            character: item.character || '',
            rank: item.rank || index + 1,
            lastsubmitTime: item.lastsubmitTime || dayjs().format('YYYY-MM-DD HH:mm:ss'),
          }));

          // 去重
          this.list = filterLeaderboard(this.list);
        }
      } catch (error) {
        console.error('加载排行榜失败:', error);
        this.list = [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * 从 API 获取排行榜数据（带分页和去重）
     */
    async fetchFromAPI(page = 1, pageSize = 10) {
      this.loading = true;
      try {
        // 先加载本地数据
        this.load();
        
        // 调用 API 获取数据
        const res = await getRankList(page, pageSize, this.list);
        
        if (res.data && res.data.list && Array.isArray(res.data.list)) {
          // 合并 API 数据和本地数据，然后去重
          const combined = [...this.list, ...res.data.list];
          this.list = filterLeaderboard(combined);
          this.sortAndRank();
        }
        
        return { list: this.list, total: this.list.length };
      } catch (error) {
        console.error('获取排行榜失败:', error);
        return { list: this.list, total: this.list.length };
      } finally {
        this.loading = false;
      }
    },

    /**
     * 添加记录（自动去重）
     */
    add(item: RankListItem) {
      this.list.push(item);
      this.list = filterLeaderboard(this.list);
      this.sortAndRank();
    },

    /**
     * 批量添加
     */
    addBatch(items: RankListItem[]) {
      this.list.push(...items);
      this.list = filterLeaderboard(this.list);
      this.sortAndRank();
    },

    /**
     * 排序并更新排名
     */
    sortAndRank() {
      this.list.sort((a, b) => b.score - a.score);
      this.list.forEach((item, index) => {
        item.rank = index + 1;
      });
    },

    /**
     * 清空
     */
    clear() {
      this.list = [];
      localStorage.removeItem('leaderboard');
      localStorage.removeItem('quiz_leaderboard');
    },

    /**
     * 删除指定用户
     */
    removeByUsername(username: string) {
      this.list = this.list.filter(item => item.username !== username);
      this.sortAndRank();
    },
  },
});
