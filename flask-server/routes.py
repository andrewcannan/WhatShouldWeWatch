from flask import request, jsonify, session
from app import app, db
from models import User
from werkzeug.security import generate_password_hash, check_password_hash



@app.route('/register', methods=['POST'])
def register():
    """
    Adds new instance of user to database if not already existing,
    and if password passes complexity requirements.
    """
    existing_user = User.query.filter(
        User.username == request.form.get('username').lower()).all()
    
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400
    
    if not is_password_valid(request.form.get('password')):
        return jsonify({'error': 'Password does not meet complexity requirements.'}), 400
    
    new_user = User(
        username = request.form.get('username').lower(),
        password = generate_password_hash(request.form.get('password'))
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created succesfully.'}), 201


@app.route('/login', methods=['POST'])
def login():
    """
    Handles login of user.
    """
    existing_user = User.query.filter(
        User.username == request.form.get('username').lower()).first()
    
    if existing_user and check_password_hash(
        existing_user.password, request.form.get('password')):
        session['user'] = request.form.get('username').lower()
        return jsonify({'message': 'Login Successful.'}), 200
        
    else:
        return jsonify({'error': 'Username and/or Password incorrect.'}), 401


# Callback Functions

def is_password_valid(string):
    """
    Validates that the password meets complexity requirements:
    - At least 8 characters long
    - Contains at least one uppercase letter
    - Contains at least one lowercase letter
    - Contains at least one digit
    """
    if (not string or
        len(string) < 8 or
        not any(char.isupper() for char in string) or
        not any(char.islower() for char in string) or
        not any(char.isdigit() for char in string)):
        return False
    return True