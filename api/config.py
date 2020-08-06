import os

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
FACE_IMAGE_FOLDER = os.path.join(APP_ROOT, 'static/face', 'images')
FACE_ENCODING_FILE = os.path.join(APP_ROOT, 'static/face/encoding', 'dataset.dat')

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
ML_TOLERANCE = 0.6

DB_HOST = '0.0.0.0'
DB_USER = 'root'
DB_PASS = 'root'
DB_NAME = 'face_detection'