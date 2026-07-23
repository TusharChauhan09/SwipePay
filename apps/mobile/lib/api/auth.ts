import { apiClient } from "./client";

export interface VerifyResponse {
  token: string;
}

export async function verifyWallet(
  walletAddress: string,
  message: string,
  signature: string
): Promise<VerifyResponse> {
  const response = await apiClient.post<VerifyResponse>("/auth/verify", {
    wallet_address: walletAddress,
    message: message,
    signature: signature,
  });
  return response.data;
}