import { http, type ApiResponse } from '@/utils/http';

// 选项项接口
export interface QuizItem {
  id: number;
  title: string;
}

// 答题结果提示接口
export interface QuizResponse {
  win: string;
  lose: string;
}

// 单道题目接口
export interface Quiz {
  title: string;
  items: QuizItem[];
  currectAnswer: number;
  response: QuizResponse;
}

// 获取题目列表接口
export function getQuizzes() {
  return http.get<Quiz[]>('/quizzes');
}
