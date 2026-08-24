#!/bin/sh

set -e

echo "Execution des migrations Alembic..."
alembic upgrade head

echo "Initialisation des données de base (seed)..."
python init_db.py

echo "Démarrage de l'application FastAPI..."
exec "$@"