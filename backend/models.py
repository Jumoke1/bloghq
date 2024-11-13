from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, create_engine
import bcrypt
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class User(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    def set_password(self, password):
        "hashes the password using bcrypt  and store  itis password field "
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        """Checks the password against the stored bcrypt hash."""
        return bcrypt.checkpw(password.encode('utf-8'), self.password)

    def toJSON(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email
        }

class Posts(Base):

    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime , default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    category = Column(String(50), nullable=False)

    def format(self, user_id):
        likes = db.query(Like).filter_by(post_id = self.id).all()
        liked = False
        count = 0
        for i in  likes:
            count += 1
            if i.user_id == user_id:
                liked = True
            
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'user_id': self.user_id, 
            'total_like': count,
            'liked':liked
        }
    def toJSON(self):
          
          return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'user_id': self.user_id, 
        }
    
class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable = False)
    user_id = Column(String, nullable=False)
    content = Column(String, nullable =False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def toJSON(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'content': self.content,
            'user_id': self.user_id
        }
    

class Like(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def toJSON(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'user_id': self.user_id
        }
    

engine = create_engine('sqlite:///db.sqlite')
Base.metadata.create_all(engine)
session = sessionmaker(bind=engine)
db = session()