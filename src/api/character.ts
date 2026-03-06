import { http, type ApiResponse } from '@/utils/http';

export interface Character {
  id?: number;
  name: string;
  image: string;
  summary: string;
  minimumScore: number;
}

export function getCharacters() {
  return http.get<Character[]>('/characters');
}
