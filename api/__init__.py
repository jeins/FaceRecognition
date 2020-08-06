from flask import Flask

from api.db import init_db
from api.controllers import image_ml, user

app = Flask(__name__)

#mysql configurations
init_db(app)

#register routes
app.register_blueprint(image_ml.bp)
app.register_blueprint(user.bp)
