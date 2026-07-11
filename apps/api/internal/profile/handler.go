package profile

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/TusharChauhan09/SwipePay-api/internal/auth"
	db "github.com/TusharChauhan09/SwipePay-api/internal/db/generated"
)

type Handler struct {
	queries *db.Queries
}

func NewHandler(pool *pgxpool.Pool) *Handler {
	return &Handler{
		queries: db.New(pool),
	}
}

type CreateProfileRequest struct {
	Username    string `json:"username"`
	DisplayName string `json:"display_name"`
	AvatarURL   string `json:"avatar_url"`
}

func (h *Handler) SearchUsers(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	if query == "" {
		http.Error(w, "query parameter 'q' is required", http.StatusBadRequest)
		return
	}

	searchTerm := pgtype.Text{String: query, Valid: true}
	users, err := h.queries.SearchUsersByUsername(r.Context(), searchTerm)
	if err != nil {
		http.Error(w, "search failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func (h *Handler) CreateProfile(w http.ResponseWriter, r *http.Request) {
	walletAddress, ok := auth.GetWalletFromContext(r)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req CreateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Username == "" || req.DisplayName == "" {
		http.Error(w, "username and display_name are required", http.StatusBadRequest)
		return
	}

	avatarUrl := pgtype.Text{String: req.AvatarURL, Valid: req.AvatarURL != ""}

	user, err := h.queries.CreateUser(r.Context(), db.CreateUserParams{
		WalletAddress: walletAddress,
		Username:      req.Username,
		DisplayName:   req.DisplayName,
		AvatarUrl:     avatarUrl,
	})
	if err != nil {
		http.Error(w, "failed to create profile", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func (h *Handler) GetProfile(w http.ResponseWriter, r *http.Request) {
	walletAddress := chi.URLParam(r, "wallet")
	if walletAddress == "" {
		http.Error(w, "wallet address is required", http.StatusBadRequest)
		return
	}

	user, err := h.queries.GetUserByWallet(r.Context(), walletAddress)
	if err != nil {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (h *Handler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	walletAddress, ok := auth.GetWalletFromContext(r)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req CreateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	avatarUrl := pgtype.Text{String: req.AvatarURL, Valid: req.AvatarURL != ""}

	user, err := h.queries.UpdateUserProfile(r.Context(), db.UpdateUserProfileParams{
		WalletAddress: walletAddress,
		DisplayName:   req.DisplayName,
		AvatarUrl:     avatarUrl,
	})
	if err != nil {
		http.Error(w, "failed to update profile", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}