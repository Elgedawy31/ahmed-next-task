export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  session_id: string | null;
  session_expiry: string | null;
  createdAt: string;
}

export interface Sales {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  rating: number;
  branchId?: {
    _id: string;
    name: string;
  };
  branch?: string; // Keep for backward compatibility
  session_id: string | null;
  session_expiry: string | null;
  createdAt: string;
  whatsNumber: string;
  phoneNumber: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  mobile: string;
  password: string;
  password_confirmation: string;
  mobile_country_code: string;
  type: "client" | "restaurant";
  fcm_token?: string;
}

export interface VerifyCredentials {
  code: string;
}

export interface AuthActionResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    accessToken?: string;
  };
  temp_token?: string;
}

export interface GetProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken?: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Store Types
export interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string | null, user: User | null) => void;
  clearAuth: () => void;
}

// Hook Return Types
export interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface UseRegisterReturn {
  register: (data: RegisterCredentials) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface UseVerifyReturn {
  verify: (code: string) => Promise<void>;
  resendCode: () => Promise<void>;
  loading: boolean;
  resendLoading: boolean;
  error: string | null;
  resendError: string | null;
  resendSuccess: boolean;
}

export interface UseLogoutReturn {
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiUserData {
  id?: number | string;
  _id?: string;
  name?: string;
  email?: string;
  type?: string;
  role?: string;
  createdAt?: string;
}
