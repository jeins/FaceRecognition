import uuid
from flask import Blueprint, jsonify, request

from api.helpers import response, helper
from api.db import db_select, db_insert
from api.services import image_ml

URI = '/user/'
REQUIRED_FIELDS = ["fullName", "email", "phoneNumber", "city", "country", "removeAfterDays14"]
bp = Blueprint("user", __name__)

@bp.route(URI + 'register', methods=['POST'])
def register():
    data = request.json

    # check if request valid based on required fields
    if not helper.validate_request(REQUIRED_FIELDS, data):
        return response.nok("missing some field")

    #check is email or phone number already exist
    user = db_select('SELECT id FROM users WHERE email="' + data['email'] + '" OR phone_number="' + data['phoneNumber'] + '"')
    if (len(user) > 0):
        return response.nok("email or phone number already exist")

    #prepare data before input to db
    id = str(uuid.uuid4())
    new_user = { "id": id }
    for field in REQUIRED_FIELDS:
        new_user[helper.camelcase_to_snakecase(field)] = data[field]
    
    #save data to db user
    success = db_insert("users", new_user)
    if success == True:
        return response.ok({"id": id})

    return response.nok()


@bp.route(URI + 'train-face/<user_id>', methods=['POST'])
def train_face(user_id):
    if request.method == 'POST':
        #check is user valid
        user = db_select('SELECT * FROM users WHERE id="' + user_id + '"')
        if (len(user) == 0):
            return response.nok("user id not valid")
        
        #check is uploaded image valid
        if not is_uploaded_file_valid(request):
            return response.nok("uploaded file not valid")

        #train face
        file = request.files['image']
        dataset_id = image_ml.train_face(file)

        if dataset_id == "":
            return response.nok("something wrong, please take a new face picture")

        #save data to db users_dataset
        new_dataset = {"user_id": user_id, "dataset_id": dataset_id}
        success = db_insert("users_dataset", new_dataset)
        if success == True:
            return response.ok(new_dataset)

    return response.nok()


@bp.route(URI + 'identify', methods=['POST'])
def identify():
    if request.method == 'POST':
        if not is_uploaded_file_valid(request):
            return response.nok()

        file = request.files['image']
        if file and image_ml.allowed_image(file.filename):
            #recognize uploaded image
            (ids, is_face_found) = image_ml.detect_face_in_image(file)

            if is_face_found == False:
                return response.nok("face not found")

            #get user id from dataset id
            query_condition = ' OR '.join('dataset_id="{0}"'.format(id) for id in ids)
            users = db_select('SELECT user_id FROM users_dataset WHERE ' + query_condition)
            
            #get user data
            users_data = {}
            for d in users:
                user_data = db_select('SELECT * FROM users WHERE id="' + d['user_id'] + '"')
                users_data[d['user_id']] = user_data
            
            return response.ok(users_data)

    return response.nok()


def is_uploaded_file_valid(request):
    if 'image' not in request.files:
        return False

    file = request.files['image']
    if file.filename == '':
        return False

    return True