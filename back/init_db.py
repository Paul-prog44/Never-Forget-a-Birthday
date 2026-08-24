import sys
from app.db.session import SessionLocal
# Importe ton modèle Role (adapte le chemin selon ton projet)
from app.models import Role 

def seed_db():
    db = SessionLocal()
    try:
        # Vérifie si le rôle 1 existe déjà
        role = db.query(Role).filter(Role.id == 1).first()
        if not role:
            # Crée le rôle par défaut (adapte le champ "name" si nécessaire : "user", "USER", etc.)
            default_role = Role(id=1, name="user")
            db.add(default_role)
            db.commit()
            print("Rôle id=1 créé avec succès.")
        else:
            print("Rôle id=1 déjà existant.")
    except Exception as e:
        print(f"Erreur lors de l'initialisation des données : {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()