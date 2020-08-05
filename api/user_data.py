from flask import Blueprint

bp = Blueprint("user_data", __name__)

@bp.route("/user/")
def index():
    print("Hello UserData")
    return ""