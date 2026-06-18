-- name: AddSplitParticipant :one
INSERT INTO split_participants (split_id, wallet_address, amount)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetParticipantsBySplit :many
SELECT * FROM split_participants
WHERE split_id = $1;

-- name: GetSplitsForWallet :many
SELECT sp.*, s.title, s.currency, s.created_at as split_created_at
FROM split_participants sp
JOIN splits s ON s.id = sp.split_id
WHERE sp.wallet_address = $1
ORDER BY s.created_at DESC;

-- name: MarkParticipantPaid :one
UPDATE split_participants
SET paid = true
WHERE id = $1
RETURNING *;