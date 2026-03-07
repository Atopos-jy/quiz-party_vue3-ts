import type { RankListItem } from '@/api/rank';

/**
 * 排行榜数据去重与合并工具函数
 * 
 * 去重规则：
 * 1. 以 username 为唯一标识
 * 2. 若存在相同 username，保留 score 更高的记录
 * 3. 若 score 相同，保留 lastsubmitTime 更新的记录
 * 
 * @param list - 原始排行榜数据数组
 * @returns 去重后的排行榜数据数组
 * 
 * @example
 * const uniqueList = filterLeaderboard([
 *   { id: 1, username: 'user1', score: 100, ... },
 *   { id: 2, username: 'user1', score: 150, ... }, // 重复，保留此项
 * ]);
 */
export function filterLeaderboard(list: RankListItem[]): RankListItem[] {
  // 使用 Map 存储去重后的数据，key 为 username
  const userMap = new Map<string, RankListItem>();

  list.forEach((item) => {
    const existing = userMap.get(item.username);

    if (!existing) {
      // 首次出现，直接存入
      userMap.set(item.username, item);
    } else {
      // 已存在相同 username，比较 score
      if (item.score > existing.score) {
        // 新记录分数更高，替换
        userMap.set(item.username, item);
      } else if (item.score === existing.score) {
        // 分数相同，比较时间，保留更新的
        if (item.lastsubmitTime > existing.lastsubmitTime) {
          userMap.set(item.username, item);
        }
      }
      // 否则保留原有记录（不操作）
    }
  });

  // 转换回数组，按 score 降序排序，并添加 rank 字段
  return Array.from(userMap.values())
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}

/**
 * 合并两个排行榜数据并去重
 * 
 * @param localList - 本地存储的排行榜数据
 * @param serverList - 服务器返回的排行榜数据
 * @returns 合并去重后的排行榜数据
 */
export function mergeLeaderboard(
  localList: RankListItem[],
  serverList: RankListItem[]
): RankListItem[] {
  // 合并两个数组
  const combined = [...localList, ...serverList];
  
  // 去重并返回
  return filterLeaderboard(combined);
}
