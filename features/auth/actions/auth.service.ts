"use server";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import serverAxios from "@/lib/axios/serverAxios";
import type {
  User,
  AuthActionResponse,
  GetProfileResponse,
  LoginCredentials,
  RegisterCredentials,
  VerifyCredentials,
  ApiUserData,
} from "../types";

// Helper function to map API user data to User interface
function mapUserData(
  userData: ApiUserData | undefined | null
): User | undefined {
  if (!userData) return undefined;

  return {
    _id: userData.id?.toString() || userData._id || "",
    name: userData.name || "",
    email: userData.email || "",
    role: userData.type || userData.role || "client",
    session_id: null,
    session_expiry: null,
    createdAt: userData.createdAt || new Date().toISOString(),
  };
}

// Helper function to set token cookie
async function setTokenCookie(token: string) {
  (await cookies()).set("token", token, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Generic auth action handler
async function authAction(
  payload: FormData | Record<string, string | number | boolean>,
  endpoint: string
): Promise<AuthActionResponse> {
  try {
    const headers: Record<string, string> = {};
    const data =
      payload instanceof FormData ? payload : JSON.stringify(payload);

    if (!(payload instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await serverAxios.post(endpoint, data, { headers });
    const responseData = response.data;
    const userData = responseData?.data || responseData?.user;
    const accessToken =
      userData?.token ||
      responseData?.data?.accessToken ||
      responseData?.user?.token;

    const user = mapUserData(userData);

    if (accessToken) {
      await setTokenCookie(accessToken);
    }

    return {
      success: responseData?.status !== false,
      message: responseData?.message || "Success",
      data: { user, accessToken },
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
    };
  }
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthActionResponse> {
  const result = await authAction(
    credentials as unknown as Record<string, string>,
    "/auth/login"
  );

  if (result.success && result.data?.accessToken) {
    revalidatePath("/dashboard", "layout");
  }

  return result;
}

export async function registerUser(
  credentials: RegisterCredentials
): Promise<AuthActionResponse> {
  try {
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("mobile", credentials.mobile);
    formData.append("password", credentials.password);
    formData.append("password_confirmation", credentials.password_confirmation);
    formData.append("mobile_country_code", credentials.mobile_country_code);
    formData.append("type", credentials.type);
    formData.append("fcm_token", credentials.fcm_token || "test");

    const response = await serverAxios.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const responseData = response.data;
    const userData = responseData?.data;
    const accessToken = userData?.token;
    const user = mapUserData(userData);

    if (accessToken) {
      await setTokenCookie(accessToken);
    }

    return {
      success: true,
      message: responseData?.message || "Registration successful!",
      data: { user, accessToken },
      temp_token: responseData?.temp_token,
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message:
        err.response?.data?.message ||
        "Something went wrong during registration",
    };
  }
}

export async function verifyUser(
  credentials: VerifyCredentials
): Promise<AuthActionResponse> {
  try {
    const response = await serverAxios.post("/auth/verify-email", credentials, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: true,
      message: response.data?.message || "Verification successful!",
      data: response.data?.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message:
        err.response?.data?.message ||
        "Something went wrong during verification",
    };
  }
}

export async function resendVerificationCode(
  email?: string,
  tempToken?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const payload: Record<string, string> = {};
    if (email) payload.email = email;
    if (tempToken) payload.temp_token = tempToken;

    const response = await serverAxios.post(
      "/auth/verify-email/resend-code",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    return {
      success: true,
      message: response.data?.message || "Verification code sent successfully",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message:
        err.response?.data?.message || "Something went wrong during resend",
    };
  }
}

export async function getProfile(): Promise<{
  user: User | null;
  token: string | null;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { user: null, token: null };
  }

  try {
    const response = await serverAxios.get<GetProfileResponse>(
      "/auth/user-data"
    );

    return {
      user: response.data?.data?.user || null,
      token: response.data?.data?.accessToken || token,
    };
  } catch {
    return { user: null, token: null };
  }
}

export async function logoutUser(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await serverAxios.get("/auth/logout");
  } catch {
    // Continue even if server call fails
  } finally {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("accessToken");
    revalidatePath("/dashboard", "layout");
  }

  return {
    success: true,
    message: "Logout successful!",
  };
}
