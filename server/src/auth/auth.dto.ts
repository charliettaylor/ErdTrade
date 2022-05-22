export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface GenerateTokenDto {
  email: string;
  username: string;
  id: number;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface TokenCookies {
  atc: string;
  rtc: string;
}
