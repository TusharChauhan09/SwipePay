CREATE TABLE split_participants (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    split_id        UUID NOT NULL REFERENCES splits(id) ON DELETE CASCADE,
    wallet_address  TEXT NOT NULL REFERENCES users(wallet_address),
    amount          NUMERIC(20, 9) NOT NULL,
    paid            BOOLEAN NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_split_participants_split ON split_participants(split_id);
CREATE INDEX idx_split_participants_wallet ON split_participants(wallet_address);