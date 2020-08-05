import os

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
FACE_IMAGE_FOLDER = os.path.join(APP_ROOT, 'static/face', 'images')
FACE_ENCODING_FILE = os.path.join(APP_ROOT, 'static/face/encoding', 'dataset.dat')

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
ML_TOLERANCE = 0.6