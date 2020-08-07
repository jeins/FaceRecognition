from flask import Flask

from api.db import init_db
from api.controllers import user

app = Flask(__name__)

#mysql configurations
init_db(app)

#register routes
app.register_blueprint(user.bp)
