package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/joho/godotenv"

	"github.com/TusharChauhan09/SwipePay-api/internal/auth"
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

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: false,
	}))

	r.Post("/auth/verify", auth.VerifyHandler)

	fmt.Println("SolPay API starting on :8080...")
	http.ListenAndServe(":8080", r)
}