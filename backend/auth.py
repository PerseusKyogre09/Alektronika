import bcrypt
from db import get_db_connection

def register_user(username, password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s)",
            (username, hashed_password.decode('utf-8'))
        )
    connection.commit()
    connection.close()

def authenticate_user(username, password):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT password FROM users WHERE username = %s", (username,)
        )
        user = cursor.fetchone()
    connection.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return True
    return False
