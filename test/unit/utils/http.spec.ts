import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { http, type ApiResponse } from '@/utils/http';
import { request } from '@/utils/request';

// Mock request 模块
vi.mock('@/utils/request', () => ({
  request: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('http', () => {
  const mockResponse: ApiResponse = {
    code: 200,
    message: 'success',
    data: { id: 1, name: 'test' },
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('should make a GET request with correct parameters', async () => {
      vi.mocked(request.get).mockResolvedValue(mockResponse);

      const result = await http.get('/test', { id: 1 });

      expect(request.get).toHaveBeenCalledWith('/test', { params: { id: 1 } });
      expect(result).toEqual(mockResponse);
    });

    it('should make a GET request without params', async () => {
      vi.mocked(request.get).mockResolvedValue(mockResponse);

      const result = await http.get('/test');

      expect(request.get).toHaveBeenCalledWith('/test', { params: undefined });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('post', () => {
    it('should make a POST request with correct data', async () => {
      vi.mocked(request.post).mockResolvedValue(mockResponse);

      const postData = { name: 'test' };
      const result = await http.post('/test', postData);

      expect(request.post).toHaveBeenCalledWith('/test', postData, undefined);
      expect(result).toEqual(mockResponse);
    });

    it('should make a POST request with config', async () => {
      vi.mocked(request.post).mockResolvedValue(mockResponse);

      const postData = { name: 'test' };
      const config = { headers: { 'X-Custom-Header': 'value' } };
      const result = await http.post('/test', postData, config);

      expect(request.post).toHaveBeenCalledWith('/test', postData, config);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('put', () => {
    it('should make a PUT request with correct data', async () => {
      vi.mocked(request.put).mockResolvedValue(mockResponse);

      const putData = { id: 1, name: 'updated' };
      const result = await http.put('/test/1', putData);

      expect(request.put).toHaveBeenCalledWith('/test/1', putData, undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make a DELETE request with correct parameters', async () => {
      vi.mocked(request.delete).mockResolvedValue(mockResponse);

      const result = await http.delete('/test/1', { force: true });

      expect(request.delete).toHaveBeenCalledWith('/test/1', { params: { force: true } });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('patch', () => {
    it('should make a PATCH request with correct data', async () => {
      vi.mocked(request.patch).mockResolvedValue(mockResponse);

      const patchData = { name: 'patched' };
      const result = await http.patch('/test/1', patchData);

      expect(request.patch).toHaveBeenCalledWith('/test/1', patchData, undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('upload', () => {
    it('should make a POST request with FormData and correct headers', async () => {
      vi.mocked(request.post).mockResolvedValue(mockResponse);

      const formData = new FormData();
      formData.append('file', new Blob(['test']), 'test.txt');

      const result = await http.upload('/upload', formData);

      expect(request.post).toHaveBeenCalledWith(
        '/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should merge custom config with default headers', async () => {
      vi.mocked(request.post).mockResolvedValue(mockResponse);

      const formData = new FormData();
      const customConfig = { timeout: 10000 };

      await http.upload('/upload', formData, customConfig);

      expect(request.post).toHaveBeenCalledWith(
        '/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000,
        }
      );
    });
  });

  describe('download', () => {
    it('should make a GET request with blob responseType', async () => {
      const blobResponse = {
        data: new Blob(['test']),
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      vi.mocked(request.get).mockResolvedValue(blobResponse as any);

      const result = await http.download('/download', { id: 1 });

      expect(request.get).toHaveBeenCalledWith(
        '/download',
        {
          params: { id: 1 },
          responseType: 'blob',
        }
      );
      expect(result).toEqual(blobResponse);
    });
  });

  describe('generic type support', () => {
    interface User {
      id: number;
      name: string;
    }

    it('should support generic type for response data', async () => {
      const userResponse: ApiResponse<User> = {
        code: 200,
        message: 'success',
        data: { id: 1, name: 'John' },
      };
      vi.mocked(request.get).mockResolvedValue(userResponse);

      const result = await http.get<User>('/user/1');

      expect(result.data.id).toBe(1);
      expect(result.data.name).toBe('John');
    });
  });
});
