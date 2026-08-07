# Activation du virtual env 
.venv\Scripts\activate

# Lancement du serveur dev
fastapi dev main.py

# Un exemple de fichier env est disponible dans /back/.env.example

# Regeneration du model alembic
alembic revision --autogenerate -m "MESSAGE"
# Mise à jour de la bd
alembic upgrade head