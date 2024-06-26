from flask import Flask
from app import app

@app.route('/hello')
def hello():
    return 'Hello, from Flask!'