from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask_jwt_extended import set_access_cookies
import os 

#init app

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

#db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
#init db

db = SQLAlchemy(app)

#Init ma

ma = Marshmallow(app)
jwt = JWTManager(app)
CORS(app)
#user model 

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    email = db.Column(db.String(40), unique = True, nullable = False)
    password = db.Column(db.String(200), primary_key=False, unique=False, nullable=False)
   
    
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String, nullable = False)     

    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name
#user scheme
class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'email', 'password')

class ListSchema(ma.Schema):
  class Meta:
    fields = ('id', 'user_id', 'name')

# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)

list_schema = ListSchema()

lists_schema = ListSchema(many = True)
#run server

#create a user

@app.route('/users/register', methods=['POST'])
def register_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    new_user = User(name,email,password)

    db.session.add(new_user)

    db.session.commit()

    return user_schema.jsonify(new_user)

@app.route('/list', methods=['POST'])
def add_item():
    name = request.json['name']
    user_id = request.json['user_id']

    new_list = List(user_id,name)

    db.session.add(new_list)

    db.session.commit()

    return user_schema.jsonify(new_list)
# Get All users
@app.route('/users', methods=['GET'])
def get_users():
  all_users = User.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)

@app.route('/list/<id>', methods=['GET'])
def get_lists(id):
  all_lists = List.query.filter_by(user_id = id).all()
  result = lists_schema.dump(all_lists)
  return jsonify(result)
# Get single users
@app.route('/users/<id>', methods=['GET'])
def get_user(id):
  user = User.query.get(id)
  return user_schema.jsonify(user)

@app.route('/users/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
	
    user = User.query.filter_by(email=email).first()
	
    if user.password == password:
        access_token = create_access_token(identity = {'id': user.id, 'name': user.name,'email': user.email})
        result = access_token
        
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result

if __name__ == '__main__':

    app.run(debug = True)


