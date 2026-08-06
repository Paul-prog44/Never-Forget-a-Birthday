from sqlalchemy import text
from app.db.session import engine

def test_connection():
    try:
        # Tente d'ouvrir une connexion et d'exécuter une requête basique
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print(" Connexion à la base de données réussie !")
            print(f"Résultat du test : {result.scalar()}")
    except Exception as e:
        print(" Échec de la connexion à la base de données.")
        print(f"Erreur : {e}")

if __name__ == "__main__":
    test_connection()