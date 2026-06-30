package auth

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	WalletAddress string `json:"wallet_address"`
	jwt.RegisteredClaims
}

func GenerateJWT(walletAddress string) (string , error){
	secret := os.Getenv("JWT_SECRET")
	claims := Claims{
		WalletAddress: walletAddress,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func ValidateJWT(tokenString string) (*Claims, error) {
	secret := os.Getenv("JWT_SECRET")
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(
		tokenString,
		claims, 
		func(t *jwt.Token)(interface{}, error){
			return []byte(secret),nil
		})

		if err != nil || !token.Valid {
			return nil, err
		}
	return claims, nil
}

