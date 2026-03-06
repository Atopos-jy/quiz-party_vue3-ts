import { http, type ApiResponse } from '@/utils/http';

export interface UserResponse {
  id?: number;
  username: string;
  avatar?: string;
  phone?: string;
  email?: string;
  status?: number;
  lastsubmitTime?: string;
  score?: number;
  rank?: number;
}

export function getUserInfo(username: string) {
  return http.get<UserResponse>('/user', { username });
}
