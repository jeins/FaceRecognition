from flask import jsonify

def nok(error_message = ''):
    return jsonify({"valid": False, "data": [], "message": error_message})

def ok(data):
    return jsonify({"valid": True, "data": data})