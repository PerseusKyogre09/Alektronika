import pymysql
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_database_if_not_exists():
    """
    Check if the database exists; if not, create it.
    """
    connection = pymysql.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        cursorclass=pymysql.cursors.DictCursor
    )
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('DB_NAME')}")
        connection.commit()
    finally:
        connection.close()

def get_db_connection():
    """
    Connect to the database. Create it if it doesn't exist.
    """
    create_database_if_not_exists()
    return pymysql.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME'),
        cursorclass=pymysql.cursors.DictCursor
    )
def initialize_schema():
    """
    Create necessary tables if they do not exist.
    """
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                )
            """)
        connection.commit()
    finally:
        connection.close()
