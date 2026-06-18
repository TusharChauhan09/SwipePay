-- name: CreateUser :one
INSERT INTO users (wallet_address, username, display_name, avatar_url)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUserByWallet :one
SELECT * FROM users
WHERE wallet_address = $1;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1;

-- name: SearchUsersByUsername :many
SELECT * FROM users
WHERE username ILIKE '%' || $1 || '%'
LIMIT 20;

-- name: UpdateUserProfile :one
UPDATE users
SET display_name = $2,
    avatar_url = $3,
    updated_at = now()
WHERE wallet_address = $1
RETURNING *;