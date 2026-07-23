import { apiClient } from "./client";

export interface UserProfile {
  wallet_address: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileInput {
  username: string;
  display_name: string;
  avatar_url?: string;
}

export async function getProfile(walletAddress: string): Promise<UserProfile> {
  const response = await apiClient.get<UserProfile>(`/profile/${walletAddress}`);
  return response.data;
}

export async function createProfile(
  input: CreateProfileInput
): Promise<UserProfile> {
  const response = await apiClient.post<UserProfile>("/profile", input);
  return response.data;
}

export async function checkProfileExists(walletAddress: string): Promise<boolean> {
  try {
    await getProfile(walletAddress);
    return true;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return false;
    }
    throw error;
  }
}