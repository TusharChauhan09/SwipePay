-- name: CreateSplit :one
INSERT INTO splits (creator_wallet, title, total_amount, currency, tx_signature)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetSplitByID :one
SELECT * FROM splits
WHERE id = $1;

-- name: GetSplitsByCreator :many
SELECT * FROM splits
WHERE creator_wallet = $1
ORDER BY created_at DESC;

-- name: UpdateSplitTxSignature :one
UPDATE splits
SET tx_signature = $2
WHERE id = $1
RETURNING *;