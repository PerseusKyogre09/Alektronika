from flask import request, jsonify, session
from auth import register_user, authenticate_user

def register_routes(app):
    @app.route('/api/register', methods=['POST'])
    def register():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        register_user(username, password)
        return jsonify({"message": "User registered successfully!"}), 201

    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        if authenticate_user(username, password):
            session['user'] = username
            return jsonify({"message": "Login successful!"})
        return jsonify({"message": "Invalid credentials"}), 401

    @app.route('/api/logout', methods=['POST'])
    def logout():
        session.pop('user', None)
        return jsonify({"message": "Logged out successfully!"})
