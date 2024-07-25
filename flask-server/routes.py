from flask import request, jsonify, session
from app import app, db
from models import User, Group
from werkzeug.security import generate_password_hash, check_password_hash
import string
import random



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
        return jsonify(
            {'error': 'Password does not meet complexity requirements.'}), 400
    
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


@app.route("/logout")
def logout():
    """
    Handle logout by clearing session cookies.
    """
    session.clear()
    return jsonify({'message': 'Logged out successfully.'}), 200


@app.route('/getGroups', methods=['GET'])
def get_groups():
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    username = session['user']
    user = User.query.filter_by(username=username).first()
    
    groups = user.groups
    
    groups_list = [
        {
            'name': group.group_name,
            'avatar': group.avatar.name
        }
        for group in groups
    ]
    
    return jsonify({'groups': groups_list})


@app.route('/create_group', methods=['POST'])
def create_group():
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = session['user']
    new_group_code = generate_group_code()
    
    new_group = Group(
        created_by = user,
        group_name = request.form.get('groupName').lower(),
        group_code = new_group_code,
        avatar = request.form.get('avatar').lower()
    )
    
    db.session.add(new_group)
    db.session.commit()

    return jsonify({'message': 'Group created succesfully.'}), 201
    

# Callback Functions

def is_password_valid(string):
    """
    Validates that the password meets complexity requirements:
    - At least 8 characters long
    - Contains at least one uppercase letter
    - Contains at least one lowercase letter
    - Contains at least one digit
    """
    if (len(string) < 8 or
        not any(char.isupper() for char in string) or
        not any(char.islower() for char in string) or
        not any(char.isdigit() for char in string)):
        return False
    return True

def generate_group_code(length=5):
    """
    Generates a string of 5 random characters from a string of all lowercase and uppercase letters
    """
    characters = string.ascii_letters
    group_code = ''.join(random.choice(characters) for _ in range(length))
    return group_code
