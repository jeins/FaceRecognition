from flask import Flask
from flask_cors import CORS

from api.db import init_db
from api.controllers import user

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

#mysql configurations
init_db(app)

#register routes
app.register_blueprint(user.bp)