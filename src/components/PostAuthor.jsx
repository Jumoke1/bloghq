import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/Avatar1.jpeg';

const PostAuthor = () => {
  return (
    <Link to={'/posts/user/id'} className='post__author'>
      <div className="post__author-avatar">
        <img src={Avatar} alt="Author Avatar" />
      </div> 
      <div className="post__author-details">
        <h5>By: Jumoke Kazeem</h5>
        <small>Just Now</small>
      </div>
    </Link>
  );
}

export default PostAuthor;
