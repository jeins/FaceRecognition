import face_recognition
import uuid
import os
import pickle
import numpy
from flask import Blueprint, request, redirect
from functools import reduce

from api.config import FACE_IMAGE_FOLDER, FACE_ENCODING_FILE, ALLOWED_EXTENSIONS, ML_TOLERANCE
from api.helpers import response

bp = Blueprint("user_recognition", __name__)
ROUTE_URI = "/image-ml"

@bp.route(ROUTE_URI + "/recognition", methods=["POST"])
def recognition():
    if request.method == 'POST':
        if not is_uploaded_file_valid(request):
            return response.nok()

        file = request.files['file']
        if file and allowed_image(file.filename):
            (ids, is_face_found) = detect_face_in_image(file)
            return response.ok([{"ids": ids, "isExist": is_face_found}])

    return response.nok()
        

@bp.route(ROUTE_URI + "/upload", methods=["POST"])
def upload():
    if request.method == 'POST':
        if not is_uploaded_file_valid(request):
            return response.nok()

        file = request.files['file']
        if file and allowed_image(file.filename):
            id = uuid.uuid4().hex

            #save uploaded image to folder
            full_filename = os.path.join(FACE_IMAGE_FOLDER, id + '.' + get_image_extension(file.filename))
            file.save(full_filename)

            face_encodings = load_dataset()

            #start encoding image
            uploaded_image = face_recognition.load_image_file(file)
            try:
                face_encodings[id] = face_recognition.face_encodings(uploaded_image)[0]
            except IndexError:
                return response.nok("no face found on the image")

            #save enconding to folder
            with open(FACE_ENCODING_FILE, 'wb') as f:
                pickle.dump(face_encodings, f)

            return response.ok({"id": id})

    return response.nok()

def load_dataset():
    dataset = {}
    
    if os.path.isfile(FACE_ENCODING_FILE):
        with open(FACE_ENCODING_FILE, 'rb') as f:
            dataset = pickle.load(f)
    else:
        with open(FACE_ENCODING_FILE, 'w'): pass
    
    return dataset

def is_uploaded_file_valid(request):
    if 'file' not in request.files:
        return False

    file = request.files['file']
    if file.filename == '':
        return False

    return True

def allowed_image(image):
    return '.' in image and \
        get_image_extension(image) in ALLOWED_EXTENSIONS

def get_image_extension(image):
    return image.rsplit('.', 1)[1].lower()

def detect_face_in_image(file_stream):
    dataset = load_dataset()
    dataset_ids = list(dataset.keys())
    known_face_encoding = numpy.array(list(dataset.values()))

    #encode uploaded image
    image = face_recognition.load_image_file(file_stream)
    face_locations = face_recognition.face_locations(image)
    image_encodings = face_recognition.face_encodings(image, face_locations)

    is_face_found = False
    ids = []

    #compare face with dataset, if found get the id
    for image_encoding in image_encodings:
        results = face_recognition.compare_faces(known_face_encoding, image_encoding, ML_TOLERANCE)
        if True in results:
            mapped_result = list(zip(dataset_ids, results))
            correct_results = list(filter(lambda x: x[1] == True, mapped_result))
            ids.append(correct_results[0][0])
            is_face_found = True

    return (ids, is_face_found)