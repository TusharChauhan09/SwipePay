package auth
import (
	"github.com/mr-tron/base58"
	"crypto/ed25519"
)

func VerifySignature(walletAddress string, message string, signature string) bool {
	pubKeyBytes, err := base58.Decode(walletAddress)
	if err != nil{
		return false
	} 

	sigBytes, err := base58.Decode(signature) 
	if err!=nil{
		return false
	}

	msgBytes:= []byte(message)
	return ed25519.Verify(pubKeyBytes,msgBytes,sigBytes)
}