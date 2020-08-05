from flask import Flask

app = Flask(__name__)

from api import image_ml, user_data

app.register_blueprint(image_ml.bp)
app.register_blueprint(user_data.bp)
