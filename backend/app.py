from flask import Flask, render_template, request, redirect, session, flash
from dotenv import load_dotenv
import os
from auth import register_user, authenticate_user
import db

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, template_folder="../frontend/templates")
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Home Route
@app.route('/')
def home():
    """
    Display the home page if the user is logged in; otherwise, redirect to login.
    """
    if 'user' in session:
        return render_template('index.html', username=session['user'])
    return redirect('/login')

# Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    Handle user login. Verify credentials and set session.
    """
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if authenticate_user(username, password):
            session['user'] = username
            flash('Login successful!', 'success')
            return redirect('/')
        else:
            flash('Invalid username or password.', 'danger')
    return render_template('login.html')

# Register Route
@app.route('/register', methods=['GET', 'POST'])
def register():
    """
    Handle user registration. Save user credentials in the database.
    """
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        try:
            register_user(username, password)
            flash('Registration successful! Please log in.', 'success')
            return redirect('/login')
        except Exception as e:
            flash(f'Error during registration: {str(e)}', 'danger')
    return render_template('register.html')

# Logout Route
@app.route('/logout')
def logout():
    """
    Log out the user by clearing the session.
    """
    session.pop('user', None)
    flash('You have been logged out.', 'info')
    return redirect('/login')

if __name__ == '__main__':
    # Ensure database schema is initialized
    db.initialize_schema()

    # Run the Flask app
    app.run(debug=True)
