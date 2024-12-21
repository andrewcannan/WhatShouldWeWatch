from app import db
from sqlalchemy.dialects.postgresql import ARRAY


# Association table for User-Group many-to-many relationship
users_groups = db.Table('users_groups',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id'), primary_key=True)
)

# Association table for Group-Show many-to-many relationship
groups_shows = db.Table('groups_shows',
    db.Column('group_id', db.Integer, db.ForeignKey('group.id'), primary_key=True),
    db.Column('show_id', db.Integer, db.ForeignKey('show.id'), primary_key=True)
)

class User(db.Model):
    '''
    schema for User model
    '''
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, unique=True, nullable=False)
    groups = db.relationship('Group', secondary=users_groups, backref=db.backref('users', lazy='dynamic'), cascade="all, delete")
    
    def __repr__(self):
        # represents itself in the form of a string
        return f"{self.id} - {self.username}"


class Group(db.Model):
    '''
    schema for Group model
    '''
    id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    group_name = db.Column(db.String, nullable=False)
    group_code = db.Column(db.String, nullable=False)
    avatar = db.Column(db.Enum('avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5',
                               'avatar6', 'avatar7', 'avatar8', 'avatar9', name='avatar_enum'), nullable=False)
    shows = db.relationship('Show', secondary=groups_shows, backref=db.backref('groups', lazy='dynamic'), cascade="all, delete, delete-orphan")

    def __repr__(self):
        # represents itself in the form of a string
        return f"{self.id} - {self.group_name} | created by user: {self.created_by}"


class Show(db.Model):
    '''
    schema for Show model
    '''
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    poster_path = db.Column(db.String, nullable=True)
    media_type = db.Column(db.String, nullable=False)
    tmdb_genre_ids = db.Column(ARRAY(db.Integer), nullable=False)
    genres = db.Column(ARRAY(db.String), nullable=False)
    vote_average = db.Column(db.Float, nullable=True)
    release_date = db.Column(db.String, nullable=True)

    def __repr__(self):
        # represents itself in the form of a string
        return f"{self.id} - {self.name} | {self.media_type}"
    
    
class Genre(db.Model):
    """
    schema for Genre model
    """
    id = db.Column(db.Integer, primary_key=True)
    tmdb_id = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    
    def __repr__(self):
        # represents itself in the form of a string
        return f"{self.id} - tmdb_id: {self.tmdb_id} | {self.name}"