from flask import request, jsonify, session, request
from app import app, db
from models import User, Group, Genre, Show
from werkzeug.security import generate_password_hash, check_password_hash
import string
import random
import requests



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
    Handles login of user. Updates genre db table on successful login.
    """
    existing_user = User.query.filter(
        User.username == request.form.get('username').lower()).first()
    
    if existing_user and check_password_hash(
        existing_user.password, request.form.get('password')):
        session['user'] = existing_user.id
        update_genres()
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
    """
    Returns a list of groups user is a member of.
    Returns unauthorized if user not logged in.
    """
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = User.query.filter_by(id=session['user']).first()
    
    groups = user.groups
    
    groups_list = [
        {
            'id': group.id,
            'name': group.group_name,
            'avatar': group.avatar,
            'code': group.group_code
        }
        for group in groups
    ]
    
    return jsonify({'groups': groups_list})


@app.route('/create_group', methods=['POST'])
def create_group():
    """
    Creates new group in db, and adds relationship to join table.
    Returns unauthorized if user not logged in. 
    """
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = User.query.filter_by(id=session['user']).first()
    new_group_code = generate_group_code()
    
    new_group = Group(
        created_by = user.id,
        group_name = request.form.get('groupName').lower(),
        group_code = new_group_code,
        avatar = request.form.get('avatar').lower()
    )
    
    db.session.add(new_group)
    user.groups.append(new_group)
    db.session.commit()

    return jsonify({'message': 'Group created succesfully.'}), 201


@app.route('/edit_group', methods=['POST'])
def edit_group():
    """
    Retrieves group from database and updates group name and avatar.
    Returns unauthorized if user is not logged in or a member of that group.
    """
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    group_id = request.form.get['groupId']
    group = Group.query.filter_by(id=group_id).first()
    
    if not group:
        return jsonify({'error': 'Group not found'}), 404
    
    if session['user'] not in [user.id for user in group.users]:
        return jsonify({'error': 'Unauthorized'}), 401
    
    group.group_name = request.form.get('groupName').lower(),
    group.avatar = request.form.get('avatar').lower()
    db.session.commit()

    return jsonify({'message': 'Group updated succesfully.'}), 201


@app.route('/join_group', methods=['GET', 'POST'])
def join_group():
    """
    GET method returns group found in table from group code.
    POST method adds user relationship to join table.
    Returns unauthorized if user not logged in.
    """
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    if request.method == 'GET':
        group_code = request.args.get('groupCode')
        
        if not group_code:
            return jsonify({'error': 'Group code required.'}), 400
        
        group = Group.query.filter(
            Group.group_code == group_code
        ).first()
        
        if not group:
            return jsonify({'error': 'Group not found.'}), 404
        
        found_group = {
            'id': group.id,
            'created_by': group.created_by,
            'group_name': group.group_name,
            'group_code': group.group_code,
            'avatar': group.avatar
        }
        
        return jsonify({'message': 'Group found.', 'group': found_group})
    
    elif request.method == 'POST':
        group_code = request.form.get('groupCode')
        user = User.query.filter_by(id=session['user']).first()
        
        if not group_code:
            return jsonify({'error': 'Group code required.'}), 400
        
        group = Group.query.filter(
            Group.group_code == group_code
        ).first()
        
        if not group:
            return jsonify({'error': 'Group not found.'}), 404
        
        if user in group.users:
            return jsonify({'error': 'User already in group.'}), 400
        
        group.users.append(user)
        db.session.commit()
        
        return jsonify({'message': 'Successfully joined group.'}), 200
    
    
@app.route('/search_tmdb', methods=['GET'])
def search_tmdb():
    """
    Builds a url for retrieving data from TMDb using keyword in get request 
    and our API key. Filters results to remove perosn objects and returns this.
    """
    search_keyword = request.args.get('searchKeyword')
    
    if not search_keyword:
        return jsonify({'error': 'No search keyword provided'}), 400
    
    tmdb_token = app.config.get('TMDB_TOKEN')
    
    url = f'https://api.themoviedb.org/3/search/multi?query={search_keyword}&include_adult=false&language=en-US'

    headers = {
        "accept": "application/json",
        "Authorization": tmdb_token
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        
        filtered_results = [item for item in data['results'] if item['media_type'] in ['movie', 'tv']]
        
        for result in filtered_results:
            if 'genres' not in result:
                result['genres'] = []
                
            result['genres'].extend([genre_mapping().get(genre_id, 'Unknown Genre') for genre_id in result.get('genre_ids', [])])
                    
        return jsonify({'message': 'Results found.', 'results': filtered_results}), 200
    else:
        return jsonify({'error': 'Failed to retrieve search results'}), response.status_code


@app.route('/add_show', methods=['POST'])
def add_show():
    """
    Retrieves groupId and selectedItem from request.
    Checks if show already in db or already associated with group.
    Creates a new instance of a show.
    Commits instance to db and creates relationship to the group.
    """
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized.'}), 401
    
    group_id = request.json.get('groupId')
    show = request.json.get('selectedItem')
    
    if not show:
        return jsonify({'error': 'No Movie or TV show selected.'}), 400
    
    group = Group.query.get(group_id)
    
    if not group:
        return jsonify({'error': 'Group not found.'}), 404
    
    if session['user'] not in [user.id for user in group.users]:
        return jsonify({'error': 'Unauthorized'}), 401
    
    existing_show = Show.query.filter_by(name=show.get('title') or show.get('name')).first()
    
    if existing_show:
        if existing_show in group.shows:
            return jsonify({'error': 'Already in watchlist.'}), 400
        
        group.shows.append(existing_show)
        db.session.commit()
        return jsonify({'message': 'Successfully added to watchlist.'}), 200
            
    new_show = Show(
        name = show.get('title') or show.get('name'),
        description = show.get('overview'),
        poster_path = show.get('poster_path'),
        media_type = show.get('media_type'),
        tmdb_genre_ids = show.get('genre_ids'),
        genres = show.get('genres'),
        vote_average = show.get('vote_average'),
        release_date = show.get('release_date')
    )
    
    db.session.add(new_show)
    group.shows.append(new_show)
    db.session.commit()
    
    return jsonify({'message': 'Successfully added to watchlist.'}), 201

@app.route('/getShows', methods=['GET'])
def get_shows():
    """
    Returns JSON data of all shows associated with group.
    """
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    group_id = request.args.get('groupId')
    if not group_id:
        return jsonify({'error': 'Group ID required'}), 400
    
    group = Group.query.filter_by(id=group_id).first()
    if not group:
        return jsonify({'error': 'Group not found.'}), 404
    
    if session['user'] not in [user.id for user in group.users]:
        return jsonify({'error': 'Unauthorized'}), 401
    
    shows = group.shows
    
    shows_data = [
        {
            'id': show.id,
            'name': show.name,
            'description': show.description,
            'poster_path': show.poster_path,
            'media_type': show.media_type,
            'tmdb_genre_ids': show.tmdb_genre_ids,
            'genres': show.genres,
            'vote_average': show.vote_average,
            'release_date': show.release_date
        } for show in shows
    ]
    
    return jsonify(shows_data)


@app.route('/remove_show', methods=['POST'])
def remove_show():
    """
    Retrieves groupId and selectedItem from request.
    Checks if show exists in the db and is associated with the group.
    Removes the relationship between the show and the group.
    Optionally deletes the show if it's no longer associated with any groups.
    """
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized.'}), 401

    group_id = request.json.get('groupId')
    show = request.json.get('selectedItem')

    if not show:
        return jsonify({'error': 'No Movie or TV show selected.'}), 400

    group = Group.query.get(group_id)

    if not group:
        return jsonify({'error': 'Group not found.'}), 404
    
    if session['user'] not in [user.id for user in group.users]:
        return jsonify({'error': 'Unauthorized'}), 401

    existing_show = Show.query.get(show.get('id')) 

    if not existing_show:
        return jsonify({'error': 'Show not found in database.'}), 404

    if existing_show not in group.shows:
        return jsonify({'error': 'Show not in group watchlist.'}), 400

    group.shows.remove(existing_show)
    db.session.commit()

    if existing_show.groups.count() == 0: 
        db.session.delete(existing_show)
        db.session.commit()

    return jsonify({'message': 'Successfully removed from watchlist.'}), 200



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

def update_genres():
    """
    Fetches both movie and TV genres from TMDB and combines them into a dictionary.
    Compares with genres already stored in the database and adds those that don't already exist.
    """
    tmdb_token = app.config.get('TMDB_TOKEN')
    headers = {
        "accept": "application/json",
        "Authorization": tmdb_token
    }
    
    movie_genre_url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    movie_response = requests.get(movie_genre_url, headers=headers)
    movie_genres = movie_response.json().get('genres', [])
    
    tv_genre_url = 'https://api.themoviedb.org/3/genre/tv/list?language=en'
    tv_response = requests.get(tv_genre_url, headers=headers)
    tv_genres = tv_response.json().get('genres', [])
    
    combined_genres = {}
    
    for genre in movie_genres:
        combined_genres[genre['id']] = genre['name']
        
    for genre in tv_genres:
        combined_genres[genre['id']] = genre['name']
        
    existing_genres = {genre.tmdb_id: genre.name for genre in Genre.query.all()}
    
    new_genres = []
    
    for genre_id, genre_name in combined_genres.items():
        if genre_id not in existing_genres:
            new_genres.append(Genre(tmdb_id=genre_id, name=genre_name))
            
    if new_genres:
        db.session.add_all(new_genres)
        db.session.commit()
        
def genre_mapping():
    """
    Maps TMDB ids with genre names based on entries in Genre table in the db.
    """
    genres = Genre.query.all()
    genre_mapping = {genre.tmdb_id: genre.name for genre in genres}
    return genre_mapping