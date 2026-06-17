CREATE TABLE splits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_wallet TEXT NOT NULL REFERENCES users(wallet_address) ON DELETE CASCADE,
    title TEXT NOT NULL,
    total_amount NUMERIC(20,9) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    tx_signature TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_splits_creator ON splits(creator_wallet);