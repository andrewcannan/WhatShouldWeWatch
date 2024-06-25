from server import db


# Association table for User-Group many-to-many relationship
users_groups = db.Table('users_groups',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id'), primary_key=True)
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
    group_code = db.Column(db.Integer, nullable=False)
    avatar = db.Column(db.Enum('avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5',
                               'avatar6', 'avatar7', 'avatar8', 'avatar9', 'avatar10'))

    def __repr__(self):
        # represents itself in the form of a string
        return f"{self.id} - {self.group_name} | created by user: {self.created_by}"
