package split

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
	pool    *pgxpool.Pool
	queries *db.Queries
}

func NewHandler(pool *pgxpool.Pool) *Handler {
	return &Handler{
		pool:    pool,
		queries: db.New(pool),
	}
}

type ParticipantInput struct {
	WalletAddress string `json:"wallet_address"`
	Amount        string `json:"amount"`
}

type CreateSplitRequest struct {
	Title        string             `json:"title"`
	TotalAmount  string             `json:"total_amount"`
	Currency     string             `json:"currency"`
	Participants []ParticipantInput `json:"participants"`
}

func parseNumeric(value string) (pgtype.Numeric, error) {
	var n pgtype.Numeric
	err := n.Scan(value)
	return n, err
}

func (h *Handler) CreateSplit(w http.ResponseWriter, r *http.Request) {
	creatorWallet, ok := auth.GetWalletFromContext(r)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req CreateSplitRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Title == "" || req.TotalAmount == "" || len(req.Participants) == 0 {
		http.Error(w, "title, total_amount and at least one participant are required", http.StatusBadRequest)
		return
	}

	totalAmount, err := parseNumeric(req.TotalAmount)
	if err != nil {
		http.Error(w, "invalid total_amount format", http.StatusBadRequest)
		return
	}

	tx, err := h.pool.Begin(r.Context())
	if err != nil {
		http.Error(w, "failed to start transaction", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback(r.Context())

	qtx := h.queries.WithTx(tx)

	newSplit, err := qtx.CreateSplit(r.Context(), db.CreateSplitParams{
		CreatorWallet: creatorWallet,
		Title:         req.Title,
		TotalAmount:   totalAmount,
		Currency:      req.Currency,
	})
	if err != nil {
		http.Error(w, "failed to create split", http.StatusInternalServerError)
		return
	}

	for _, p := range req.Participants {
		amount, err := parseNumeric(p.Amount)
		if err != nil {
			http.Error(w, "invalid participant amount format", http.StatusBadRequest)
			return
		}

		_, err = qtx.AddSplitParticipant(r.Context(), db.AddSplitParticipantParams{
			SplitID:       newSplit.ID,
			WalletAddress: p.WalletAddress,
			Amount:        amount,
		})
		if err != nil {
			http.Error(w, "failed to add participant", http.StatusInternalServerError)
			return
		}
	}

	if err := tx.Commit(r.Context()); err != nil {
		http.Error(w, "failed to commit transaction", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newSplit)
}

func (h *Handler) GetSplit(w http.ResponseWriter, r *http.Request) {
	splitIDParam := chi.URLParam(r, "id")

	var splitID pgtype.UUID
	if err := splitID.Scan(splitIDParam); err != nil {
		http.Error(w, "invalid split id format", http.StatusBadRequest)
		return
	}

	split, err := h.queries.GetSplitByID(r.Context(), splitID)
	if err != nil {
		http.Error(w, "split not found", http.StatusNotFound)
		return
	}

	participants, err := h.queries.GetParticipantsBySplit(r.Context(), splitID)
	if err != nil {
		http.Error(w, "failed to fetch participants", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"split":        split,
		"participants": participants,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *Handler) GetMySplits(w http.ResponseWriter, r *http.Request) {
	wallet, ok := auth.GetWalletFromContext(r)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	created, err := h.queries.GetSplitsByCreator(r.Context(), wallet)
	if err != nil {
		http.Error(w, "failed to fetch created splits", http.StatusInternalServerError)
		return
	}

	owed, err := h.queries.GetSplitsForWallet(r.Context(), wallet)
	if err != nil {
		http.Error(w, "failed to fetch owed splits", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"created": created,
		"owed":    owed,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}