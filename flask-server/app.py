from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://andrewcannan.github.io"}})

app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['TMDB_TOKEN'] = os.getenv('TMDB_TOKEN')

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{os.getenv('PGUSER')}:{os.getenv('PGPASSWORD')}"
    f"@{os.getenv('PGHOST')}:{os.getenv('PGPORT')}/{os.getenv('PGDATABASE')}"
)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from routes import *

if __name__ == '__main__':
    app.run(debug=True)
