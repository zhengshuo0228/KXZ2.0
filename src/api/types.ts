export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: import("../types").User;
  positions: import("../types").Position[];
}
