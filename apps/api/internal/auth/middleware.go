package auth

import (
	"context"
	"net/http"
	"strings"
)

const WalletContextKey string = "wallet_address"

func RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc (func(w http.ResponseWriter,r *http.Request){
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "missing authorization header", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) !=2 || parts[0]!="Bearer" {
			http.Error(w, "invalid authorization header format", http.StatusUnauthorized)
			return
		}

		tokenString := parts[1];
		
		claims, err := ValidateJWT(tokenString)
		if err != nil {
			http.Error(w, "invalid or expired token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), WalletContextKey, claims.WalletAddress)
		next.ServeHTTP(w,r.WithContext(ctx))
	})
}

func GetWalletFromContext(r *http.Request) (string, bool){
	wallet, ok := r.Context().Value(WalletContextKey).(string)
	return wallet, ok
}