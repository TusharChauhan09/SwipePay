package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/TusharChauhan09/SwipePay-api/internal/db"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on system environment variables")
	}

	pool, err := db.Connect()
	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer pool.Close()

	fmt.Println("Connected to Neon DB successfully")
	fmt.Println("SolPay API starting on :8080...")

	http.ListenAndServe(":8080", nil)
}