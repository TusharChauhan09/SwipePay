package auth

import (
	"encoding/json"
	"net/http"
)

type VerifyRequest struct {
	WalletAddress string `json:"wallet_address"`
	Message string `json:"message"`
	Signature string `json:"signature"`
}

type VerifyResponse struct{
	Token string `json:"token"`
}

func VerifyHandler(w http.ResponseWriter, r *http.Request){
	
	// Body may or may not contains signed message form wallet (phantom) 
	var req VerifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}
	if req.WalletAddress == "" || req.Message == "" || req.Signature == "" {
		http.Error(w, "missing required fields", http.StatusBadRequest)
		return
	}

	valid := VerifySignature(req.WalletAddress, req.Message, req.Signature)
	if !valid {
		http.Error(w, "invalid signature", http.StatusUnauthorized)
		return
	}

	token, err := GenerateJWT(req.WalletAddress)
	if err != nil {
		http.Error(w, "failed to generate token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type","application/json")
	json.NewEncoder(w).Encode(VerifyResponse{Token: token})
}