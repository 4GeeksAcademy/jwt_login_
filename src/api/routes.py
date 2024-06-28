"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

import json

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def create_one_user():
    body = json.loads(request.data)
    new_user = User(
        email = body["email"],
        username = body["username"],
        password = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8'),
        name = body["name"],
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "user created succesfull"}), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify({"msg":"user not found"}), 404   
    valid_password = current_app.bcrypt.check_password_hash(user.password, password)
    if valid_password is False:
        return jsonify ({"msg": "invalidad password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user.serialize()), 200
