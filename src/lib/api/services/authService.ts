import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutRequest,
  LogoutResponse,
  User,
} from '@/types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  async logout(refreshTokenData: LogoutRequest): Promise<LogoutResponse> {
    const response = await apiClient.post<LogoutResponse>(
      API_ENDPOINTS.AUTH.LOGOUT,
      refreshTokenData
    );
    return response.data;
  },

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      data
    );
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ success: boolean; data: User }>(
      API_ENDPOINTS.AUTH.ME
    );
    return response.data.data;
  },
};