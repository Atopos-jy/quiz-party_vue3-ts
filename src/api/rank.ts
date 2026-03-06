import { http, type ApiResponse } from '@/utils/http';

export interface ScoreSubmitResponse {
  lastsubmitTime: string;
  rank: string;
  score: string;
  username: string;
}

/** 排行榜列表项类型（与 localStorage 存储结构一致） */
export interface RankListItem {
  id: number;
  username: string;
  avatar: string;
  score: number;
  character: string;
  rank: number;
  lastsubmitTime: string;
}

/** 获取排行榜的请求参数（分页） */
export interface RankListParams {
    page?: number;  // 页码，默认1
    PageSize?: number;  // 每页条数，默认10
}

/** 获取排行榜的响应数据类型 */
export interface RankListResponse {
    list: RankListItem[];
    total: number;
    page: number;
    size: number;
}
  
export function submitScore(score: number, username: string) {
  return http.post<ApiResponse>('/user/score', { score, username });
}
export function getRankList(page: number, pageSize: number, leaderboard: RankListItem[]) {
  return http.post<ApiResponse<RankListResponse>>('/leaderboard', { page, pageSize, leaderboard });
}
