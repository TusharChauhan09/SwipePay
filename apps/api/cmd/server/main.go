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

	"github.com/TusharChauhan09/SwipePay-api/internal/profile"
	"github.com/TusharChauhan09/SwipePay-api/internal/split"
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

	// Public routes
	r.Post("/auth/verify", auth.VerifyHandler)

	// Public profile lookup
	profileHandler := profile.NewHandler(pool)  // so inorder not to pass pool everytime 
	r.Get("/profile/{wallet}",profileHandler.GetProfile)
	r.Group(func(r chi.Router){
		r.Use(auth.RequireAuth)
		r.Post("/profile", profileHandler.CreateProfile)
		r.Put("/profile", profileHandler.UpdateProfile)
	})

	// user search
	r.Get("/user/search",profileHandler.SearchUsers)

	// Public split lookup (so a scanned QR/link can show split details before paying)
	splitHandler := split.NewHandler(pool)
	r.Get("/splits/{id}", splitHandler.GetSplit)

	r.Group(func(r chi.Router) {
		r.Use(auth.RequireAuth)
		r.Post("/splits", splitHandler.CreateSplit)
		r.Get("/splits", splitHandler.GetMySplits)
	})


	fmt.Println("Swipe API starting on :8080...")
	http.ListenAndServe(":8080", r)
}