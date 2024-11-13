from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, create_refresh_token
from dotenv import load_dotenv
import os
from flask_cors import CORS
from models import db, User, Posts, Comment, Like
from sqlalchemy import or_
from uuid import uuid4

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int (os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES'))


jwt = JWTManager(app)

@app.route('/')
def index():
    users = db.query(User).all()
    return jsonify([user.toJSON() for user in users])

@app.route('/signup', methods=['POST'])   
def signup():
    try:
        data = request.get_json()
        if not data['first_name'] or not data['last_name'] or not data['email'] or not data['password']:
            return jsonify({'error': 'Please provide all required fields!'})
        user = User(first_name=data['first_name'], last_name=data['last_name'], email=data['email'])
        user.set_password(data['password'])
        db.add(user)
        db.commit()
        return jsonify(user.toJSON())
    except Exception as e:
        print(e)
        db.rollback()   
        return jsonify({'error': 'User already exists!'})

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = db.query(User).filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        return jsonify({
            "access_token":access_token,
            "refresh_token":refresh_token
            })
    return jsonify({'error': 'Invalid credentials!'})

@app.route('/createpost', methods=['POST'])
@jwt_required()
def create_post():
    try:
        current_user = get_jwt_identity()
        user = db.query(User).get(current_user)
        data = request.get_json()
        if not data['title'] or not data['content']:
            return jsonify({'error': 'Please provide all required fields!'})
        post = Posts(title=data['title'], content=data['content'], user_id=user.id)
        db.add(post)
        db.commit()
        return jsonify(post.toJSON())
    except Exception as e:
        print(e)
        db.rollback()
        return jsonify({'error': 'Something went wrong!'})

#get all post 
@app.route('/posts')
@jwt_required()
def get_posts():
    posts = db.query(Posts).all()
    return jsonify([post.format(get_jwt_identity()) for post in posts])


@app.route('/posts/<int:id>', methods=['GET', 'PATCH'])
def get_post(id):
    if request.method == 'PATCH':
        data = request.get_json()
        post = db.query(Posts).get(id)
        post.title = data['title']
        post.content = data['content']
        db.commit()
        post = db.query(Posts).get(id)
        print(post)
        return jsonify(post.toJSON())
    post = db.query(Posts).get(id)
    return jsonify(post.toJSON())

#updat post 
@app.route("/update/<int:id>", methods = ["PATCH"])
@jwt_required()
def updatepost(id):
    loggedinuser = get_jwt_identity()
    
    post = db.query(Posts).filter_by(id = id ).first()
    if  not post:
        return jsonify({'message':'post not found'})
    
    if post.user_id != loggedinuser:
        return jsonify({'message': 'unauthorised user'}), 403
    
    data =  request.get_json()
    title = data.get("title")
    content = data.get("content")

    if title:
        post.title = title
    if content:
        post.content = content 
    
    db.commit()
    return jsonify({"post": post.toJSON()})
   # return jsonify({'message':'post upated succesfully', "post":{"id":post, "title":post.title, "content":post.content, "updated_at":post.updated_at}})


#DELETE  A  POST
@app.route("/delete/<int:id>", methods = ["DELETE"])
@jwt_required()
def delete_post(id):
    loggedinuser = get_jwt_identity()
    
    post = db.query(Posts).filter_by(id=id).first()
    if not post:
        return jsonify({"message": "post not found"}, 404)
    
    if post.user_id != loggedinuser:
        return jsonify({"message": "unauthorized user"}), 403
    
    db.delete(post)
    db.commit()
    return jsonify({"message": "Post deleted successfully"}),200


#Add a comment 
@app.route("/comment/<int:post_id>", methods=["POST"])
@jwt_required()
def comment(post_id):
    loggedinuser = get_jwt_identity()
    data = request.json
    content = data.get("content")

    if not content:
        return jsonify({"message": " please content required in other to drop a comment"})
    newcomment = Comment(post_id = post_id, user_id = loggedinuser, content = content) 
    db.add(newcomment)
    db.commit()
    return jsonify({"message": "Comment added succefully", "comment":newcomment.toJSON()})
#route to get like a post
@app.route("/likepost/<int:post_id>", methods = ["POST"])
@jwt_required()
def likepost(post_id):
    loggedinuser = get_jwt_identity()
    new_like = Like(post_id = post_id, user_id = loggedinuser)
    db.add(new_like)
    db.commit()
    return jsonify({"message": "post like succesfully"})

#route to get  a comment a post has 
@app.route("/getcomments/<int:post_id>", methods=["GET"])
@jwt_required()
def getcomments(post_id):
    loggedinuser = get_jwt_identity()
    allcomments = db.query(Comment).filter_by(post_id=post_id).all()
    comment_data = []
    for i in allcomments:
        comment_data.append(i.toJSON())
    return jsonify(comment_data)

#route to unlike a post
@app.route("/unlikepost/<int:post_id>", methods=["DELETE"])
@jwt_required()
def unlikepost(post_id):
    loggedinuser = get_jwt_identity()
    new_like =  db.query(Like).filter_by(post_id = post_id, user_id = loggedinuser)
    if not new_like:
        return jsonify({"message":"like not found"}), 404
    db.delete(new_like)
    db.commit()
    return jsonify({"message":"post unlike succesfully"}), 200


#route to get all the likes a post has 
@app.route("/getlikes/<int:post_id>", methods = ["GET"])
def getlike(post_id):
    likes = db.query(Like).filter_by(post_id = post_id).all()
    likes_data = []
    for i in likes:
        likes_data.append(i.toJSON())
    print(likes_data)
    return jsonify(likes_data)
   

#route for searching 
@app.route('/search/<query>', methods = ["GET"] )
def search(query):
  

    posts_query = db.query(Posts).filter(
        or_(
            Posts.title.ilike(f'%{query}%'),
            Posts.content.ilike(f'%{query}%')
        )
    )
    print("string")
    print(posts_query)
    results = posts_query.all()
    print(results)
    if not results:
        return jsonify({'message': 'No posts found matching your search'})
    
    results = [post.toJSON() for post in results]


    return jsonify(results)

    #route for images 
@app.route('/upload-image', methods=["POST"])
def upload_image():
    print(request.files)
    if 'image' not  in  request.files:
        print()
        return jsonify({"message": "No image file provide "}), 400

    image_file = request.files['image']
    
    if image_file.filename == "":
        return jsonify({'message': 'No selected file '}),400
    new_filename = f'{uuid4()}{image_file.filename}'
    file_path =os.path.join('static',new_filename)
    print(new_filename)
    image_file.save(file_path)
    print(image_file)
    return jsonify({'message':'image saved'})



if __name__ == "__main__":
    app.run(debug=True)