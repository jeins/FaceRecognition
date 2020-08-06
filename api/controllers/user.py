import uuid
from flask import Blueprint, jsonify, request

from api.helpers import response, helper
from api.db import db_select, db_insert

URI = '/user/'
REQUIRED_FIELDS = ["fullName", "email", "phoneNumber", "city", "country", "removeAfter14days"]
bp = Blueprint("user", __name__)

@bp.route(URI + 'register', methods=['POST'])
def register():
    data = request.json

    if not helper.validate_request(REQUIRED_FIELDS, data):
        return response.nok("missing some field")
    
    id = str(uuid.uuid4())
    """
    data = db_select("SELECT * FROM users;")

    new_data = {
        "id": id,
        "full_name": "qwe123",
        "email": "qwe@qwewqe.com",
        "phone_number": "018123123",
        "city": "Berlin",
        "country": "DE",
        "remove_after_14days": "1"
    }
    print(new_data.keys())
    print(list(new_data.values()))
    db_insert("users", new_data)
    print("AD")
    print(data)
"""
    return ""


