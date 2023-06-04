// 3 entidades interfaces de auth:

export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthSignIn {
  userId: number;
  name: string;
  email: string;
  password: string;
  token: string;
  expiresIn: number;
}

export interface AuthResponse {
  name: string;
  email: string;
}
