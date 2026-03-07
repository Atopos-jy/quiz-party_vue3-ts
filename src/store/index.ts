import { createPinia } from 'pinia';

/**
 * Pinia Store 入口
 * 
 * 使用方式：
 * import { useCommonStore, useLeaderboardStore } from '@/store/modules/quiz';
 * 
 * const commonStore = useCommonStore();
 * const leaderboardStore = useLeaderboardStore();
 */

export const pinia = createPinia();

export default pinia;
