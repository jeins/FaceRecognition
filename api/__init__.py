from flask import Flask
from flaskext.mysql import MySQL

from api import config
from api import image_ml, user_data

app = Flask(__name__)
mysql = MySQL()

#mysql configurations
app.config['MYSQL_DATABASE_HOST'] = config.DB_HOST
app.config['MYSQL_DATABASE_USER'] = config.DB_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config.DB_PASS
app.config['MYSQL_DATABASE_DB'] = config.DB_NAME
mysql.init_app(app)

#register routes
app.register_blueprint(image_ml.bp)
app.register_blueprint(user_data.bp)
