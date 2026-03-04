import { http, type ApiResponse } from '@/utils/http';

export interface UserResponse {
  id?: number;
  username: string;
  avatar?: string;
  phone?: string;
  email?: string;
  status?: number;
  lastLoginTime?: string;
}

export function getUserInfo() {
  return http.get<ApiResponse<UserResponse>>('/user');
}
