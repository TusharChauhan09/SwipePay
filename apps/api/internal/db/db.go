package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect() (*pgxpool.Pool,error ){
	dbUrl := os.Getenv("DATABASE_URL")
	if dbUrl == ""{
		return nil, fmt.Errorf(("DATABASE_URL not found"))
	}

	pool, err := pgxpool.New(context.Background(),dbUrl)

	if err != nil {
		return nil, fmt.Errorf("unable to create connection pool: %w", err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		return nil, fmt.Errorf("unable to ping database: %w", err)
	}

	return pool, nil
}